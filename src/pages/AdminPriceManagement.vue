<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Gestão de Preços de Venda</h1>
        <div class="w-full md:w-72">
          <input v-model.trim="search" type="text" placeholder="Buscar por item..." class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
      </div>

      <div class="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table class="min-w-full">
          <thead class="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left w-60">Item</th>
              <th class="py-3 px-4 text-right w-40">Custo Unitário (R$)</th>
              <th class="py-3 px-4 text-right w-40">Margem de Lucro (%)</th>
              <th class="py-3 px-4 text-right w-48">Preço de Venda Unitário (R$)</th>
              <th class="py-3 px-4 text-left w-40">Última Atualização</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in filtered" :key="row.id" class="border-t text-sm hover:bg-gray-50 transition">
              <td class="py-2.5 px-4 align-middle">
                <input v-model="row.name" @input="markDirty(row)" class="w-full bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </td>
              <td class="py-2.5 px-4 align-middle text-right">
                <input v-model="row.costStr" @blur="applyCost(row)" @input="markDirty(row, 'cost')" class="w-full text-right bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </td>
              <td class="py-2.5 px-4 align-middle text-right">
                <input v-model="row.marginStr" @blur="applyMargin(row)" @input="markDirty(row, 'margin')" class="w-full text-right bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </td>
              <td class="py-2.5 px-4 align-middle text-right">
                <input v-model="row.priceStr" @blur="applyPrice(row)" @input="markDirty(row, 'price', true)" class="w-full text-right bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              </td>
              <td class="py-2.5 px-4 align-middle whitespace-nowrap">
                <span :class="['text-xs font-medium px-2 py-1 rounded', row.dirty ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600']">
                  {{ row.updatedAt || '—' }}
                </span>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="5" class="py-6 px-4 text-center text-gray-500">Nenhum item encontrado.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 flex justify-end">
        <button @click="saveChanges" :disabled="!hasDirty" class="px-6 py-3 rounded bg-blue-600 disabled:opacity-40 text-white font-semibold hover:bg-blue-700 flex items-center gap-2">
          Salvar Alterações
        </button>
      </div>

      <p v-if="saveMessage" class="mt-4 text-sm font-medium" :class="saveError ? 'text-red-600' : 'text-green-600'">{{ saveMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Initial dataset (would come from API in real app). Combined professionals + materials/services
const rows = ref([
  { id: 1, name: 'Diária Garçom', cost: 150.00, margin: 20, updatedAt: '2025-10-26' },
  { id: 2, name: 'Banda X - Show Completo', cost: 2500.00, margin: 25, updatedAt: '2025-10-26' },
  { id: 3, name: 'DJ Y - 4 Horas', cost: 800.00, margin: 18, updatedAt: '2025-10-25' },
  { id: 4, name: 'Quilo Filé Mignon', cost: 89.90, margin: 35, updatedAt: '2025-10-24' },
  { id: 5, name: 'Pacote Louça Completa', cost: 500.00, margin: 30, updatedAt: '2025-10-24' },
  { id: 6, name: 'Iluminação Cênica (pacote)', cost: 1200.00, margin: 28, updatedAt: '2025-10-23' },
])

// Enhance with derived price and string fields
rows.value.forEach(r => {
  r.price = r.cost * (1 + r.margin / 100)
  r.costStr = fmt(r.cost)
  r.marginStr = String(r.margin)
  r.priceStr = fmt(r.price)
  r.dirty = false
  r.manualPrice = false
})

const search = ref('')
const saveMessage = ref('')
const saveError = ref(false)
let saveTimer = null

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return rows.value
  return rows.value.filter(r => r.name.toLowerCase().includes(q))
})

const hasDirty = computed(() => rows.value.some(r => r.dirty))

function fmt(n) {
  return Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function parseBRL(str) {
  if (str == null || str === '') return NaN
  const cleaned = String(str).replace(/\s+/g,'').replace(/\./g,'').replace(/,/g,'.')
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : NaN
}

function markDirty(row, field, manualPrice = false) {
  row.dirty = true
  if (manualPrice) row.manualPrice = true
  if (field === 'cost' || field === 'margin') {
    // If user edits cost or margin and price was previously manually overridden, keep manual price unless cost changed drastically? For now if cost/margin edit resets manual flag.
    if (field !== 'price') row.manualPrice = false
  }
}

function applyCost(row) {
  const val = parseBRL(row.costStr)
  if (!(val >= 0)) { row.costStr = fmt(row.cost); return }
  row.cost = val
  if (!row.manualPrice) {
    row.price = row.cost * (1 + row.margin / 100)
    row.priceStr = fmt(row.price)
  } else {
    // Recalculate margin from manual price
    row.margin = row.cost > 0 ? ((row.price - row.cost) / row.cost) * 100 : 0
    row.marginStr = String(Math.round(row.margin * 100) / 100)
  }
}

function applyMargin(row) {
  const margin = Number(String(row.marginStr).replace(/,/g,'.'))
  if (!(margin >= 0)) { row.marginStr = String(row.margin); return }
  row.margin = margin
  if (!row.manualPrice) {
    row.price = row.cost * (1 + row.margin / 100)
    row.priceStr = fmt(row.price)
  } else {
    // Manual price overrides margin; adjust priceStr format
    row.priceStr = fmt(row.price)
  }
}

function applyPrice(row) {
  const val = parseBRL(row.priceStr)
  if (!(val >= 0)) { row.priceStr = fmt(row.price); return }
  row.price = val
  row.manualPrice = true
  // Recalculate margin from manual price
  row.margin = row.cost > 0 ? ((row.price - row.cost) / row.cost) * 100 : 0
  row.marginStr = String(Math.round(row.margin * 100) / 100)
}

function saveChanges() {
  const now = new Date()
  const dateStr = now.toISOString().substring(0,10)
  let invalid = false
  rows.value.forEach(r => {
    if (r.dirty) {
      if (!(r.cost >= 0) || !(r.price >= 0) || !(r.margin >= 0) || !r.name) {
        invalid = true
      }
    }
  })
  if (invalid) {
    showMessage('Existem valores inválidos. Verifique antes de salvar.', true)
    return
  }
  rows.value.forEach(r => {
    if (r.dirty) {
      r.updatedAt = dateStr
      r.dirty = false
      r.manualPrice = false // lock-in current margin/price relationship
      r.costStr = fmt(r.cost)
      r.priceStr = fmt(r.price)
    }
  })
  showMessage('Alterações salvas com sucesso.')
}

function showMessage(msg, isError = false) {
  saveMessage.value = msg
  saveError.value = isError
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => { saveMessage.value = '' }, 4000)
}
</script>
