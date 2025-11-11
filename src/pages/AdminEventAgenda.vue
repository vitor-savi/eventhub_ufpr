<template>
  <div class="min-h-screen">
    <div class="mb-6">
      <h1 class="text-2xl font-extrabold text-gray-800">Agenda de Eventos e Alocações</h1>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow border border-gray-200 p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Mês/Ano</label>
          <select v-model="selectedMonth" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Visualização</label>
          <select v-model="viewType" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="month">Mês</option>
            <option value="week">Semana</option>
            <option value="day">Dia</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Tipo de Evento</label>
          <select v-model="filterEventType" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
            <option value="">Todos</option>
            <option value="Casamento">Casamento</option>
            <option value="Aniversário">Aniversário</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Formatura">Formatura</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="goToToday" class="w-full px-4 py-2 rounded bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200">
            Hoje
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar -->
    <div class="bg-white rounded-xl shadow border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <button @click="prevMonth" class="px-3 py-1 rounded border hover:bg-gray-50">
          <i class="pi pi-chevron-left"></i>
        </button>
        <h2 class="text-xl font-bold text-gray-800">{{ currentMonthLabel }}</h2>
        <button @click="nextMonth" class="px-3 py-1 rounded border hover:bg-gray-50">
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>

      <!-- Month view -->
      <div v-if="viewType === 'month'" class="grid grid-cols-7 gap-2">
        <!-- Weekday headers -->
        <div v-for="day in weekDays" :key="day" class="text-center text-xs font-semibold text-gray-600 py-2">
          {{ day }}
        </div>
        <!-- Calendar days -->
        <div 
          v-for="(day, idx) in calendarDays" 
          :key="idx"
          class="min-h-24 border rounded p-2 relative"
          :class="day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'"
        >
          <div class="text-sm font-semibold mb-1" :class="day.isToday ? 'text-purple-600' : ''">
            {{ day.dayNumber }}
          </div>
          <div class="space-y-1">
            <div 
              v-for="event in day.events" 
              :key="event.id"
              @click="openEventDetails(event)"
              class="text-xs p-1 rounded cursor-pointer hover:opacity-80 truncate"
              :style="{ backgroundColor: getEventColor(event.type), color: 'white' }"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>

      <!-- Week view -->
      <div v-if="viewType === 'week'" class="space-y-2">
        <div v-for="day in weekDays" :key="day" class="border rounded p-3">
          <div class="font-semibold text-sm text-gray-700 mb-2">{{ day }}</div>
          <div class="space-y-1">
            <div 
              v-for="event in getEventsForWeekDay(day)" 
              :key="event.id"
              @click="openEventDetails(event)"
              class="text-sm p-2 rounded cursor-pointer hover:opacity-80"
              :style="{ backgroundColor: getEventColor(event.type), color: 'white' }"
            >
              {{ event.title }} - {{ event.client }}
            </div>
          </div>
        </div>
      </div>

      <!-- Day view -->
      <div v-if="viewType === 'day'" class="space-y-3">
        <div v-for="event in eventsForSelectedDay" :key="event.id" class="border rounded p-4 hover:shadow cursor-pointer" @click="openEventDetails(event)">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-bold text-gray-800">{{ event.title }}</h3>
              <p class="text-sm text-gray-600 mt-1">Cliente: {{ event.client }}</p>
              <p class="text-sm text-gray-600">Tipo: {{ event.type }}</p>
            </div>
            <span class="px-3 py-1 rounded text-xs font-semibold" :style="{ backgroundColor: getEventColor(event.type), color: 'white' }">
              {{ event.type }}
            </span>
          </div>
        </div>
        <div v-if="eventsForSelectedDay.length === 0" class="text-center py-12 text-gray-500">
          Nenhum evento agendado para este dia.
        </div>
      </div>
    </div>

    <!-- Event Details Modal -->
    <div v-if="showModal" @click="closeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <div class="flex items-start justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800">Detalhes do Evento</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <div v-if="selectedEvent" class="space-y-3">
          <div>
            <span class="text-sm font-semibold text-gray-700">Nome do Evento:</span>
            <p class="text-gray-800">{{ selectedEvent.title }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-700">Cliente:</span>
            <p class="text-gray-800">{{ selectedEvent.client }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-700">Data:</span>
            <p class="text-gray-800">{{ selectedEvent.date }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-700">Tipo:</span>
            <p class="text-gray-800">{{ selectedEvent.type }}</p>
          </div>
          <div>
            <span class="text-sm font-semibold text-gray-700">Local:</span>
            <p class="text-gray-800">{{ selectedEvent.local || 'A definir' }}</p>
          </div>
          <div class="pt-4 border-t flex gap-3">
            <button @click="manageAllocations" class="flex-1 px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-purple-400 text-white font-bold hover:shadow">
              Gerenciar Alocações
            </button>
            <button @click="closeModal" class="flex-1 px-4 py-2 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50">
              Fechar
            </button>
          </div>
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

// State
const selectedMonth = ref(10) // November (0-indexed)
const viewType = ref('month')
const filterEventType = ref('')
const showModal = ref(false)
const selectedEvent = ref(null)

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const months = [
  { value: 0, label: 'Janeiro 2025' },
  { value: 1, label: 'Fevereiro 2025' },
  { value: 2, label: 'Março 2025' },
  { value: 3, label: 'Abril 2025' },
  { value: 4, label: 'Maio 2025' },
  { value: 5, label: 'Junho 2025' },
  { value: 6, label: 'Julho 2025' },
  { value: 7, label: 'Agosto 2025' },
  { value: 8, label: 'Setembro 2025' },
  { value: 9, label: 'Outubro 2025' },
  { value: 10, label: 'Novembro 2025' },
  { value: 11, label: 'Dezembro 2025' }
]

// Filter approved events
const approvedEvents = computed(() => {
  return budgetsData.filter(b => {
    const statusMatch = ['confirmado', 'aprovado'].some(s => String(b.status || '').toLowerCase().includes(s))
    const typeMatch = !filterEventType.value || b.type === filterEventType.value
    return statusMatch && typeMatch
  }).map(b => ({
    ...b,
    local: b.local || 'Local a definir'
  }))
})

const currentMonthLabel = computed(() => months.find(m => m.value === selectedMonth.value)?.label || '')

// Calendar days for month view
const calendarDays = computed(() => {
  const year = 2025
  const month = selectedMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDay = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const days = []
  const today = new Date()
  
  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      dayNumber: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${String(i).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/2025`
    const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year
    days.push({
      dayNumber: i,
      isCurrentMonth: true,
      isToday,
      events: approvedEvents.value.filter(e => e.date === dateStr)
    })
  }
  
  // Next month days to fill grid
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({
      dayNumber: i,
      isCurrentMonth: false,
      isToday: false,
      events: []
    })
  }
  
  return days
})

const eventsForSelectedDay = computed(() => {
  // For day view, show events from first day of current month
  const dateStr = `01/${String(selectedMonth.value + 1).padStart(2, '0')}/2025`
  return approvedEvents.value
})

function getEventColor(type) {
  const colors = {
    'Casamento': '#8B5CF6',
    'Aniversário': '#F59E0B',
    'Corporativo': '#3B82F6',
    'Formatura': '#10B981',
    'Aniversario': '#F59E0B'
  }
  return colors[type] || '#6B7280'
}

function getEventsForWeekDay(day) {
  // Simple mock for week view
  return approvedEvents.value.slice(0, 2)
}

function openEventDetails(event) {
  selectedEvent.value = event
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedEvent.value = null
}

function manageAllocations() {
  if (selectedEvent.value) {
    router.push(`/admin/profissionais/${selectedEvent.value.id}`)
  }
}

function prevMonth() {
  if (selectedMonth.value > 0) selectedMonth.value--
}

function nextMonth() {
  if (selectedMonth.value < 11) selectedMonth.value++
}

function goToToday() {
  selectedMonth.value = new Date().getMonth()
}
</script>
