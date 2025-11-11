<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Gerenciamento de Clientes</h1>
        <div class="flex items-center gap-3 w-full md:w-auto">
          <input v-model.trim="query" type="text" placeholder="Buscar por Nome, Email ou CPF" class="flex-1 md:w-72 rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
          <button @click="openCreate" class="px-5 py-2.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 whitespace-nowrap">+ Novo Cliente</button>
        </div>
      </div>

      <p class="text-gray-600 mb-4 text-sm">Lista e permite gerenciar as informações de todos os clientes cadastrados.</p>

      <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left">Nome</th>
              <th class="py-3 px-4 text-left">Email</th>
              <th class="py-3 px-4 text-left">Telefone</th>
              <th class="py-3 px-4 text-left">CPF</th>
              <th class="py-3 px-4 text-right">Nº de Eventos</th>
              <th class="py-3 px-4 text-left">Último Contato</th>
              <th class="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filtered" :key="c.id" class="border-t text-sm hover:bg-gray-50">
              <td class="py-3 px-4">{{ c.name }}</td>
              <td class="py-3 px-4">{{ c.email }}</td>
              <td class="py-3 px-4">{{ c.phone }}</td>
              <td class="py-3 px-4">{{ c.cpf }}</td>
              <td class="py-3 px-4 text-right">{{ c.events }}</td>
              <td class="py-3 px-4">{{ c.lastContact }}</td>
              <td class="py-3 px-4">
                <div class="flex justify-end gap-2">
                  <button @click="viewProfile(c)" class="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300">Ver Perfil</button>
                  <button @click="openEdit(c)" class="px-3 py-1 rounded bg-gray-200 text-gray-800 text-xs font-semibold hover:bg-gray-300">Editar</button>
                  <button @click="removeClient(c.id)" class="px-3 py-1 rounded bg-red-500 text-white text-xs font-semibold hover:bg-red-600">Excluir</button>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="py-6 px-4 text-center text-gray-500">Nenhum cliente encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-xl mx-4 p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Editar Cliente' : 'Novo Cliente' }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
            <input v-model.trim="form.name" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input v-model.trim="form.email" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
            <input v-model.trim="form.phone" placeholder="(11) 98765-4321" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.phone" class="text-xs text-red-600 mt-1">{{ errors.phone }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">CPF</label>
            <input v-model.trim="form.cpf" placeholder="123.456.789-00" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.cpf" class="text-xs text-red-600 mt-1">{{ errors.cpf }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nº de Eventos</label>
            <input v-model.number="form.events" type="number" min="0" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.events" class="text-xs text-red-600 mt-1">{{ errors.events }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Último Contato (AAAA-MM-DD)</label>
            <input v-model.trim="form.lastContact" type="date" class="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="errors.lastContact" class="text-xs text-red-600 mt-1">{{ errors.lastContact }}</p>
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
const clients = ref([
  { id: 1, name: 'Cliente A', email: 'cliente.a@example.com', phone: '(11) 98765-4321', cpf: '123.456.789-00', events: 5, lastContact: '2023-10-26' },
  { id: 2, name: 'Cliente B', email: 'cliente.b@example.com', phone: '(21) 91234-5678', cpf: '098.765.432-11', events: 2, lastContact: '2023-10-20' },
  { id: 3, name: 'Cliente C', email: 'cliente.c@example.com', phone: '(31) 99876-5432', cpf: '111.222.333-44', events: 8, lastContact: '2023-10-28' },
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return clients.value
  return clients.value.filter(c => (
    c.name.toLowerCase().includes(q) ||
    c.email.toLowerCase().includes(q) ||
    c.cpf.toLowerCase().includes(q)
  ))
})

// Modal state
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const form = ref({ name: '', email: '', phone: '', cpf: '', events: 0, lastContact: '' })
const errors = ref({ name: '', email: '', phone: '', cpf: '', events: '', lastContact: '' })

function resetForm() {
  form.value = { name: '', email: '', phone: '', cpf: '', events: 0, lastContact: '' }
  errors.value = { name: '', email: '', phone: '', cpf: '', events: '', lastContact: '' }
}

function openCreate() {
  isEditing.value = false
  editingId.value = null
  resetForm()
  showModal.value = true
}

function openEdit(c) {
  isEditing.value = true
  editingId.value = c.id
  form.value = { ...c }
  errors.value = { name: '', email: '', phone: '', cpf: '', events: '', lastContact: '' }
  showModal.value = true
}

function closeModal() { showModal.value = false }

function validateCPF(cpf) {
  return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)
}

function saveModal() {
  errors.value = { name: '', email: '', phone: '', cpf: '', events: '', lastContact: '' }
  if (!form.value.name) errors.value.name = 'Informe o nome.'
  if (!form.value.email || !/.+@.+\..+/.test(form.value.email)) errors.value.email = 'Email inválido.'
  if (!form.value.phone) errors.value.phone = 'Informe o telefone.'
  if (!form.value.cpf || !validateCPF(form.value.cpf)) errors.value.cpf = 'CPF inválido (use ###.###.###-##).'
  if (!(form.value.events >= 0)) errors.value.events = 'Nº de eventos inválido.'
  if (!form.value.lastContact) errors.value.lastContact = 'Informe a data.'

  const hasErrors = Object.values(errors.value).some(Boolean)
  if (hasErrors) return

  if (isEditing.value) {
    const idx = clients.value.findIndex(c => c.id === editingId.value)
    if (idx >= 0) clients.value[idx] = { ...clients.value[idx], ...form.value }
  } else {
    const id = Math.max(0, ...clients.value.map(c => c.id)) + 1
    clients.value.push({ id, ...form.value })
  }
  closeModal()
}

function removeClient(id) {
  if (!confirm('Deseja realmente excluir este cliente?')) return
  clients.value = clients.value.filter(c => c.id !== id)
}

function viewProfile(c) {
  alert(`Perfil do cliente: ${c.name}\nEmail: ${c.email}\nTelefone: ${c.phone}`)
}
</script>
