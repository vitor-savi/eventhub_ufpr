<template>
  <div class="min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800">
        Alocação para Evento: <span class="text-primary">{{ event.title }}</span>
      </h1>
    </div>

    <!-- Event Info Card -->
    <div class="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="font-semibold text-gray-700">Data:</span>
          <span class="ml-2 text-gray-600">{{ event.date }}</span>
        </div>
        <div>
          <span class="font-semibold text-gray-700">Local:</span>
          <span class="ml-2 text-gray-600">{{ event.local || 'A definir' }}</span>
        </div>
        <div>
          <span class="font-semibold text-gray-700">Nº de Convidados:</span>
          <span class="ml-2 text-gray-600">{{ event.guestCount || '—' }}</span>
        </div>
      </div>
    </div>

    <!-- Allocated Professionals -->
    <div class="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4">Profissionais Alocados</h2>
      <div v-if="allocatedStaff.length > 0" class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left">Nome</th>
              <th class="py-3 px-4 text-left">Função</th>
              <th class="py-3 px-4 text-left">Contato</th>
              <th class="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(staff, idx) in allocatedStaff" :key="staff.id" class="border-t text-sm">
              <td class="py-3 px-4">{{ staff.name }}</td>
              <td class="py-3 px-4">{{ staff.role }}</td>
              <td class="py-3 px-4">{{ staff.contact }}</td>
              <td class="py-3 px-4">
                <div class="flex justify-end">
                  <button @click="removeStaff(idx)" class="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200">Remover</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-6 text-gray-500">
        Nenhum profissional alocado ainda.
      </div>
    </div>

    <!-- Add Professional -->
    <div class="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4">Adicionar Profissional</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="relative">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Buscar Profissional</label>
          <input 
            v-model="searchQuery" 
            @focus="showDropdown = true" 
            @blur="hideDropdownDelayed"
            type="text" 
            placeholder="Digite o nome do profissional"
            class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <ul v-if="showDropdown && filteredProfessionals.length" class="absolute mt-1 z-10 w-full bg-white border border-gray-200 rounded shadow max-h-48 overflow-auto">
            <li 
              v-for="prof in filteredProfessionals" 
              :key="prof.id" 
              @mousedown="selectProfessional(prof)"
              class="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
            >
              {{ prof.name }} <span class="text-xs text-gray-500">({{ prof.specialty }})</span>
            </li>
          </ul>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Função</label>
          <select v-model="selectedRole" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="">Selecione a Função</option>
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="addProfessional" class="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
            <i class="pi pi-plus"></i>
            Adicionar
          </button>
        </div>
      </div>
    </div>

    <!-- Resources/Materials -->
    <div class="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
      <h2 class="text-lg font-bold text-gray-800 mb-4">Recursos/Materiais Adicionais</h2>
      <div class="space-y-3">
        <div v-for="(resource, idx) in resources" :key="idx" class="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
          <div class="flex items-center gap-3">
            <input 
              type="checkbox" 
              v-model="resource.checked" 
              class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <span class="text-sm text-gray-700">{{ resource.name }}</span>
          </div>
          <span class="text-xs font-semibold px-3 py-1 rounded" :class="resource.checked ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
            {{ resource.checked ? 'Checado' : 'Preparado' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex flex-col sm:flex-row gap-4 justify-end">
      <button @click="goBack" class="px-6 py-3 rounded border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50">
        Voltar para Início
      </button>
      <button @click="saveAllocations" class="px-6 py-3 rounded bg-gradient-to-r from-green-500 to-green-400 text-white font-bold hover:shadow-lg">
        Salvar Alocações
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import budgetsData from '../data/budgets'

const route = useRoute()
const router = useRouter()

// Get event from route param
const event = computed(() => {
  const evt = budgetsData.find(b => b.id === parseInt(route.params.eventId))
  return evt || { 
    id: route.params.eventId, 
    title: 'Evento', 
    date: '—', 
    local: '—', 
    guestCount: 0 
  }
})

// Mock professionals database
const professionalsCatalog = ref([
  { id: 1, name: 'Carlos Silva', specialty: 'Garçom', contact: '(41) 99999-0001' },
  { id: 2, name: 'Ana Santos', specialty: 'Garçom', contact: '(41) 99999-0002' },
  { id: 3, name: 'Pedro Lima', specialty: 'Cozinheiro', contact: '(41) 99999-0003' },
  { id: 4, name: 'Maria Costa', specialty: 'Cozinheiro', contact: '(41) 99999-0004' },
  { id: 5, name: 'João Alves', specialty: 'Músico', contact: '(41) 99999-0005' },
  { id: 6, name: 'Paula Rocha', specialty: 'Fotógrafo', contact: '(41) 99999-0006' },
  { id: 7, name: 'Lucas Martins', specialty: 'Bartender', contact: '(41) 99999-0007' },
  { id: 8, name: 'Fernanda Souza', specialty: 'Monitor', contact: '(41) 99999-0008' },
  { id: 9, name: 'Ricardo Moreira', specialty: 'DJ', contact: '(41) 99999-0009' },
  { id: 10, name: 'Juliana Ferreira', specialty: 'Assessora', contact: '(41) 99999-0010' }
])

const roles = ['Garçom', 'Cozinheiro', 'Músico', 'Fotógrafo', 'Bartender', 'Monitor', 'DJ', 'Assessora', 'Coordenador']

// State
const allocatedStaff = ref([])
const searchQuery = ref('')
const selectedProfessional = ref(null)
const selectedRole = ref('')
const showDropdown = ref(false)

const resources = ref([
  { name: 'Item 1 - Mesas e Cadeiras', checked: false },
  { name: 'Item 2 - Equipamento de Som', checked: false },
  { name: 'Item 3 - Decoração Completa', checked: true }
])

// Search/filter professionals
const filteredProfessionals = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return professionalsCatalog.value.slice(0, 5)
  return professionalsCatalog.value.filter(p => 
    p.name.toLowerCase().includes(q) || p.specialty.toLowerCase().includes(q)
  ).slice(0, 8)
})

function selectProfessional(prof) {
  selectedProfessional.value = prof
  searchQuery.value = prof.name
  showDropdown.value = false
}

function hideDropdownDelayed() {
  setTimeout(() => { showDropdown.value = false }, 200)
}

function addProfessional() {
  if (!selectedProfessional.value) {
    alert('Selecione um profissional da lista.')
    return
  }
  if (!selectedRole.value) {
    alert('Selecione uma função.')
    return
  }
  
  // Check if already allocated
  const exists = allocatedStaff.value.find(s => s.id === selectedProfessional.value.id)
  if (exists) {
    alert('Este profissional já está alocado para este evento.')
    return
  }

  allocatedStaff.value.push({
    id: selectedProfessional.value.id,
    name: selectedProfessional.value.name,
    role: selectedRole.value,
    contact: selectedProfessional.value.contact
  })

  // Reset fields
  searchQuery.value = ''
  selectedProfessional.value = null
  selectedRole.value = ''
}

function removeStaff(index) {
  allocatedStaff.value.splice(index, 1)
}

function saveAllocations() {
  alert(`Alocações salvas com sucesso!\n${allocatedStaff.value.length} profissionais alocados para ${event.value.title}.`)
  router.push('/admin/dashboard')
}

function goBack() {
  router.push('/admin/dashboard')
}
</script>
