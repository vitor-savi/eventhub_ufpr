<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold text-primary mb-10">Meus Orçamentos</h1>
    <div class="space-y-6">
      <div v-for="budget in budgets" :key="budget.id" class="bg-white rounded-xl shadow border border-blue-100 p-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="w-4 h-4 rounded-full" :class="statusColor(budget.status)"></span>
          <div>
            <div class="font-bold text-lg text-gray-800">{{ budget.eventName }}</div>
            <div class="text-sm text-gray-500">{{ budget.date }}</div>
            <div class="text-xs" :class="statusTextColor(budget.status)">Status: {{ budget.status }}</div>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-xl font-bold text-primary">R$ {{ budget.value }}</div>
          <router-link :to="`/cliente/orcamentos/${budget.id}`" class="px-5 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">Detalhes do Orçamento</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const budgets = ref([
  { 
    id: 1, 
    eventName: 'Casamento Maria e João', 
    date: '20/12/2024', 
    value: 15000,
    status: 'Aguardando Aprovação' 
  },
  { 
    id: 2, 
    eventName: 'Aniversário 15 Anos', 
    date: '15/01/2025', 
    value: 8000,
    status: 'Em Análise' 
  },
  { 
    id: 3, 
    eventName: 'Formatura', 
    date: '10/03/2025', 
    value: 12000,
    status: 'Aprovado' 
  }
])

function viewBudget(id) {
  router.push(`/cliente/orcamentos/${id}`)
}

function statusColor(status) {
  switch (status.toLowerCase()) {
    case 'aprovado': return 'bg-green-500'
    case 'aguardando aprovação': return 'bg-orange-500'
    case 'em análise': return 'bg-blue-500'
    default: return 'bg-gray-300'
  }
}

function statusTextColor(status) {
  switch (status.toLowerCase()) {
    case 'aprovado': return 'text-green-600'
    case 'aguardando aprovação': return 'text-orange-600'
    case 'em análise': return 'text-blue-600'
    default: return 'text-gray-600'
  }
}
</script>