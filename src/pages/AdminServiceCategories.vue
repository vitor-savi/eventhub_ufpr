<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Categorias de Serviço</h1>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <input v-model.trim="query" type="text" placeholder="Buscar por nome ou descrição" class="flex-1 md:w-72 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
          <button @click="openCreate" class="px-5 py-2.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 whitespace-nowrap">+ Nova Categoria</button>
        </div>
      </div>

      <p class="text-gray-600 mb-4 text-sm">Agrupe seus serviços e materiais em categorias para facilitar a criação de orçamentos e relatórios.</p>

      <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left">Nome</th>
              <th class="py-3 px-4 text-left">Descrição</th>
              <th class="py-3 px-4 text-right">Margem Padrão (%)</th>
              <th class="py-3 px-4 text-right">Itens Vinculados</th>
              <th class="py-3 px-4 text-left">Status</th>
              <th class="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in filtered" :key="cat.id" class="border-t text-sm hover:bg-gray-50">
              <td class="py-3 px-4">{{ cat.name }}</td>
              <td class="py-3 px-4">{{ cat.description || '—' }}</td>
              <td class="py-3 px-4 text-right">{{ fmtNumber(cat.defaultMargin) }}</td>
              <td class="py-3 px-4 text-right">{{ cat.itemsCount }}</td>
              <td class="py-3 px-4">
                <span :class="['px-2 py-1 rounded text-xs font-semibold', cat.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600']">{{ cat.active ? 'Ativo' : 'Inativo' }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex justify-end gap-2">
                  <button @click="openEdit(cat)" class="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300">Editar</button>
                  <button @click="removeCategory(cat.id)" class="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600">Excluir</button>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="py-6 px-4 text-center text-gray-500">Nenhuma categoria encontrada.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-xl mx-4 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Editar Categoria' : 'Nova Categoria' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
            <input v-model.trim="form.name" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-semibold text-gray-700 mb-1">Descrição (opcional)</label>
            <input v-model.trim="form.description" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Margem Padrão (%)</label>
            <input v-model.number="form.defaultMargin" type="number" min="0" step="0.01" placeholder="0" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.defaultMargin" class="text-xs text-red-600 mt-1">{{ errors.defaultMargin }}</p>
          </div>
          <div class="flex items-center gap-2 mt-6">
            <input id="active" v-model="form.active" type="checkbox" class="w-4 h-4" />
            <label for="active" class="text-sm text-gray-700">Ativo</label>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">Cancelar</button>
          <button @click="saveModal" class="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Salvar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const query = ref('')
const categories = ref([
  { id: 1, name: 'Buffet', description: 'Alimentação e bebidas', defaultMargin: 25, itemsCount: 42, active: true },
  { id: 2, name: 'Decoração', description: 'Cenografia, flores, ambientação', defaultMargin: 30, itemsCount: 18, active: true },
  { id: 3, name: 'Som e Luz', description: 'Iluminação, DJ, banda', defaultMargin: 28, itemsCount: 21, active: true },
  { id: 4, name: 'Aluguel de Materiais', description: 'Louças, mobiliário, utensílios', defaultMargin: 22, itemsCount: 35, active: true },
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return categories.value
  return categories.value.filter(c => (
    c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q)
  ))
})

const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const form = ref({ name: '', description: '', defaultMargin: 0, active: true })
const errors = ref({ name: '', defaultMargin: '' })

function resetForm() {
  form.value = { name: '', description: '', defaultMargin: 0, active: true }
  errors.value = { name: '', defaultMargin: '' }
}

function openCreate() { isEditing.value = false; editingId.value = null; resetForm(); showModal.value = true }
function openEdit(c) { isEditing.value = true; editingId.value = c.id; form.value = { name: c.name, description: c.description, defaultMargin: c.defaultMargin, active: c.active }; errors.value = { name: '', defaultMargin: '' }; showModal.value = true }
function closeModal() { showModal.value = false }

function saveModal() {
  errors.value = { name: '', defaultMargin: '' }
  if (!form.value.name) errors.value.name = 'Informe o nome.'
  if (!(form.value.defaultMargin >= 0)) errors.value.defaultMargin = 'Margem inválida.'
  if (errors.value.name || errors.value.defaultMargin) return

  if (isEditing.value) {
    const idx = categories.value.findIndex(c => c.id === editingId.value)
    if (idx >= 0) categories.value[idx] = { ...categories.value[idx], ...form.value }
  } else {
    const id = Math.max(0, ...categories.value.map(c => c.id)) + 1
    categories.value.push({ id, itemsCount: 0, ...form.value })
  }
  closeModal()
}

function removeCategory(id) {
  if (!confirm('Deseja realmente excluir esta categoria?')) return
  categories.value = categories.value.filter(c => c.id !== id)
}

function fmtNumber(n) { return Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }) }
</script>
