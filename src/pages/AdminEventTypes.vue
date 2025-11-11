<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Tipos de Evento</h1>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <input v-model.trim="query" type="text" placeholder="Buscar por nome ou descrição" class="flex-1 md:w-72 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
          <button @click="openCreate" class="px-5 py-2.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 whitespace-nowrap">+ Novo Tipo</button>
        </div>
      </div>

      <p class="text-gray-600 mb-4 text-sm">Defina os tipos de evento que seu negócio atende. Use uma cor para identificar no calendário e nos relatórios.</p>

      <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left">Cor</th>
              <th class="py-3 px-4 text-left">Nome</th>
              <th class="py-3 px-4 text-left">Descrição</th>
              <th class="py-3 px-4 text-left">Status</th>
              <th class="py-3 px-4 text-right">Nº de Eventos</th>
              <th class="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in filtered" :key="t.id" class="border-t text-sm hover:bg-gray-50">
              <td class="py-3 px-4">
                <span class="inline-block w-5 h-5 rounded-full border" :style="{ background: t.color, borderColor: 'rgba(0,0,0,0.1)' }"></span>
              </td>
              <td class="py-3 px-4">{{ t.name }}</td>
              <td class="py-3 px-4">{{ t.description || '—' }}</td>
              <td class="py-3 px-4">
                <span :class="['px-2 py-1 rounded text-xs font-semibold', t.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600']">{{ t.active ? 'Ativo' : 'Inativo' }}</span>
              </td>
              <td class="py-3 px-4 text-right">{{ t.events }}</td>
              <td class="py-3 px-4">
                <div class="flex justify-end gap-2">
                  <button @click="openEdit(t)" class="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300">Editar</button>
                  <button @click="removeType(t.id)" class="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600">Excluir</button>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="6" class="py-6 px-4 text-center text-gray-500">Nenhum tipo encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-xl mx-4 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Editar Tipo de Evento' : 'Novo Tipo de Evento' }}</h3>
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
            <label class="block text-sm font-semibold text-gray-700 mb-1">Cor</label>
            <div class="flex items-center gap-3">
              <input v-model="form.color" type="color" class="w-12 h-10 p-1 bg-white rounded border" />
              <input v-model.trim="form.color" class="flex-1 rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            </div>
            <p v-if="errors.color" class="text-xs text-red-600 mt-1">{{ errors.color }}</p>
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
const types = ref([
  { id: 1, name: 'Casamento', description: 'Cerimônias e recepções', color: '#8B5CF6', active: true, events: 12 },
  { id: 2, name: 'Aniversário', description: 'Festas de aniversário', color: '#F59E0B', active: true, events: 7 },
  { id: 3, name: 'Corporativo', description: 'Eventos de empresas', color: '#3B82F6', active: true, events: 9 },
  { id: 4, name: 'Formatura', description: 'Colações e festas de formatura', color: '#10B981', active: true, events: 4 },
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return types.value
  return types.value.filter(t => (
    t.name.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q)
  ))
})

// Modal state
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const form = ref({ name: '', description: '', color: '#8B5CF6', active: true })
const errors = ref({ name: '', color: '' })

function resetForm() {
  form.value = { name: '', description: '', color: '#8B5CF6', active: true }
  errors.value = { name: '', color: '' }
}

function openCreate() { isEditing.value = false; editingId.value = null; resetForm(); showModal.value = true }
function openEdit(t) { isEditing.value = true; editingId.value = t.id; form.value = { name: t.name, description: t.description, color: t.color, active: t.active }; errors.value = { name: '', color: '' }; showModal.value = true }
function closeModal() { showModal.value = false }

function saveModal() {
  errors.value = { name: '', color: '' }
  if (!form.value.name) errors.value.name = 'Informe o nome.'
  if (!/^#([0-9a-fA-F]{3}){1,2}$/.test(form.value.color)) errors.value.color = 'Cor inválida (use hexadecimal #RRGGBB).'
  if (errors.value.name || errors.value.color) return

  if (isEditing.value) {
    const idx = types.value.findIndex(t => t.id === editingId.value)
    if (idx >= 0) types.value[idx] = { ...types.value[idx], ...form.value }
  } else {
    const id = Math.max(0, ...types.value.map(t => t.id)) + 1
    types.value.push({ id, events: 0, ...form.value })
  }
  closeModal()
}

function removeType(id) {
  if (!confirm('Deseja realmente excluir este tipo?')) return
  types.value = types.value.filter(t => t.id !== id)
}
</script>
