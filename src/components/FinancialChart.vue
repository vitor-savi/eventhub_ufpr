<template>
  <svg :viewBox="`0 0 ${width} ${height}`" preserveAspectRatio="xMidYMid meet" class="w-full h-40">
    <g v-for="(bar, i) in bars" :key="bar.label">
      <rect :x="i * (barWidth + gap) + gap" :y="height - bar.height - bottomPadding" :width="barWidth" :height="bar.height" :fill="barColor" rx="6"></rect>
      <text :x="i * (barWidth + gap) + gap + barWidth/2" :y="height - 6" font-size="12" text-anchor="middle" fill="#6B7280">{{ bar.label }}</text>
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { toNumber } from '../utils/number'

const props = defineProps({ budgets: { type: Array, default: () => [] } })

// compute monthly sums from budgets dates (dd/mm/yyyy)
const monthsMap = computed(() => {
  const map = {}
  props.budgets.forEach(b => {
    const dateStr = b.date || b.data
    if (!dateStr) return
    const parts = dateStr.split('/')
    if (parts.length !== 3) return
    const key = parts[2] + '-' + parts[1] // yyyy-mm
    const value = toNumber(b.value || b.valor || b.value || '0')
    map[key] = (map[key] || 0) + value
  })
  return map
})

const labels = computed(() => Object.keys(monthsMap.value).sort())
const values = computed(() => labels.value.map(l => monthsMap.value[l]))

const maxVal = computed(() => Math.max(1, ...values.value))

const barColor = '#60A5FA'
const width = 600
const height = 160
const bottomPadding = 24
const gap = 12
const barWidth = computed(() => Math.max(24, (width - gap * (labels.value.length + 1)) / Math.max(1, labels.value.length)))

const bars = computed(() => labels.value.map((label, i) => {
  const val = values.value[i] || 0
  const h = Math.round((val / maxVal.value) * (height - bottomPadding - 20))
  return { label: label.split('-')[1] || label, value: val, height: h }
}))
</script>
