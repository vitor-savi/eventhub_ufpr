<template>
  <div class="min-h-screen bg-gray-50">
    <main class="flex-1 p-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Resumo Geral</h1>

      <!-- Highlight cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="p-6 rounded-lg text-white" style="background:#2F80ED">
          <div class="text-sm font-semibold">Novas Solicitações (X)</div>
          <div class="text-3xl font-bold mt-4">{{ highlights.requests }}</div>
        </div>
        <div class="p-6 rounded-lg text-white" style="background:#27AE60">
          <div class="text-sm font-semibold">Orçamentos Aprovados (Y)</div>
          <div class="text-3xl font-bold mt-4">{{ highlights.approved }}</div>
        </div>
        <div class="p-6 rounded-lg text-white" style="background:#F2C94C">
          <div class="text-sm font-semibold">Eventos Próximos (Z)</div>
          <div class="text-3xl font-bold mt-4">{{ highlights.upcoming }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Próximos Eventos -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="font-bold text-lg mb-4 text-gray-700">Próximos Eventos (Agenda Rápida)</h2>
          <div class="flex flex-col gap-3">
            <div v-for="event in upcomingEvents" :key="event.id" class="bg-gray-100 p-3 rounded text-sm text-gray-700">
              <strong class="mr-2">{{ event.date }}</strong> {{ event.title }} <span class="text-gray-500">({{ event.cliente || 'Cliente' }})</span>
            </div>
          </div>
        </div>

        <!-- Novas Solicitações -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="font-bold text-lg mb-4 text-gray-700">Novas Solicitações Recentes</h2>
          <div class="flex flex-col gap-3">
            <div v-for="request in newRequests" :key="request.id" class="flex items-center justify-between bg-gray-100 p-3 rounded text-sm text-gray-700">
              <div>{{ request.title }} - {{ request.date }}</div>
              <button class="px-4 py-1 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">Analisar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumo Financeiro -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="font-bold text-lg mb-4 text-gray-700">Resumo Financeiro</h2>
        <div class="text-sm mb-4">Lucro Estimado para Mês: <strong>R$ {{ financialSummary.monthlyProfit }}</strong></div>
        <FinancialChart :budgets="budgets" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import budgetsData from '../data/budgets'
import FinancialChart from '../components/FinancialChart.vue'

const budgets = ref(budgetsData)

const highlights = computed(() => ({
  requests: budgets.value.filter(b => ['pendente', 'Novas Solicitações', 'Pendente'].includes(((b.status || '') + '').toString())).length,
  approved: budgets.value.filter(b => ['confirmado', 'Aprovados', 'Aprovado', 'Confirmado'].includes(((b.status || '') + '').toString())).length,
  upcoming: budgets.value.filter(b => ['confirmado', 'aprovado', 'Aprovados', 'Confirmado'].includes(((b.status || '') + '').toString())).length
}))

const upcomingEvents = computed(() => budgets.value.filter(b => ['confirmado', 'aprovado', 'Aprovados', 'Confirmado'].includes(((b.status || '') + '').toString())).slice(0, 5).map(b => ({ id: b.id, title: b.title, date: b.date || b.data, cliente: b.client || b.cliente })))

const newRequests = computed(() => budgets.value.filter(b => ['pendente', 'Novas Solicitações', 'Pendente'].includes(((b.status || '') + '').toString())).slice(0, 5).map(b => ({ id: b.id, title: b.title, date: b.date || b.data })))

const financialSummary = ref({
  monthlyProfit: budgets.value.reduce((acc, b) => acc + Number(String(b.value || b.valor || '0').replace(/\./g, '').replace(/,/g, '.')), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
})
</script>
