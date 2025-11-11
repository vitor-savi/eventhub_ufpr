<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Cadastro de Custos</h1>
      </div>

      <!-- Tabs -->
      <div class="bg-gray-50 rounded-lg p-2 mb-6 flex flex-wrap gap-2">
        <button
          @click="activeTab = 'professionals'"
          :class="['px-4 py-2 rounded font-medium text-sm', activeTab === 'professionals' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900']"
        >
          Custos de Profissionais
        </button>
        <button
          @click="activeTab = 'materials'"
          :class="['px-4 py-2 rounded font-medium text-sm', activeTab === 'materials' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900']"
        >
          Custos de Materiais e Serviços
        </button>
      </div>

      <!-- Professionals Tab -->
      <div v-if="activeTab === 'professionals'">
        <div class="flex justify-end mb-3">
          <button @click="openCreate('professional')" class="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">+ Novo Custo de Profissional</button>
        </div>
        <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table class="min-w-full">
            <thead class="bg-gray-100 text-left text-xs uppercase text-gray-600">
              <tr>
                <th class="py-3 px-4">Nome/Descrição</th>
                <th class="py-3 px-4 text-right">Valor Custo (R$)</th>
                <th class="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in professionals" :key="p.id" class="border-t text-sm">
                <td class="py-3 px-4">{{ p.name }}</td>
                <td class="py-3 px-4 text-right">{{ fmt(p.cost) }}</td>
                <td class="py-3 px-4">
                  <div class="flex justify-end gap-2">
                    <button @click="openEdit('professional', p)" class="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300">Editar</button>
                    <button @click="removeItem('professional', p.id)" class="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600">Excluir</button>
                  </div>
                </td>
              </tr>
              <tr v-if="professionals.length === 0">
                <td colspan="3" class="py-6 px-4 text-center text-gray-500">Nenhum custo cadastrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Materials Tab -->
      <div v-else>
        <div class="flex justify-end mb-3">
          <button @click="openCreate('material')" class="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">+ Novo Custo de Material/Serviço</button>
        </div>
        <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
          <table class="min-w-full">
            <thead class="bg-gray-100 text-left text-xs uppercase text-gray-600">
              <tr>
                <th class="py-3 px-4">Nome/Descrição</th>
                <th class="py-3 px-4 text-right">Valor Custo (R$)</th>
                <th class="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="m in materials" :key="m.id" class="border-t text-sm">
                <td class="py-3 px-4">{{ m.name }}</td>
                <td class="py-3 px-4 text-right">{{ fmt(m.cost) }}</td>
                <td class="py-3 px-4">
                  <div class="flex justify-end gap-2">
                    <button @click="openEdit('material', m)" class="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300">Editar</button>
                    <button @click="removeItem('material', m.id)" class="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600">Excluir</button>
                  </div>
                </td>
              </tr>
              <tr v-if="materials.length === 0">
                <td colspan="3" class="py-6 px-4 text-center text-gray-500">Nenhum custo cadastrado.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">
          {{ isEditing ? modalTitleEdit : modalTitleCreate }}
        </h3>

        <div class="mb-4">
          <label class="block text-sm font-semibold text-gray-700 mb-1">{{ placeholderLabel }}</label>
          <input v-model.trim="form.name" :placeholder="placeholderExample" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 mb-1">Valor Custo (R$)</label>
          <input v-model="form.costStr" placeholder="0,00" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
          <p v-if="errors.cost" class="text-sm text-red-600 mt-1">{{ errors.cost }}</p>
        </div>

        <div class="flex justify-end gap-3">
          <button @click="closeModal" class="px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">Cancelar</button>
          <button @click="saveModal" class="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">{{ isEditing ? 'Salvar' : 'Salvar' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeTab = ref('professionals')

// Seed data
const professionals = ref([
  { id: 1, name: 'Diária Garçom', cost: 150.00 },
  { id: 2, name: 'Banda X - Show Completo', cost: 2500.00 },
  { id: 3, name: 'DJ Y - 4 Horas', cost: 800.00 },
])

const materials = ref([
  { id: 1, name: 'Quilo Filé Mignon', cost: 89.90 },
  { id: 2, name: 'Pacote Louça Completa', cost: 500.00 },
  { id: 3, name: 'Iluminação Cênica (pacote)', cost: 1200.00 },
])

// Modal state
const showModal = ref(false)
const modalType = ref('professional') // 'professional' | 'material'
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({ name: '', costStr: '' })
const errors = ref({ name: '', cost: '' })

const modalTitleCreate = computed(() => modalType.value === 'professional' ? 'Novo Custo de Profissional' : 'Novo Custo de Material/Serviço')
const modalTitleEdit = computed(() => modalType.value === 'professional' ? 'Editar Custo de Profissional' : 'Editar Custo de Material/Serviço')

const placeholderLabel = computed(() => 'Nome/Descrição')
const placeholderExample = computed(() => modalType.value === 'professional' ? 'Ex: Diária Garçom, Banda X - Show Completo' : 'Ex: Kilo Filé Mignon, Pacote Louça Completa')

function openCreate(type) {
  modalType.value = type
  isEditing.value = false
  editingId.value = null
  form.value = { name: '', costStr: '' }
  errors.value = { name: '', cost: '' }
  showModal.value = true
}

function openEdit(type, item) {
  modalType.value = type
  isEditing.value = true
  editingId.value = item.id
  form.value = { name: item.name, costStr: fmt(item.cost) }
  errors.value = { name: '', cost: '' }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

function parseBRL(str) {
  if (!str) return NaN
  const s = String(str).replace(/\./g, '').replace(/,/g, '.')
  const n = Number(s)
  return Number.isFinite(n) ? n : NaN
}

function fmt(n) {
  return Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function saveModal() {
  errors.value = { name: '', cost: '' }
  if (!form.value.name) {
    errors.value.name = 'Informe o nome/descrição.'
  }
  const cost = parseBRL(form.value.costStr)
  if (!(cost >= 0)) {
    errors.value.cost = 'Informe um valor numérico válido.'
  }
  if (errors.value.name || errors.value.cost) return

  if (modalType.value === 'professional') {
    if (isEditing.value) {
      const idx = professionals.value.findIndex(i => i.id === editingId.value)
      if (idx >= 0) professionals.value[idx] = { ...professionals.value[idx], name: form.value.name, cost }
    } else {
      const id = Math.max(0, ...professionals.value.map(i => i.id)) + 1
      professionals.value.push({ id, name: form.value.name, cost })
    }
  } else {
    if (isEditing.value) {
      const idx = materials.value.findIndex(i => i.id === editingId.value)
      if (idx >= 0) materials.value[idx] = { ...materials.value[idx], name: form.value.name, cost }
    } else {
      const id = Math.max(0, ...materials.value.map(i => i.id)) + 1
      materials.value.push({ id, name: form.value.name, cost })
    }
  }

  closeModal()
}

function removeItem(type, id) {
  if (!confirm('Deseja realmente excluir este item?')) return
  if (type === 'professional') {
    professionals.value = professionals.value.filter(i => i.id !== id)
  } else {
    materials.value = materials.value.filter(i => i.id !== id)
  }
}
</script>
