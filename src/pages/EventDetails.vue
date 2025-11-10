<template>
  <div class="bg-white min-h-screen">
      <div class="max-w-7xl mx-auto px-4 pt-32 pb-12">
        <!-- Breadcrumb & Back Button -->
        <div class="mb-8 flex items-center gap-2">
          <button 
            @click="$router.back()"
            class="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <i class="pi pi-arrow-left"></i>
            Voltar
          </button>
        </div>

        <!-- Main Event Header -->
        <div class="bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-xl shadow-lg p-8 mb-8">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-4xl font-bold mb-2">{{ event.title }}</h1>
              <p class="text-purple-100 text-lg">{{ event.type }}</p>
            </div>
            <div :class="['px-6 py-3 rounded-full font-bold text-sm', getStatusBgClass(event.status)]">
              {{ getStatusLabel(event.status) }}
            </div>
          </div>
        </div>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column: Main Information -->
          <div class="lg:col-span-2 space-y-8">
            <!-- Event Details Card -->
            <div class="bg-white rounded-xl shadow p-8 border border-gray-200">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                <i class="pi pi-calendar text-purple-500"></i>
                Informações do Evento
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div class="mb-6">
                    <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide">Data do Evento</p>
                    <p class="text-2xl font-bold text-gray-800 mt-2">{{ event.date }}</p>
                  </div>
                  <div class="mb-6">
                    <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide">Cliente</p>
                    <p class="text-xl font-semibold text-gray-800 mt-2">{{ event.client }}</p>
                  </div>
                  <div>
                    <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide">Tipo de Evento</p>
                    <p class="text-lg font-semibold text-gray-800 mt-2">{{ event.type }}</p>
                  </div>
                </div>
                <div class="bg-gray-50 rounded-lg p-6">
                  <p class="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-4">Status do Evento</p>
                  <div class="space-y-3">
                    <div class="flex items-center gap-2">
                      <div :class="['w-4 h-4 rounded-full', getStatusDotClass(event.status)]"></div>
                      <span class="font-semibold" :class="getStatusTextClass(event.status)">
                        {{ getStatusLabel(event.status) }}
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm">{{ getStatusDescription(event.status) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Services Card -->
            <div class="bg-white rounded-xl shadow p-8 border border-gray-200">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                <i class="pi pi-briefcase text-purple-500"></i>
                Serviços Contratados
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(service, index) in servicesList" :key="index" class="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <i class="pi pi-check text-green-500 font-bold mt-1"></i>
                  <div>
                    <p class="font-semibold text-gray-800">{{ service.name }}</p>
                    <p class="text-sm text-gray-600 mt-1">{{ service.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Budget Breakdown Card -->
            <div class="bg-white rounded-xl shadow p-8 border border-gray-200">
              <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
                <i class="pi pi-wallet text-purple-500"></i>
                Detalhamento do Orçamento
              </h2>
              <div class="space-y-4">
                <div v-for="(item, index) in budgetItems" :key="index" class="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <p class="font-semibold text-gray-800">{{ item.name }}</p>
                    <p class="text-sm text-gray-600 mt-1">{{ item.details }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg text-purple-600">R$ {{ item.value }}</p>
                    <p class="text-xs text-gray-500 mt-1">{{ item.quantity }}x</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Summary & Actions -->
          <div class="space-y-6">
            <!-- Total Summary Card -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow p-8 border border-purple-200 sticky top-8">
              <h3 class="text-lg font-bold text-gray-800 mb-6">Resumo do Orçamento</h3>
              <div class="space-y-4 mb-6">
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">Subtotal:</span>
                  <span class="font-semibold text-gray-800">R$ {{ subtotal }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">Taxas:</span>
                  <span class="font-semibold text-gray-800">R$ {{ taxesValue }}</span>
                </div>
                <div class="border-t border-purple-300 pt-4 flex justify-between items-center">
                  <span class="text-lg font-bold text-gray-800">Total:</span>
                  <span class="text-2xl font-bold text-purple-600">R$ {{ event.value }}</span>
                </div>
              </div>

              <button 
                v-if="event.status === 'confirmado'"
                @click="downloadContract"
                class="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-lg font-bold hover:shadow-lg transition-all"
              >
                <i class="pi pi-download mr-2"></i>
                Download do Contrato
              </button>
              <button 
                v-else
                @click="$router.push(`/cliente/orcamentos/${event.id}`)"
                class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                <i class="pi pi-eye mr-2"></i>
                Ver Orçamento Completo
              </button>
            </div>

            <!-- Event Timeline -->
            <div class="bg-white rounded-xl shadow p-8 border border-gray-200">
              <h3 class="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <i class="pi pi-clock text-purple-500"></i>
                Timeline
              </h3>
              <div class="space-y-4">
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 rounded-full bg-green-500"></div>
                    <div class="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800">Solicitação Criada</p>
                    <p class="text-sm text-gray-600">{{ formatDate('20/10/2025') }}</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 rounded-full bg-green-500"></div>
                    <div class="w-0.5 h-8 bg-gray-300"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800">Orçamento Aprovado</p>
                    <p class="text-sm text-gray-600">{{ formatDate('22/10/2025') }}</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div :class="['w-4 h-4 rounded-full', event.status === 'confirmado' ? 'bg-green-500' : 'bg-gray-300']"></div>
                  </div>
                  <div>
                    <p class="font-semibold text-gray-800">Evento {{ event.status === 'confirmado' ? 'Confirmado' : 'Pendente' }}</p>
                    <p class="text-sm text-gray-600">{{ event.date }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Info -->
            <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <p class="text-sm text-blue-900">
                <i class="pi pi-info-circle mr-2"></i>
                <span class="font-semibold">Precisa de ajuda?</span> Entre em contato com nosso time de atendimento.
              </p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { budgets } from '../data/budgets'

const router = useRouter()
const route = useRoute()

// Get event from budgets data
const event = computed(() => {
  const found = budgets.find(b => b.id === parseInt(route.params.id))
  return found || {
    id: route.params.id,
    title: 'Evento não encontrado',
    type: 'N/A',
    date: 'N/A',
    status: 'pendente',
    value: '0,00',
    client: 'N/A'
  }
})

// Mock services list
const servicesList = computed(() => [
  { name: 'Buffet Completo', description: 'Menu completo com bebidas' },
  { name: 'Decoração Temática', description: 'Decoração personalizada' },
  { name: 'DJ e Som', description: 'Equipamento e profissional' },
  { name: 'Fotografia Profissional', description: '8 horas de cobertura' },
  { name: 'Assessoria no Dia', description: 'Coordenador de evento' },
  { name: 'Montagem e Desmontagem', description: 'Equipe especializada' }
])

// Mock budget breakdown
const budgetItems = computed(() => [
  { name: 'Buffet', details: 'Refeição para 100 pessoas', value: '8.000,00', quantity: '100' },
  { name: 'Bebidas', details: 'Coquetel completo', value: '2.500,00', quantity: '1' },
  { name: 'Decoração', details: 'Tema personalizado', value: '3.000,00', quantity: '1' },
  { name: 'DJ / Sonorização', details: 'Profissional + equipamento', value: '2.500,00', quantity: '1' },
  { name: 'Fotografia', details: '8 horas de cobertura', value: '2.000,00', quantity: '1' },
  { name: 'Serviços Gerais', details: 'Assessoria e montagem', value: '2.000,00', quantity: '1' }
])

// Calculate totals
const subtotal = computed(() => {
  const total = budgetItems.value.reduce((sum, item) => {
    const value = parseFloat(item.value.replace('.', '').replace(',', '.'))
    return sum + value
  }, 0)
  return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

const taxesValue = computed(() => {
  const total = budgetItems.value.reduce((sum, item) => {
    const value = parseFloat(item.value.replace('.', '').replace(',', '.'))
    return sum + value
  }, 0)
  const taxes = total * 0.10 // 10% taxa
  return taxes.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

function getStatusLabel(status) {
  const labels = {
    'confirmado': 'Confirmado',
    'pendente': 'Aguardando Aprovação',
    'realizado': 'Realizado',
    'recusado': 'Recusado'
  }
  return labels[status.toLowerCase()] || status
}

function getStatusBgClass(status) {
  const classes = {
    'confirmado': 'bg-green-500/80',
    'pendente': 'bg-yellow-500/80',
    'realizado': 'bg-gray-500/80',
    'recusado': 'bg-red-500/80'
  }
  return classes[status.toLowerCase()] || 'bg-gray-500/80'
}

function getStatusDotClass(status) {
  const classes = {
    'confirmado': 'bg-green-500',
    'pendente': 'bg-yellow-500',
    'realizado': 'bg-gray-500',
    'recusado': 'bg-red-500'
  }
  return classes[status.toLowerCase()] || 'bg-gray-500'
}

function getStatusTextClass(status) {
  const classes = {
    'confirmado': 'text-green-600',
    'pendente': 'text-yellow-600',
    'realizado': 'text-gray-600',
    'recusado': 'text-red-600'
  }
  return classes[status.toLowerCase()] || 'text-gray-600'
}

function getStatusDescription(status) {
  const descriptions = {
    'confirmado': 'Seu evento está confirmado e pronto para ser realizado.',
    'pendente': 'Aguardando sua aprovação do orçamento.',
    'realizado': 'Evento já foi realizado com sucesso.',
    'recusado': 'O orçamento foi recusado.'
  }
  return descriptions[status.toLowerCase()] || 'Status do evento'
}

function formatDate(date) {
  const [day, month, year] = date.split('/')
  return `${day}/${month}/${year}`
}

function downloadContract() {
  alert('Download do contrato iniciado!')
}
</script>