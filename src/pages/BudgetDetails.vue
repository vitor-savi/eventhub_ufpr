<template>
  <div class="container mx-auto px-4 py-16 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-primary">Orçamento para: {{ budget.title }}</h1>
      <div class="mt-4 px-6 py-3 rounded-lg" :class="statusBgColor(budget.status) + ' font-semibold text-lg w-fit'">
        Status: {{ statusLabel(budget.status) }}
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Detalhes da Solicitação -->
      <div class="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-3">
        <h2 class="font-bold text-lg mb-2 text-gray-700">Detalhes da Solicitação</h2>
        <div class="text-sm text-gray-700">Tipo de Evento: {{ budget.type }}</div>
        <div class="text-sm text-gray-700">Data Prevista: {{ budget.date }}</div>
        <div class="text-sm text-gray-700">Nº Convidados: {{ budget.guestCount }}</div>
        <div class="text-sm text-gray-700">Serviços: {{ budget.services.join(', ') }}</div>
        <div class="text-sm text-gray-700">Observações do Cliente: {{ budget.notes }}</div>
      </div>
      <!-- Proposta da EVENTHUB -->
      <div class="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-3">
        <h2 class="font-bold text-lg mb-2 text-gray-700">Proposta da EVENTHUB</h2>
        <div v-for="item in budget.proposal" :key="item.name" class="flex justify-between text-sm text-gray-700">
          <span>{{ item.name }}</span><span>R$ {{ item.value }}</span>
        </div>
        <div class="mt-4 font-bold text-lg text-primary">Valor Total do Orçamento: R$ {{ budget.total }}</div>
        <div class="text-sm text-gray-600">em {{ budget.installments }}x de R$ {{ budget.installmentValue }} sem juros</div>
        <a href="#" class="mt-2 text-blue-700 underline text-sm">Baixar Proposta Completa (PDF)</a>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 mt-8">
      <button @click="handleApprove" class="flex-1 py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition-colors text-lg">APROVAR ORÇAMENTO</button>
      <button @click="handleReject" class="flex-1 py-3 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors text-lg">RECUSAR ORÇAMENTO</button>
      <button @click="handleContact" class="flex-1 py-3 bg-blue-50 text-blue-700 rounded font-bold border border-blue-200 hover:bg-blue-100 transition-colors text-lg">Entrar em Contato para Dúvidas</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const budget = ref({
  id: 1,
  title: 'Aniversário de 15 anos',
  type: 'Aniversário',
  date: '20/01/2026',
  guestCount: 80,
  status: 'pendente',
  services: ['Refeições', 'Bebidas', 'Materiais', 'Decoração', 'Profissionais'],
  notes: 'Menu vegano, decoração rústica',
  proposal: [
    { name: 'Refeições (80x)', value: '4.000,00' },
    { name: 'Open Bar (80x)', value: '2.000,00' },
    { name: 'Decoração Completa', value: '2.000,00' },
    { name: 'Banda + DJ', value: '2.000,00' },
    { name: 'Fotografia/Filmagem', value: '1.000,00' }
  ],
  total: '11.000,00',
  installments: 10,
  installmentValue: '1.100,00'
})

function statusLabel(status) {
  if (status === 'pendente') return 'Aguardando sua Aprovação'
  if (status === 'confirmado') return 'Aprovado'
  if (status === 'Realizado') return 'Realizado'
  if (status === 'Recusado') return 'Recusado'
  return status
}

function statusBgColor(status) {
  if (status === 'pendente') return 'bg-yellow-100 text-yellow-800'
  if (status === 'confirmado') return 'bg-green-100 text-green-800'
  if (status === 'Realizado') return 'bg-gray-100 text-gray-800'
  if (status === 'Recusado') return 'bg-red-100 text-red-800'
  return 'bg-gray-100 text-gray-800'
}

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