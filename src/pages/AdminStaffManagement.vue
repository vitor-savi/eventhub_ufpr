<template>
  <div class="min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800">Gestão de Profissionais</h1>
      <p class="text-gray-600 mt-2">Selecione um evento para gerenciar a alocação de profissionais</p>
    </div>

    <!-- Events List -->
    <div class="bg-white rounded-xl shadow border border-gray-200">
      <div class="p-4 border-b">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar evento ou cliente..."
          class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th class="py-3 px-4 text-left">Evento</th>
              <th class="py-3 px-4 text-left">Cliente</th>
              <th class="py-3 px-4 text-left">Data</th>
              <th class="py-3 px-4 text-left">Status</th>
              <th class="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in filteredEvents" :key="event.id" class="border-t text-sm hover:bg-gray-50">
              <td class="py-3 px-4 font-medium">{{ event.title }}</td>
              <td class="py-3 px-4">{{ event.client }}</td>
              <td class="py-3 px-4">{{ event.date }}</td>
              <td class="py-3 px-4">
                <span :class="['px-2 py-1 rounded text-xs font-semibold', getStatusClass(event.status)]">
                  {{ getStatusLabel(event.status) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex justify-end gap-2">
                  <button 
                    @click="allocateStaff(event.id)"
                    class="px-3 py-1 rounded bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700"
                  >
                    Alocar Profissionais
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredEvents.length === 0">
              <td colspan="5" class="py-6 px-4 text-center text-gray-500">
                Nenhum evento encontrado.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import budgetsData from '../data/budgets'

const router = useRouter()
const searchQuery = ref('')

// Filter only confirmed/approved events (where staff allocation makes sense)
const events = computed(() => {
  return budgetsData.filter(b => 
    ['confirmado', 'aprovado', 'confirmados', 'aprovados'].some(s => 
      String(b.status || '').toLowerCase().includes(s)
    )
  )
})

const filteredEvents = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return events.value
  return events.value.filter(e => 
    (e.title || '').toLowerCase().includes(q) ||
    (e.client || '').toLowerCase().includes(q)
  )
})

function getStatusLabel(status) {
  const s = String(status || '').toLowerCase()
  if (s.includes('confirmado') || s.includes('aprovado')) return 'Confirmado'
  return status
}

function getStatusClass(status) {
  const s = String(status || '').toLowerCase()
  if (s.includes('confirmado') || s.includes('aprovado')) return 'bg-green-100 text-green-800'
  return 'bg-gray-100 text-gray-800'
}

function allocateStaff(eventId) {
  router.push(`/admin/profissionais/${eventId}`)
}
</script>
