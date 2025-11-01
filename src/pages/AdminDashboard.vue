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
                <th class="py-2 px-3">Valor</th>
                <th class="py-2 px-3">Status Atual</th>
                <th class="py-2 px-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="budget in filteredBudgets" :key="budget.id" class="border-b last:border-none">
                <td class="py-2 px-3">{{ budget.cliente }}</td>
                <td class="py-2 px-3">{{ budget.tipo }}</td>
                <td class="py-2 px-3">{{ budget.data }}</td>
                <td class="py-2 px-3">R$ {{ budget.valor }}</td>
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
  { id: 1, cliente: 'Cliente', tipo: 'Aniversário', data: '20/01/2026', valor: '8.000,00', status: 'Pendente', title: 'Aniversário de 15 anos' },
  { id: 2, cliente: 'Cliente', tipo: 'Corporativo', data: '15/12/2025', valor: '12.000,00', status: 'Pendente', title: 'Lançamento de Produto X' },
  { id: 3, cliente: 'Maria e João', tipo: 'Casamento', data: '29/11/2025', valor: '22.000,00', status: 'Confirmado', title: 'Casamento de Maria e João' },
  { id: 4, cliente: 'Empresa', tipo: 'Corporativo', data: '25/11/2025', valor: '15.000,00', status: 'Confirmado', title: 'Confraternização da Empresa' },
  { id: 5, cliente: 'Cliente', tipo: 'Formatura', data: '10/10/2024', valor: '18.000,00', status: 'Realizado', title: 'Festa de Formatura' },
  { id: 6, cliente: 'Cliente', tipo: 'Corporativo', data: '01/08/2024', valor: '5.000,00', status: 'Recusado', title: 'Reunião Anual' }
])

const statusMap = {
  novas: ['Novas Solicitações', 'Pendente'],
  analise: ['Em Análise'],
  aguardando: ['Aguardando Cliente'],
  aprovados: ['Aprovados', 'Confirmado'],
  recusados: ['Recusados', 'Recusado']
}

const filteredBudgets = computed(() => {
  return budgets.value.filter(b => {
    const matchesTab = statusMap[activeTab.value]?.includes(b.status)
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
