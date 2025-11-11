<template>
  <div class="min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800">Relatórios Financeiros</h1>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow border border-gray-200 p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Período Inicial</label>
          <input type="date" v-model="startDate" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Período Final</label>
          <input type="date" v-model="endDate" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Filtrar por Tipo de Evento</label>
          <select v-model="filterType" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="">Todos</option>
            <option value="Casamento">Casamento</option>
            <option value="Aniversário">Aniversário</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Formatura">Formatura</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Agrupar por</label>
          <select v-model="groupBy" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="month">Mês</option>
            <option value="quarter">Trimestre</option>
            <option value="type">Tipo de Evento</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="generateReport" class="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Profit Evolution Chart -->
      <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Evolução do Lucro no Período</h2>
        <svg viewBox="0 0 600 300" class="w-full h-64">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <!-- Grid lines -->
          <line v-for="i in 5" :key="'grid'+i" :x1="50" :x2="580" :y1="50 + i * 40" :y2="50 + i * 40" stroke="#E5E7EB" stroke-width="1"/>
          <!-- Y-axis labels -->
          <text v-for="(val, i) in yAxisLabels" :key="'ylabel'+i" :x="10" :y="250 - i * 40" font-size="11" fill="#6B7280">{{ val }}</text>
          <!-- Line chart -->
          <polyline :points="linePoints" fill="url(#lineGradient)" stroke="#8B5CF6" stroke-width="3"/>
          <circle v-for="(point, i) in profitData" :key="'point'+i" :cx="80 + i * 100" :cy="250 - (point.profit / maxProfit) * 200" r="5" fill="#8B5CF6"/>
          <!-- X-axis labels -->
          <text v-for="(point, i) in profitData" :key="'xlabel'+i" :x="80 + i * 100" y="280" font-size="11" text-anchor="middle" fill="#6B7280">{{ point.label }}</text>
        </svg>
      </div>

      <!-- Profit Distribution Pie Chart -->
      <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Distribuição de Lucro por Tipo de Evento</h2>
        <svg viewBox="0 0 300 300" class="w-full h-64">
          <g transform="translate(150, 150)">
            <path v-for="(slice, i) in pieSlices" :key="'slice'+i" :d="slice.path" :fill="slice.color" stroke="white" stroke-width="2"/>
          </g>
          <!-- Legend -->
          <g transform="translate(220, 50)">
            <g v-for="(item, i) in pieLegend" :key="'legend'+i" :transform="`translate(0, ${i * 25})`">
              <rect width="15" height="15" :fill="item.color"/>
              <text x="20" y="12" font-size="11" fill="#374151">{{ item.label }}</text>
            </g>
          </g>
        </svg>
      </div>
    </div>

    <!-- Detailed Table -->
    <div class="bg-white rounded-xl shadow border border-gray-200 mb-6">
      <div class="p-6 border-b">
        <h2 class="text-lg font-bold text-gray-800">Tabela Detalhada</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left">Evento</th>
              <th class="py-3 px-4 text-left">Data</th>
              <th class="py-3 px-4 text-right">Custo Total (R$)</th>
              <th class="py-3 px-4 text-right">Faturamento (R$)</th>
              <th class="py-3 px-4 text-right">Lucro (R$)</th>
              <th class="py-3 px-4 text-right">Margem (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in reportData" :key="item.id" class="border-t text-sm">
              <td class="py-3 px-4">{{ item.event }}</td>
              <td class="py-3 px-4">{{ item.date }}</td>
              <td class="py-3 px-4 text-right">{{ fmt(item.cost) }}</td>
              <td class="py-3 px-4 text-right">{{ fmt(item.revenue) }}</td>
              <td class="py-3 px-4 text-right font-semibold" :class="item.profit >= 0 ? 'text-green-600' : 'text-red-600'">{{ fmt(item.profit) }}</td>
              <td class="py-3 px-4 text-right">{{ item.margin.toFixed(2) }}%</td>
            </tr>
          </tbody>
          <tfoot class="bg-gray-100 font-bold text-sm">
            <tr>
              <td colspan="2" class="py-3 px-4">TOTAL</td>
              <td class="py-3 px-4 text-right">{{ fmt(totals.cost) }}</td>
              <td class="py-3 px-4 text-right">{{ fmt(totals.revenue) }}</td>
              <td class="py-3 px-4 text-right text-green-600">{{ fmt(totals.profit) }}</td>
              <td class="py-3 px-4 text-right">{{ totals.margin.toFixed(2) }}%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Export Buttons -->
    <div class="flex justify-end gap-4">
      <button @click="exportPDF" class="px-6 py-3 rounded bg-red-600 text-white font-semibold hover:bg-red-700 flex items-center gap-2">
        <i class="pi pi-file-pdf"></i>
        Exportar para PDF
      </button>
      <button @click="exportExcel" class="px-6 py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700 flex items-center gap-2">
        <i class="pi pi-file-excel"></i>
        Exportar para Excel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const startDate = ref('2023-10-01')
const endDate = ref('2023-12-31')
const filterType = ref('')
const groupBy = ref('month')

// Mock financial data
const reportData = ref([
  { id: 1, event: 'Conferência Anual', date: '2023-10-26', cost: 15000, revenue: 25000, profit: 10000, margin: 40.00, type: 'Corporativo' },
  { id: 2, event: 'Workshop de Marketing', date: '2023-11-15', cost: 5000, revenue: 8000, profit: 3000, margin: 37.50, type: 'Corporativo' },
  { id: 3, event: 'Seminário de Inovação', date: '2023-12-01', cost: 8000, revenue: 12000, profit: 4000, margin: 33.33, type: 'Corporativo' },
  { id: 4, event: 'Casamento Silva & Costa', date: '2023-10-15', cost: 12000, revenue: 22000, profit: 10000, margin: 45.45, type: 'Casamento' },
  { id: 5, event: 'Aniversário 15 Anos', date: '2023-11-20', cost: 4000, revenue: 8000, profit: 4000, margin: 50.00, type: 'Aniversário' }
])

const totals = computed(() => {
  const cost = reportData.value.reduce((sum, r) => sum + r.cost, 0)
  const revenue = reportData.value.reduce((sum, r) => sum + r.revenue, 0)
  const profit = revenue - cost
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0
  return { cost, revenue, profit, margin }
})

// Profit evolution data for line chart
const profitData = computed(() => [
  { label: 'Out', profit: 20000 },
  { label: 'Nov', profit: 15000 },
  { label: 'Dez', profit: 16000 },
  { label: 'Jan', profit: 22000 },
  { label: 'Fev', profit: 27000 }
])

const maxProfit = computed(() => Math.max(...profitData.value.map(d => d.profit)))
const yAxisLabels = computed(() => {
  const max = maxProfit.value
  return [0, Math.round(max * 0.25), Math.round(max * 0.5), Math.round(max * 0.75), Math.round(max)]
})

const linePoints = computed(() => {
  return profitData.value.map((p, i) => {
    const x = 80 + i * 100
    const y = 250 - (p.profit / maxProfit.value) * 200
    return `${x},${y}`
  }).join(' ') + ' 580,250 50,250'
})

// Pie chart data
const pieData = computed(() => [
  { label: 'Casamento', value: 10000, color: '#8B5CF6' },
  { label: 'Corporativo', value: 17000, color: '#3B82F6' },
  { label: 'Aniversário', value: 4000, color: '#F59E0B' },
  { label: 'Formatura', value: 6000, color: '#10B981' }
])

const pieTotal = computed(() => pieData.value.reduce((sum, p) => sum + p.value, 0))

const pieSlices = computed(() => {
  let currentAngle = -90
  return pieData.value.map(item => {
    const sliceAngle = (item.value / pieTotal.value) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + sliceAngle
    currentAngle = endAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180
    const radius = 100

    const x1 = Math.cos(startRad) * radius
    const y1 = Math.sin(startRad) * radius
    const x2 = Math.cos(endRad) * radius
    const y2 = Math.sin(endRad) * radius

    const largeArc = sliceAngle > 180 ? 1 : 0
    const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`

    return { path, color: item.color }
  })
})

const pieLegend = computed(() => pieData.value.map(p => ({ label: p.label, color: p.color })))

function generateReport() {
  alert('Relatório gerado com os filtros selecionados!')
}

function exportPDF() {
  alert('Exportando relatório para PDF...')
}

function exportExcel() {
  alert('Exportando relatório para Excel...')
}

function fmt(n) {
  return Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
