<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold">Dashboard Admin</h2>
      <div class="flex space-x-4">
        <button class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
          Novo Evento
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Eventos Ativos</h3>
        <p class="text-2xl font-bold mt-2">24</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Orçamentos Pendentes</h3>
        <p class="text-2xl font-bold mt-2">12</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Eventos do Mês</h3>
        <p class="text-2xl font-bold mt-2">8</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Total de Clientes</h3>
        <p class="text-2xl font-bold mt-2">156</p>
      </div>
    </div>

    <!-- Recent Budgets -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-bold mb-4">Orçamentos Recentes</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="budget in recentBudgets" :key="budget.id" class="p-4 border rounded-lg">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold">{{ budget.name }}</h4>
              <p class="text-sm text-gray-600">{{ budget.date }}</p>
            </div>
            <span :class="getStatusClass(budget.status)">
              {{ budget.status }}
            </span>
          </div>
          <div class="mt-4 flex justify-between items-center">
            <span class="font-bold">R$ {{ budget.value }}</span>
            <button class="text-primary hover:underline">Ver Detalhes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentBudgets = ref([
  { id: 1, name: 'Casamento Maria e João', date: '20/12/2024', value: '15.000', status: 'Pendente' },
  { id: 2, name: 'Formatura Medicina', date: '15/01/2025', value: '25.000', status: 'Aprovado' },
  { id: 3, name: 'Evento Corporativo', date: '10/11/2024', value: '8.000', status: 'Em Análise' },
  { id: 4, name: 'Aniversário 15 Anos', date: '05/12/2024', value: '12.000', status: 'Pendente' }
])

function getStatusClass(status) {
  const classes = 'px-2 py-1 rounded-full text-sm'
  switch (status) {
    case 'Aprovado': return `${classes} bg-green-100 text-green-800`
    case 'Pendente': return `${classes} bg-yellow-100 text-yellow-800`
    case 'Em Análise': return `${classes} bg-blue-100 text-blue-800`
    default: return `${classes} bg-gray-100 text-gray-800`
  }
}
</script>
