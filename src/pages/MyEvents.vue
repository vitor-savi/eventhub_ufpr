<template>
  <ClientLayout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Meus Eventos</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow p-6">
          <h3 class="font-bold text-lg mb-2">{{ event.title }}</h3>
          <p class="text-gray-600 mb-2">Data: {{ event.date }}</p>
          <p :class="getStatusClass(event.status)" class="mb-4">
            Status: {{ event.status }}
          </p>
          <button 
            @click="viewDetails(event.id)"
            class="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            Ver Detalhes
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

const events = ref([
  { id: 1, title: 'Casamento Maria e João', date: '20/12/2024', status: 'Confirmado' },
  { id: 2, title: 'Aniversário 15 Anos', date: '15/01/2025', status: 'Pendente' },
  { id: 3, title: 'Formatura', date: '10/03/2025', status: 'Em Análise' }
])

function viewDetails(id) {
  router.push(`/cliente/eventos/${id}`)
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'confirmado': return 'text-green-600'
    case 'pendente': return 'text-orange-600'
    case 'em análise': return 'text-blue-600'
    default: return 'text-gray-600'
  }
}
</script>