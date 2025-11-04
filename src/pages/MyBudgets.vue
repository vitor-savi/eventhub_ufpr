<template>
  <div class="container mx-auto px-4 py-16">
    <h1 class="text-3xl font-bold text-primary mb-10">Meus Orçamentos</h1>
    <div class="space-y-6">
      <div v-for="budget in budgets" :key="budget.id" class="bg-white rounded-xl shadow border border-blue-100 p-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="w-4 h-4 rounded-full" :class="statusColor(budget.status)"></span>
          <div>
            <div class="font-bold text-lg text-gray-800">{{ budget.title }}</div>
            <div class="text-sm text-gray-500">{{ budget.date }}</div>
            <div class="text-xs" :class="statusTextColor(budget.status)">Status: {{ budget.status }}</div>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <div class="text-xl font-bold text-primary">R$ {{ budget.value }}</div>
          <router-link :to="`/cliente/orcamentos/${budget.id}`" class="px-5 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">Detalhes do Orçamento</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import budgetsData from '../data/budgets'

const budgets = ref(budgetsData)

function statusColor(status) {
  if (status === 'pendente') return 'bg-yellow-400'
  if (status === 'confirmado') return 'bg-green-500'
  if (status === 'realizado') return 'bg-gray-400'
  if (status === 'recusado') return 'bg-red-500'
  return 'bg-gray-400'
}

function statusTextColor(status) {
  if (status === 'pendente') return 'text-yellow-600'
  if (status === 'confirmado') return 'text-green-600'
  if (status === 'realizado') return 'text-gray-600'
  if (status === 'recusado') return 'text-red-600'
  return 'text-gray-600'
}
</script>