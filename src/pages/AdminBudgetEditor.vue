<template>
  <div class="min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800">
        Orçamento para: <span class="text-primary">{{ budget.title }}</span>
        <span class="text-gray-500">— Cliente: </span>
        <span class="text-primary">{{ budget.client }}</span>
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Original request -->
      <section class="lg:col-span-1 bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 class="font-bold text-gray-800 mb-4">Pedido Original do Cliente</h2>
        <div class="text-sm text-gray-700 space-y-3">
          <div>
            <div class="font-semibold">Tipo de Evento:</div>
            <div>{{ budget.type || '—' }}</div>
          </div>
          <div>
            <div class="font-semibold">Data do Evento:</div>
            <div>{{ budget.date || '—' }}</div>
          </div>
          <div>
            <div class="font-semibold">Observações:</div>
            <p class="whitespace-pre-wrap">{{ originalNotes }}</p>
          </div>
        </div>
      </section>

      <!-- Right: Proposal builder -->
      <section class="lg:col-span-2 space-y-6">
        <!-- Add item search -->
        <div class="bg-white rounded-xl shadow border border-gray-200 p-4">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Adicionar Serviço/Material/Profissional</label>
          <div class="relative">
            <input v-model="search" @focus="showDropdown = true" @keydown.escape="showDropdown = false"
                   type="text" placeholder="Buscar item do catálogo"
                   class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
            <ul v-if="showDropdown && filteredCatalog.length" class="absolute mt-1 z-10 w-full bg-white border border-gray-200 rounded shadow max-h-56 overflow-auto">
              <li v-for="it in filteredCatalog" :key="it.id" @click="addItem(it)" class="px-4 py-2 hover:bg-gray-50 cursor-pointer flex justify-between">
                <span>{{ it.name }}</span>
                <span class="text-xs text-gray-500">C: R$ {{ fmt(it.cost) }} • P: R$ {{ fmt(it.price) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Items table -->
        <div class="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50 text-xs uppercase text-gray-600">
              <tr>
                <th class="py-3 px-4 text-left">Item</th>
                <th class="py-3 px-4 text-left">Quantidade</th>
                <th class="py-3 px-4 text-left">Custo Unitário (R$)</th>
                <th class="py-3 px-4 text-left">Preço Unitário (R$)</th>
                <th class="py-3 px-4 text-left">Subtotal (R$)</th>
                <th class="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in rows" :key="row.uid" class="border-t text-sm">
                <td class="py-3 px-4">
                  <select v-model="row.catalogId" @change="updateFromCatalog(row)" class="w-full border rounded px-3 py-2">
                    <option :value="it.id" v-for="it in catalog" :key="it.id">{{ it.name }}</option>
                  </select>
                </td>
                <td class="py-3 px-4">
                  <input type="number" min="1" v-model.number="row.qty" class="w-24 border rounded px-3 py-2" />
                </td>
                <td class="py-3 px-4 text-gray-600">R$ {{ fmt(row.cost) }}</td>
                <td class="py-3 px-4">
                  <input type="text" v-model="row.priceStr" @input="syncPrice(row)" class="w-28 border rounded px-3 py-2"/>
                </td>
                <td class="py-3 px-4 font-semibold">R$ {{ fmt(row.qty * row.price) }}</td>
                <td class="py-3 px-4">
                  <div class="flex justify-end">
                    <button @click="removeRow(idx)" class="px-3 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200">Remover</button>
                  </div>
                </td>
              </tr>
              <tr v-if="rows.length === 0">
                <td colspan="6" class="py-6 px-4 text-center text-gray-500">Nenhum item adicionado.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Extra fields -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white rounded-xl shadow border border-gray-200 p-4">
            <label class="block text-sm font-semibold mb-1">Taxa de Serviço (%)</label>
            <input type="number" min="0" v-model.number="serviceFee" class="w-full border rounded px-3 py-2"/>
          </div>
          <div class="bg-white rounded-xl shadow border border-gray-200 p-4">
            <label class="block text-sm font-semibold mb-1">Desconto Total (R$)</label>
            <input type="text" v-model="discountStr" @input="syncDiscount" class="w-full border rounded px-3 py-2"/>
          </div>
          <div class="bg-white rounded-xl shadow border border-gray-200 p-4 md:col-span-1">
            <label class="block text-sm font-semibold mb-1">Observações para o Cliente</label>
            <textarea v-model="clientNotes" rows="3" class="w-full border rounded px-3 py-2"></textarea>
          </div>
        </div>

        <!-- Financial summary -->
        <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <div class="text-sm text-gray-600">Custo Total Previsto (EVENTHUB):</div>
              <div class="text-lg font-bold">R$ {{ fmt(totalCost) }}</div>
              <div class="text-sm text-gray-600">Margem de Lucro (%):</div>
              <div class="text-lg font-bold">{{ margin.toFixed(2) }}%</div>
            </div>
            <div class="space-y-2">
              <div class="text-sm text-gray-600">Lucro Bruto Previsto:</div>
              <div class="text-lg font-bold">R$ {{ fmt(grossProfit) }}</div>
              <div class="text-sm text-gray-600">Taxa de Serviço (R$):</div>
              <div class="text-lg font-bold">R$ {{ fmt(serviceFeeValue) }}</div>
            </div>
            <div class="flex items-center justify-end">
              <div class="text-right">
                <div class="text-sm text-gray-600 mb-1">Total Final</div>
                <div class="text-3xl font-extrabold text-primary">R$ {{ fmt(totalFinal) }}</div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <button @click="saveDraft" class="px-6 py-3 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200">Salvar como Rascunho</button>
            <button @click="saveAndSend" class="px-6 py-3 rounded bg-gradient-to-r from-purple-500 to-purple-400 text-white font-bold hover:shadow">Salvar e Enviar para Cliente</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import budgetsData from '../data/budgets'
import { toNumber } from '../utils/number'

const route = useRoute()
const router = useRouter()

const budget = computed(() => {
  const b = budgetsData.find(x => x.id === parseInt(route.params.id))
  return b || { id: route.params.id, title: 'Evento', client: 'Cliente', type: '—', date: '—' }
})

// Catalog of items (could be sourced from API later)
const catalog = ref([
  { id: 1, name: 'Buffet Completo', cost: 80.00, price: 120.00 },
  { id: 2, name: 'Open Bar', cost: 30.00, price: 60.00 },
  { id: 3, name: 'Decoração', cost: 50.00, price: 90.00 },
  { id: 4, name: 'DJ / Som', cost: 40.00, price: 70.00 },
  { id: 5, name: 'Fotografia', cost: 35.00, price: 65.00 },
  { id: 6, name: 'Equipe de Montagem', cost: 25.00, price: 45.00 },
])

const originalNotes = 'O cliente solicitou um tema especial e deseja menu com opção vegetariana.'

// Builder state
const rows = ref([])
const serviceFee = ref(10)
const discount = ref(0)
const discountStr = ref('0,00')
const clientNotes = ref('')

// Search dropdown
const search = ref('')
const showDropdown = ref(false)
const filteredCatalog = computed(() => {
  const q = search.value.trim().toLowerCase()
  const arr = !q ? catalog.value : catalog.value.filter(c => c.name.toLowerCase().includes(q))
  return arr.slice(0, 10)
})

function addItem(item) {
  rows.value.push({
    uid: Math.random().toString(36).slice(2),
    catalogId: item.id,
    qty: 1,
    cost: item.cost,
    price: item.price,
    priceStr: fmt(item.price)
  })
  search.value = ''
  showDropdown.value = false
}

function updateFromCatalog(row) {
  const it = catalog.value.find(x => x.id === row.catalogId)
  if (!it) return
  row.cost = it.cost
  row.price = it.price
  row.priceStr = fmt(it.price)
}

function syncPrice(row) {
  // Parse BRL-like string
  const sanitized = row.priceStr.replace(/\./g, '').replace(',', '.')
  const n = parseFloat(sanitized)
  row.price = isNaN(n) ? 0 : n
}

function removeRow(index) {
  rows.value.splice(index, 1)
}

function syncDiscount() {
  const sanitized = discountStr.value.replace(/\./g, '').replace(',', '.')
  const n = parseFloat(sanitized)
  discount.value = isNaN(n) ? 0 : n
}

// Totals
const subtotal = computed(() => rows.value.reduce((s, r) => s + (r.qty * r.price), 0))
const totalCost = computed(() => rows.value.reduce((s, r) => s + (r.qty * r.cost), 0))
const serviceFeeValue = computed(() => subtotal.value * (serviceFee.value / 100))
const totalBeforeDiscount = computed(() => subtotal.value + serviceFeeValue.value)
const totalFinal = computed(() => Math.max(0, totalBeforeDiscount.value - discount.value))
const grossProfit = computed(() => Math.max(0, totalFinal.value - totalCost.value))
const margin = computed(() => totalFinal.value > 0 ? (grossProfit.value / totalFinal.value) * 100 : 0)

// Actions
function saveAndSend() {
  alert('Proposta salva e enviada ao cliente. Status alterado para Aguardando Cliente.')
  router.push('/admin/orcamentos')
}
function saveDraft() {
  alert('Proposta salva como rascunho.')
}

// helpers
function fmt(n) { return Number(n || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
</script>
