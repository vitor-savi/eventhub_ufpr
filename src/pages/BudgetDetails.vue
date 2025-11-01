<template>
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-primary">Orçamento para: Casamento Ana & Beto</h1>
      <div class="mt-4 px-6 py-3 rounded-lg bg-yellow-100 text-yellow-800 font-semibold text-lg w-fit">Status: Aguardando sua Aprovação</div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Detalhes da Solicitação -->
      <div class="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-3">
        <h2 class="font-bold text-lg mb-2 text-gray-700">Detalhes da Solicitação</h2>
        <div class="text-sm text-gray-700">Tipo de Evento: Casamento</div>
        <div class="text-sm text-gray-700">Data Prevista: 20/07/2026</div>
        <div class="text-sm text-gray-700">Nº Convidados: 150</div>
        <div class="text-sm text-gray-700">Serviços: Refeições, Bebidas, Materiais, Decoração, Profissionais</div>
        <div class="text-sm text-gray-700">Observações do Cliente: Menu vegano, decoração rústica</div>
      </div>
      <!-- Proposta da EVENTHUB -->
      <div class="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-3">
        <h2 class="font-bold text-lg mb-2 text-gray-700">Proposta da EVENTHUB</h2>
        <div class="flex justify-between text-sm text-gray-700"><span>Refeições (150x)</span><span>R$ 7.000,00</span></div>
        <div class="flex justify-between text-sm text-gray-700"><span>Open Bar (150x)</span><span>R$ 4.000,00</span></div>
        <div class="flex justify-between text-sm text-gray-700"><span>Decoração Completa</span><span>R$ 5.000,00</span></div>
        <div class="flex justify-between text-sm text-gray-700"><span>Banda + DJ</span><span>R$ 4.000,00</span></div>
        <div class="flex justify-between text-sm text-gray-700"><span>Fotografia/Filmagem</span><span>R$ 2.000,00</span></div>
        <div class="mt-4 font-bold text-lg text-primary">Valor Total do Orçamento: R$ 22.000,00</div>
        <div class="text-sm text-gray-600">em 12x de R$ 1.833,33 sem juros</div>
        <a href="#" class="mt-2 text-blue-700 underline text-sm">Baixar Proposta Completa (PDF)</a>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 mt-8">
      <button class="flex-1 py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors text-lg">APROVAR ORÇAMENTO</button>
      <button class="flex-1 py-3 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors text-lg">RECUSAR ORÇAMENTO</button>
      <button class="flex-1 py-3 bg-blue-50 text-blue-700 rounded font-bold border border-blue-200 hover:bg-blue-100 transition-colors text-lg">Entrar em Contato para Dúvidas</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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