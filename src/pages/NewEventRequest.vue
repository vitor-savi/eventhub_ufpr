<template>
  <div class="container mx-auto px-4 py-16">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
      <h1 class="text-3xl font-bold text-primary mb-6 md:mb-0">Solicitar Novo Orçamento</h1>
      <router-link to="/cliente/dashboard" class="px-5 py-2 bg-blue-50 text-blue-700 rounded font-medium border border-blue-200 hover:bg-blue-100 transition-colors">Voltar para Meus Eventos</router-link>
    </div>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Card 1: Dados do Evento -->
      <div class="bg-white rounded-xl shadow border border-blue-100 p-8 flex flex-col gap-6">
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Nome/Apelido para Evento</label>
          <input 
            type="text" 
            v-model="form.name" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Ex: Casamento Ana & Beto" 
            required 
          />
        </div>
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Tipo de Evento</label>
          <select 
            v-model="form.type" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" 
            required
          >
            <option value="">Selecione...</option>
            <option v-for="service in services" :key="service.id" :value="service.name">
              {{ service.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Data Prevista do Evento</label>
          <input 
            type="date" 
            v-model="form.date" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" 
            required 
          />
        </div>
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Número Estimado de Convidados</label>
          <input 
            type="number" 
            v-model="form.guestCount" 
            min="1" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" 
            required 
          />
        </div>
      </div>
      <!-- Card 2: Serviços Desejados -->
      <div class="bg-white rounded-xl shadow border border-blue-100 p-8 flex flex-col gap-6">
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Serviços Desejados</label>
          <div class="space-y-3">
            <div v-for="service in availableServices" :key="service.id">
              <label class="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  v-model="form.selectedServices" 
                  :value="service.name" 
                /> 
                {{ service.name }}
              </label>
              <input 
                v-if="form.selectedServices.includes(service.name)" 
                type="text" 
                v-model="form.serviceDetails[service.name]" 
                class="mt-2 w-full px-3 py-1 border rounded text-sm" 
                :placeholder="service.detailsPlaceholder" 
              />
            </div>
          </div>
        </div>
        <div>
          <label class="block font-semibold text-gray-700 mb-2">Observações e Detalhes Adicionais</label>
          <textarea 
            v-model="form.notes" 
            rows="4" 
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Descreva aqui qualquer detalhe adicional..."
          ></textarea>
        </div>
        <button 
          type="submit" 
          class="w-full py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors text-lg"
        >
          Enviar Solicitação de Orçamento
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useServicesStore } from '../store/services'

const router = useRouter()
const servicesStore = useServicesStore()
const services = servicesStore.services

const availableServices = [
  { id: 'food', name: 'Alimentação', detailsPlaceholder: 'Detalhes: Ex: Menu vegano, alergias' },
  { id: 'drinks', name: 'Bebidas', detailsPlaceholder: 'Detalhes: Ex: Cerveja Artesanal, Vinhos' },
  { id: 'decor', name: 'Materiais e Decoração', detailsPlaceholder: 'Detalhes: Ex: Mesas redondas, decoração rústica' },
  { id: 'staff', name: 'Profissionais', detailsPlaceholder: 'Detalhes: Ex: Banda de Jazz, 2 garçons extra' },
  { id: 'other', name: 'Outros Serviços', detailsPlaceholder: 'Especifique outros serviços desejados' }
]

const form = reactive({
  name: '',
  type: '',
  date: '',
  guestCount: '',
  selectedServices: [],
  serviceDetails: {},
  notes: ''
})

function handleSubmit() {
  // Mock implementation
  alert('Solicitação enviada com sucesso!')
  router.push('/cliente/dashboard')
}
</script>