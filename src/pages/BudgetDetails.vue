<template>
  <ClientLayout>
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Orçamento para: {{ budget.eventName }}</h1>
        <p class="text-blue-600">{{ budget.status }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Column - Event Details -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Detalhes da Solicitação</h2>
          
          <div class="space-y-4">
            <div>
              <p class="font-medium">Tipo de Evento:</p>
              <p>{{ budget.eventType }}</p>
            </div>

            <div>
              <p class="font-medium">Data:</p>
              <p>{{ budget.date }}</p>
            </div>

            <div>
              <p class="font-medium">Local:</p>
              <p>{{ budget.venue }}</p>
            </div>

            <div>
              <p class="font-medium">Número de Convidados:</p>
              <p>{{ budget.guestCount }}</p>
            </div>

            <div>
              <p class="font-medium">Serviços Solicitados:</p>
              <p>{{ budget.requestedServices.join(', ') }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column - Budget Breakdown -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4">Proposta da EVENTHUB</h2>

          <!-- Buffet Section -->
          <div class="mb-6">
            <h3 class="font-bold mb-2">Buffet</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Jantar Completo (100 pessoas)</span>
                <span>R$ 5.000,00</span>
              </div>
              <div class="flex justify-between">
                <span>Bebidas (100 pessoas)</span>
                <span>R$ 1.500,00</span>
              </div>
              <div class="flex justify-between font-medium">
                <span>Subtotal Buffet:</span>
                <span>R$ 6.500,00</span>
              </div>
            </div>
          </div>

          <!-- Decoration Section -->
          <div class="mb-6">
            <h3 class="font-bold mb-2">Decoração</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Decoração Temática</span>
                <span>R$ 2.000,00</span>
              </div>
              <div class="flex justify-between">
                <span>Arranjos de Flores</span>
                <span>R$ 800,00</span>
              </div>
              <div class="flex justify-between font-medium">
                <span>Subtotal Decoração:</span>
                <span>R$ 2.800,00</span>
              </div>
            </div>
          </div>

          <!-- Music Section -->
          <div class="mb-6">
            <h3 class="font-bold mb-2">Música</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>DJ e Equipamento (4h)</span>
                <span>R$ 1.200,00</span>
              </div>
              <div class="flex justify-between font-medium">
                <span>Subtotal Música:</span>
                <span>R$ 1.200,00</span>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="bg-blue-50 p-4 rounded-lg mt-8">
            <div class="text-xl font-bold flex justify-between text-blue-900">
              <span>Valor Total do Orçamento:</span>
              <span>R$ 10.500,00</span>
            </div>
            <p class="text-blue-600 text-center mt-2">em 10 parcelas de R$ 1.050,00</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 mt-8">
            <button 
              @click="handleApprove"
              class="flex-1 py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              APROVAR ORÇAMENTO
            </button>
            <button 
              @click="handleReject"
              class="flex-1 py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              RECUSAR ORÇAMENTO
            </button>
          </div>

          <button 
            @click="handleContact"
            class="w-full mt-4 py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Entrar em Contato para Dúvidas
          </button>

          <!-- Download PDF -->
          <div class="text-center mt-6">
            <a href="#" class="text-blue-600 hover:underline">
              Baixar Proposta Completa (PDF)
            </a>
          </div>
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

// Mock budget data
const budget = ref({
  eventName: 'Nome do Evento',
  status: 'Aguardando sua Aprovação',
  eventType: 'Aniversário',
  date: '25/12/2024',
  venue: 'Salão de Festas X',
  guestCount: 100,
  requestedServices: ['Buffet', 'Decoração', 'Música']
})

function handleApprove() {
  alert('Orçamento aprovado! Nossa equipe entrará em contato.')
  router.push('/cliente/dashboard')
}

function handleReject() {
  alert('Orçamento recusado. Podemos ajustar a proposta às suas necessidades.')
  router.push('/cliente/dashboard')
}

function handleContact() {
  alert('Nossa equipe entrará em contato em breve!')
}
</script>