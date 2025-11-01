<template>
  <div class="container mx-auto px-4 py-16">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
      <h1 class="text-3xl font-bold text-primary mb-6 md:mb-0">Meus Eventos</h1>
      <router-link 
        to="/cliente/novo-evento"
        class="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow font-semibold hover:bg-blue-700 transition-colors text-lg"
      >
        <i class="pi pi-plus mr-2"></i>
        + Solicitar Novo Evento
      </router-link>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Orçamentos Pendentes -->
      <div class="bg-white border border-blue-200 rounded-xl shadow p-6 flex-1">
        <h2 class="text-lg font-bold text-gray-800 mb-1">Orçamentos Pendentes</h2>
        <p class="text-sm text-gray-500 mb-4">Aguardando sua aprovação</p>
        <div class="space-y-4">
          <div v-for="event in pendingEvents" :key="event.id" class="bg-blue-50 rounded-lg p-4 flex flex-col gap-2 border border-blue-100">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span class="font-semibold text-gray-700">{{ event.title }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ event.date }}</span>
            <span class="text-xs text-orange-500">Status: Aguardando sua aprovação</span>
            <button 
              @click="viewBudget(event.id)"
              class="self-end px-4 py-1 bg-blue-100 text-blue-700 rounded font-medium hover:bg-blue-200 transition-colors"
            >
              Visualizar Orçamento
            </button>
          </div>
        </div>
      </div>
      <!-- Próximos Eventos Aprovados -->
      <div class="bg-white border border-blue-200 rounded-xl shadow p-6 flex-1">
        <h2 class="text-lg font-bold text-gray-800 mb-1">Próximos Eventos Aprovados</h2>
        <p class="text-sm text-gray-500 mb-4">Confirmados com a empresa</p>
        <div class="space-y-4">
          <div v-for="event in upcomingEvents" :key="event.id" class="bg-green-50 rounded-lg p-4 flex flex-col gap-2 border border-green-100">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-green-500"></span>
              <span class="font-semibold text-gray-700">{{ event.title }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ event.date }}</span>
            <span class="text-xs text-green-600">Status: Confirmado</span>
            <button 
              @click="viewDetails(event.id)"
              class="self-end px-4 py-1 bg-green-100 text-green-700 rounded font-medium hover:bg-green-200 transition-colors"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
      <!-- Eventos Realizados / Recusados -->
      <div class="bg-white border border-blue-200 rounded-xl shadow p-6 flex-1">
        <h2 class="text-lg font-bold text-gray-800 mb-1">Eventos Realizados / Recusados</h2>
        <p class="text-sm text-gray-500 mb-4">Histórico de eventos</p>
        <div class="space-y-4">
          <div v-for="event in pastEvents" :key="event.id" class="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 border border-gray-100">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full" :class="event.status === 'Realizado' ? 'bg-gray-400' : 'bg-red-500'"></span>
              <span class="font-semibold text-gray-700">{{ event.title }}</span>
            </div>
            <span class="text-xs text-gray-500">{{ event.date }}</span>
            <span class="text-xs" :class="event.status === 'Realizado' ? 'text-gray-600' : 'text-red-500'">Status: {{ event.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
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
