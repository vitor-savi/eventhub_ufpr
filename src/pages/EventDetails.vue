<template>
  <ClientLayout>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Detalhes do Evento</h1>
      
      <div class="bg-white rounded-lg shadow p-6 max-w-3xl mx-auto">
        <div class="space-y-6">
          <!-- Event Header -->
          <div class="border-b pb-4">
            <h2 class="text-xl font-bold">{{ event.title }}</h2>
            <p :class="getStatusClass(event.status)" class="mt-2">
              Status: {{ event.status }}
            </p>
          </div>

          <!-- Event Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-bold mb-2">Informações Gerais</h3>
              <div class="space-y-2">
                <p><span class="font-medium">Data:</span> {{ event.date }}</p>
                <p><span class="font-medium">Horário:</span> {{ event.time }}</p>
                <p><span class="font-medium">Local:</span> {{ event.venue }}</p>
                <p><span class="font-medium">Número de Convidados:</span> {{ event.guestCount }}</p>
              </div>
            </div>

            <div>
              <h3 class="font-bold mb-2">Serviços Contratados</h3>
              <ul class="list-disc list-inside space-y-1">
                <li v-for="service in event.services" :key="service">{{ service }}</li>
              </ul>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <h3 class="font-bold mb-2">Observações</h3>
            <p class="text-gray-600">{{ event.notes }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-4 pt-4 border-t">
            <button 
              @click="router.push('/cliente/meus-eventos')"
              class="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Voltar
            </button>
            <button 
              v-if="event.status === 'Confirmado'"
              @click="downloadContract"
              class="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Download Contrato
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClientLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ClientLayout from '../layouts/ClientLayout.vue'

const router = useRouter()
const route = useRoute()

// Mock event data
const event = ref({
  id: route.params.id,
  title: 'Casamento Maria e João',
  status: 'Confirmado',
  date: '20/12/2024',
  time: '19:00',
  venue: 'Espaço de Eventos XYZ',
  guestCount: 150,
  services: [
    'Buffet Completo',
    'Decoração Temática',
    'DJ e Som',
    'Fotografia',
    'Assessoria no Dia'
  ],
  notes: 'Decoração em tons de azul e branco. Menu inclui opções vegetarianas.'
})

function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case 'confirmado': return 'text-green-600'
    case 'pendente': return 'text-orange-600'
    case 'em análise': return 'text-blue-600'
    default: return 'text-gray-600'
  }
}

function downloadContract() {
  alert('Download do contrato iniciado!')
}
</script>