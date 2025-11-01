<template>
  <ClientLayout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Meus Orçamentos</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="budget in budgets" :key="budget.id" class="bg-white rounded-lg shadow p-6">
          <h3 class="font-bold text-lg mb-2">{{ budget.eventName }}</h3>
          <p class="text-gray-600 mb-1">Data Prevista: {{ budget.date }}</p>
          <p class="text-gray-600 mb-2">Valor: R$ {{ budget.value.toLocaleString() }}</p>
          <p :class="getStatusClass(budget.status)" class="mb-4">
            Status: {{ budget.status }}
          </p>
          <button 
            @click="viewBudget(budget.id)"
            class="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Visualizar Orçamento
          </button>
        </div>
      </div>
    </div>
  </ClientLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ClientLayout from '../layouts/ClientLayout.vue'

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

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'aprovado': return 'text-green-600'
    case 'aguardando aprovação': return 'text-orange-600'
    case 'em análise': return 'text-blue-600'
    default: return 'text-gray-600'
  }
}
</script>