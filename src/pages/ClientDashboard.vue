<template>
  <ClientLayout>
    <div class="container mx-auto px-4 py-8">
      <!-- Action Button -->
      <div class="mb-8">
        <router-link 
          to="/cliente/novo-evento"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <i class="pi pi-plus mr-2"></i>
          Solicitar Novo Evento
        </router-link>
      </div>

      <!-- Event Categories -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Pending Budgets -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-4">Orçamentos Pendentes</h3>
          <div class="space-y-4">
            <div v-for="event in pendingEvents" :key="event.id" class="bg-white p-4 rounded shadow">
              <h4 class="font-bold">{{ event.title }}</h4>
              <p class="text-sm text-gray-600">Data Prevista: {{ event.date }}</p>
              <p class="text-orange-500 mt-2">Status: Aguardando sua aprovação</p>
              <button 
                @click="viewBudget(event.id)"
                class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
              >
                Visualizar Orçamento
              </button>
            </div>
          </div>
        </div>

        <!-- Upcoming Events -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-4">Próximos Eventos Aprovados</h3>
          <div class="space-y-4">
            <div v-for="event in upcomingEvents" :key="event.id" class="bg-white p-4 rounded shadow">
              <h4 class="font-bold">{{ event.title }}</h4>
              <p class="text-sm text-gray-600">Data do Evento: {{ event.date }}</p>
              <p class="text-green-500 mt-2">Status: Confirmado</p>
              <button 
                @click="viewDetails(event.id)"
                class="mt-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 w-full"
              >
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>

        <!-- Past/Rejected Events -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-bold mb-4">Eventos Realizados / Recusados</h3>
          <div class="space-y-4">
            <div v-for="event in pastEvents" :key="event.id" class="bg-white p-4 rounded shadow">
              <h4 class="font-bold">{{ event.title }}</h4>
              <p class="text-sm text-gray-600">Data do Evento: {{ event.date }}</p>
              <p :class="event.status === 'Realizado' ? 'text-gray-500' : 'text-red-500'" class="mt-2">
                Status: {{ event.status }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ClientLayout from '../layouts/ClientLayout.vue'
import { useEventsStore } from '../store/events'

const router = useRouter()
const eventsStore = useEventsStore()

const pendingEvents = computed(() => [
  { id: 1, title: 'Aniversário de 15 anos', date: '20/12/2024', status: 'pendente' },
  { id: 2, title: 'Lançamento de Produto X', date: '15/11/2024', status: 'pendente' }
])

const upcomingEvents = computed(() => [
  { id: 3, title: 'Casamento de Maria e João', date: '20/07/2024', status: 'confirmado' },
  { id: 4, title: 'Confraternização da Empresa', date: '05/09/2024', status: 'confirmado' }
])

const pastEvents = computed(() => [
  { id: 5, title: 'Festa de Formatura', date: '10/10/2024', status: 'Realizado' },
  { id: 6, title: 'Reunião Anual', date: '01/08/2024', status: 'Recusado' }
])

function viewBudget(id) {
  router.push(`/cliente/orcamentos/${id}`)
}

function viewDetails(id) {
  router.push(`/cliente/eventos/${id}`)
}
</script>
