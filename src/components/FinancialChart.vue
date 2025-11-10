<template>
  <div class="relative w-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <i class="pi pi-chart-bar text-purple-600"></i>
        Faturamento Mensal ({{ currentYear }})
      </h3>
      <div class="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">YTD: R$ {{ ytdTotal }}</div>
    </div>
    <svg :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="xMidYMid meet" class="w-full h-64 select-none" role="img" aria-label="Gráfico de barras do faturamento mensal">
      <!-- Gradients -->
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#8B5CF6" />
          <stop offset="100%" stop-color="#6366F1" />
        </linearGradient>
      </defs>
      <!-- Y Axis grid lines -->
      <g>
        <line v-for="(g, gi) in gridLines" :key="gi" :x1="0" :x2="width" :y1="g.y" :y2="g.y" stroke="#E5E7EB" stroke-width="1" />
        <text v-for="(g, gi) in gridLines" :key="'lbl'+gi" :x="4" :y="g.y - 4" font-size="10" fill="#6B7280">R$ {{ g.label }}</text>
      </g>
      <!-- Bars -->
      <g v-for="(bar, i) in bars" :key="bar.month" class="cursor-pointer"
         @mouseenter="showTooltip(i, $event)" @mouseleave="hideTooltip">
        <rect :x="bar.x" :y="bar.y" :width="barWidth" :height="bar.h" fill="url(#barGradient)" rx="6" :aria-label="`Mês ${bar.month} faturamento ${formatCurrency(bar.value)}`" />
        <text :x="bar.x + barWidth/2" :y="height - bottomPadding + 14" font-size="11" text-anchor="middle" fill="#6B7280">{{ bar.month }}</text>
        <text v-if="bar.h > 28" :x="bar.x + barWidth/2" :y="bar.y + 16" font-size="10" text-anchor="middle" fill="white" class="pointer-events-none">{{ shortCurrency(bar.value) }}</text>
      </g>
    </svg>
    <!-- Tooltip -->
    <div v-if="tooltip.visible" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }" class="absolute z-10 bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg pointer-events-none">
      <div class="font-semibold">{{ tooltip.month }}</div>
      <div>Faturamento: <span class="font-bold">R$ {{ formatCurrency(tooltip.value) }}</span></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { toNumber } from '../utils/number'

const props = defineProps({ budgets: { type: Array, default: () => [] } })

// Year and months
const currentYear = new Date().getFullYear()
const currentMonthIndex = new Date().getMonth() // 0-based
const monthLabels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

// Base imaginary monthly revenue (reais) can be adjusted; will be overridden by actual sums if budgets exist for that month
const baseValues = [12000, 15000, 18000, 17000, 16500, 19000, 21000, 22500, 24000, 26000, 27500, 29000]

// Aggregate real budgets by month (format dd/mm/yyyy)
const realMonthlyMap = computed(() => {
  const map = {}
  props.budgets.forEach(b => {
    const dateStr = b.date || b.data
    if (!dateStr) return
    const [day, month, year] = dateStr.split('/')
    if (!month || !year) return
    const idx = parseInt(month, 10) - 1
    if (idx < 0 || idx > 11) return
    const val = toNumber(b.value || b.valor || '0')
    map[idx] = (map[idx] || 0) + val
  })
  return map
})

// Final monthly values up to current month
const monthlyValues = computed(() => {
  return monthLabels.map((label, i) => {
    if (i > currentMonthIndex) return null // hide future months
    const real = realMonthlyMap.value[i]
    return real && real > 0 ? real : baseValues[i]
  }).filter(v => v !== null)
})

// Chart dimensions
const height = 260
const width = 800
const bottomPadding = 40
const leftPadding = 0
const gap = 18
const barWidth = 32

const maxValue = computed(() => Math.max(...monthlyValues.value, 1))

// Generate grid lines (5 including top)
const gridLines = computed(() => {
  const steps = 5
  const arr = []
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1)
    const y = (height - bottomPadding) - ratio * (height - bottomPadding - 10)
    const labelVal = Math.round(maxValue.value * ratio)
    arr.push({ y, label: labelVal.toLocaleString('pt-BR') })
  }
  return arr
})

// Bars computed with positions
const bars = computed(() => {
  const count = monthlyValues.value.length
  return monthlyValues.value.map((value, i) => {
    const x = leftPadding + gap + i * (barWidth + gap)
    const h = Math.max(4, Math.round(value / maxValue.value * (height - bottomPadding - 10)))
    const y = (height - bottomPadding) - h
    return { month: monthLabels[i], value, h, x, y }
  })
})

// YTD total
const ytdTotal = computed(() => {
  const sum = monthlyValues.value.reduce((acc, v) => acc + v, 0)
  return sum.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

// Tooltip state
const tooltip = ref({ visible: false, x: 0, y: 0, month: '', value: 0 })
function showTooltip(index, evt) {
  const bar = bars.value[index]
  const container = evt.currentTarget.closest('svg').getBoundingClientRect()
  tooltip.value = {
    visible: true,
    x: evt.clientX - container.left + 8,
    y: evt.clientY - container.top - 40,
    month: bar.month,
    value: bar.value
  }
}
function hideTooltip() {
  tooltip.value.visible = false
}

// Helpers
function formatCurrency(val) {
  return Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
function shortCurrency(val) {
  if (val >= 1000) {
    return 'R$ ' + (val/1000).toFixed(1).replace('.', ',') + 'k'
  }
  return 'R$ ' + formatCurrency(val)
}
</script>

<style scoped>
svg { overflow: visible; }
@media (max-width: 900px) {
  svg { height: 300px; }
}
rect { transition: all .4s cubic-bezier(.4,0,.2,1); }
rect:hover { filter: brightness(1.15); }
</style>
