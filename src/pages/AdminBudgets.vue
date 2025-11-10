<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Gestão de Orçamentos</h1>
      </div>

      <!-- Tabs -->
      <div class="bg-gray-50 rounded-lg p-2 mb-4 flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key; page = 1"
          :class="['px-4 py-2 rounded font-medium text-sm', activeTab === tab.key ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900']"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Search -->
      <div class="mb-4">
        <input
          v-model="query"
          type="text"
          placeholder="Buscar por Cliente ou Evento"
          class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-left text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4">Cliente</th>
              <th class="py-3 px-4">Tipo de Evento</th>
              <th class="py-3 px-4">Data Solicitação</th>
              <th class="py-3 px-4">Status Atual</th>
              <th class="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in paged" :key="b.id" class="border-t text-sm">
              <td class="py-3 px-4">{{ b.client }}</td>
              <td class="py-3 px-4">{{ b.type }}</td>
              <td class="py-3 px-4">{{ b.date }}</td>
              <td class="py-3 px-4">
                <span :class="['px-2 py-1 rounded text-xs font-semibold', statusPillClass(b.status)]">{{ statusLabel(b.status) }}</span>
              </td>
              <td class="py-3 px-4">
                <div class="flex justify-end gap-2">
                  <button v-if="canAnalyze(b.status)" @click="analyze(b.id)" class="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700">Analisar Orçamento</button>
                  <button v-if="canReview(b.status)" @click="review(b.id)" class="px-3 py-1 rounded bg-amber-400 text-white text-xs font-semibold hover:bg-amber-500">Revisar</button>
                  <button @click="details(b.id)" class="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-300">Ver Detalhes</button>
                </div>
              </td>
            </tr>
            <tr v-if="paged.length === 0">
              <td colspan="5" class="py-6 px-4 text-center text-gray-500">Nenhum orçamento encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-4">
        <div class="text-sm text-gray-600">Mostrando {{ startIndex + 1 }}–{{ endIndex }} de {{ filtered.length }}</div>
        <div class="flex items-center gap-2">
          <button @click="prev" :disabled="page === 1" class="px-3 py-1 rounded border text-sm disabled:opacity-40">Anterior</button>
          <button v-for="p in totalPages" :key="p" @click="page = p" :class="['w-8 h-8 rounded border text-sm', p === page ? 'bg-purple-600 text-white border-purple-600' : 'bg-white']">{{ p }}</button>
          <button @click="next" :disabled="page === totalPages" class="px-3 py-1 rounded border text-sm disabled:opacity-40">Próximo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import budgetsData from '../data/budgets'

const router = useRouter()
const tabs = [
  { key: 'novas', label: 'Novas Solicitações' },
  { key: 'analise', label: 'Em Análise' },
  { key: 'aguardando', label: 'Aguardando Cliente' },
  { key: 'aprovados', label: 'Aprovados' },
  { key: 'recusados', label: 'Recusados' }
]

const activeTab = ref('novas')
const query = ref('')
const page = ref(1)
const pageSize = 5

const statusMap = {
  novas: ['pendente', 'nova solicitação', 'nova solicitacao'],
  analise: ['em análise', 'em analise'],
  aguardando: ['aguardando cliente'],
  aprovados: ['aprovado', 'confirmado', 'aprovados', 'confirmados'],
  recusados: ['recusado', 'recusados']
}

const budgets = ref(budgetsData)

const searchFilter = (b) => {
  const q = query.value.trim().toLowerCase()
  if (!q) return true
  return (
    (b.client || '').toLowerCase().includes(q) ||
    (b.title || '').toLowerCase().includes(q)
  )
}

const tabFilter = (b) => {
  const s = String(b.status || '').toLowerCase()
  const list = statusMap[activeTab.value]
  if (!list) return true
  return list.some((token) => s.includes(token))
}

const filtered = computed(() => budgets.value.filter((b) => searchFilter(b) && tabFilter(b)))

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const startIndex = computed(() => (page.value - 1) * pageSize)
const endIndex = computed(() => Math.min(filtered.value.length, startIndex.value + pageSize))
const paged = computed(() => filtered.value.slice(startIndex.value, endIndex.value))

function prev() { if (page.value > 1) page.value-- }
function next() { if (page.value < totalPages.value) page.value++ }

function statusLabel(status) {
  const s = String(status || '')
  if (/pendente/i.test(s)) return 'Nova Solicitação'
  if (/analis[ée]/i.test(s)) return 'Em Análise'
  if (/aguardando cliente/i.test(s)) return 'Aguardando Cliente'
  if (/confirmado|aprovado/i.test(s)) return 'Aprovado'
  if (/recusado/i.test(s)) return 'Recusado'
  if (/realizado/i.test(s)) return 'Realizado'
  return s
}

function statusPillClass(status) {
  const s = String(status || '').toLowerCase()
  if (s.includes('pendente')) return 'bg-yellow-100 text-yellow-800'
  if (s.includes('analis')) return 'bg-blue-100 text-blue-800'
  if (s.includes('aguardando')) return 'bg-amber-100 text-amber-800'
  if (s.includes('confirmado') || s.includes('aprov')) return 'bg-green-100 text-green-800'
  if (s.includes('recus')) return 'bg-red-100 text-red-800'
  if (s.includes('realiz')) return 'bg-gray-100 text-gray-800'
  return 'bg-gray-100 text-gray-800'
}

function canAnalyze(status) {
  return /pendente|nova/i.test(String(status))
}
function canReview(status) {
  return /analis|aguardando/i.test(String(status))
}

function analyze(id) { router.push(`/admin/orcamentos/${id}/analisar`) }
function review(id) { router.push(`/admin/orcamentos/${id}?review=1`) }
function details(id) { router.push(`/admin/orcamentos/${id}`) }
</script>
