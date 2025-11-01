<template>
    <div class="min-h-screen bg-gray-50">
      <main class="container mx-auto px-4 py-16 max-w-7xl">
        <h1 class="text-3xl font-bold text-primary mb-8">Gestão de Orçamentos</h1>

        <!-- Abas de Status -->
        <div class="flex gap-4 mb-6">
          <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
            :class="['px-5 py-2 rounded font-bold', activeTab === tab.key ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700']">
            {{ tab.label }}
          </button>
        </div>

        <!-- Campo de Busca -->
        <div class="mb-6 flex items-center gap-4">
          <input v-model="search" type="text" placeholder="Buscar por Cliente ou Evento" class="w-full max-w-md border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
          <button class="px-5 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">Buscar</button>
        </div>

        <!-- Tabela de Orçamentos -->
        <div class="bg-white rounded-xl shadow border border-blue-100 p-6">
          <table class="w-full text-left">
            <thead>
              <tr class="text-gray-700 text-sm border-b">
                <th class="py-2 px-3">Cliente</th>
                <th class="py-2 px-3">Tipo de Evento</th>
                <th class="py-2 px-3">Data Solicitação</th>
                <th class="py-2 px-3">Status Atual</th>
                <th class="py-2 px-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="budget in filteredBudgets" :key="budget.id" class="border-b last:border-none">
                <td class="py-2 px-3">{{ budget.cliente }}</td>
                <td class="py-2 px-3">{{ budget.tipo }}</td>
                <td class="py-2 px-3">{{ budget.data }}</td>
                <td class="py-2 px-3">
                  <span :class="getStatusClass(budget.status)">{{ budget.status }}</span>
                </td>
                <td class="py-2 px-3">
                  <button v-if="budget.status === 'Novas Solicitações'" class="px-4 py-1 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">Analisar Orçamento</button>
                  <button v-else-if="budget.status === 'Em Análise'" class="px-4 py-1 bg-yellow-600 text-white rounded font-medium hover:bg-yellow-700 transition-colors">Revisar</button>
                  <button v-else class="px-4 py-1 bg-blue-50 text-blue-700 rounded font-medium border border-blue-200 hover:bg-blue-100 transition-colors">Ver Detalhes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
  </div>
</template>
<script setup>

import { ref, computed } from 'vue'

const adminName = 'Administrador'

const tabs = [
  { key: 'novas', label: 'Novas Solicitações' },
  { key: 'analise', label: 'Em Análise' },
  { key: 'aguardando', label: 'Aguardando Cliente' },
  { key: 'aprovados', label: 'Aprovados' },
  { key: 'recusados', label: 'Recusados' }
]

const activeTab = ref('novas')
const search = ref('')

const budgets = ref([
  { id: 1, cliente: 'Maria e João', tipo: 'Casamento', data: '20/12/2024', status: 'Novas Solicitações' },
  { id: 2, cliente: 'Carlos Silva', tipo: 'Formatura', data: '15/01/2025', status: 'Em Análise' },
  { id: 3, cliente: 'Empresa X', tipo: 'Corporativo', data: '10/11/2024', status: 'Aguardando Cliente' },
  { id: 4, cliente: 'Ana Paula', tipo: 'Aniversário', data: '05/12/2024', status: 'Aprovados' },
  { id: 5, cliente: 'Lucas Lima', tipo: 'Casamento', data: '22/12/2024', status: 'Recusados' }
])

const filteredBudgets = computed(() => {
  return budgets.value.filter(b => {
    const matchesTab =
      (activeTab.value === 'novas' && b.status === 'Novas Solicitações') ||
      (activeTab.value === 'analise' && b.status === 'Em Análise') ||
      (activeTab.value === 'aguardando' && b.status === 'Aguardando Cliente') ||
      (activeTab.value === 'aprovados' && b.status === 'Aprovados') ||
      (activeTab.value === 'recusados' && b.status === 'Recusados')
    const matchesSearch =
      b.cliente.toLowerCase().includes(search.value.toLowerCase()) ||
      b.tipo.toLowerCase().includes(search.value.toLowerCase())
    return matchesTab && matchesSearch
  })
})

function getStatusClass(status) {
  const classes = 'px-2 py-1 rounded-full text-sm'
  switch (status) {
    case 'Novas Solicitações': return `${classes} bg-blue-100 text-blue-800`
    case 'Em Análise': return `${classes} bg-yellow-100 text-yellow-800`
    case 'Aguardando Cliente': return `${classes} bg-gray-100 text-gray-800`
    case 'Aprovados': return `${classes} bg-green-100 text-green-800`
    case 'Recusados': return `${classes} bg-red-100 text-red-800`
    default: return `${classes} bg-gray-100 text-gray-800`
  }
}

function logout() {
  alert('Logout realizado!')
}
</script>
