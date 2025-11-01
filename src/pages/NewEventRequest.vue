<template>
  <ClientLayout>
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <h1 class="text-2xl font-bold mb-8">Solicitar Novo Orçamento</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Event Name -->
        <div>
          <label class="block text-sm font-medium mb-2">Nome/Apelido para o Evento</label>
          <input 
            v-model="form.name"
            type="text"
            placeholder="Ex: Casamento Ana & Rafa"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Event Type -->
        <div>
          <label class="block text-sm font-medium mb-2">Tipo de Evento</label>
          <select 
            v-model="form.type"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Selecione o tipo de evento</option>
            <option v-for="service in services" :key="service.id" :value="service.name">
              {{ service.name }}
            </option>
          </select>
        </div>

        <!-- Event Date -->
        <div>
          <label class="block text-sm font-medium mb-2">Data Prevista do Evento</label>
          <input 
            v-model="form.date"
            type="date"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Guest Count -->
        <div>
          <label class="block text-sm font-medium mb-2">Número Estimado de Convidados</label>
          <input 
            v-model="form.guestCount"
            type="number"
            placeholder="Ex: 100"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <!-- Services -->
        <div class="space-y-4">
          <h3 class="font-medium">Serviços Desejados</h3>
          
          <div class="space-y-4">
            <div v-for="service in availableServices" :key="service.id" class="space-y-2">
              <div class="flex items-center">
                <input 
                  :id="service.id"
                  v-model="form.selectedServices"
                  :value="service.name"
                  type="checkbox"
                  class="rounded text-primary"
                />
                <label :for="service.id" class="ml-2">{{ service.name }}</label>
              </div>
              <input 
                v-if="form.selectedServices.includes(service.name)"
                v-model="form.serviceDetails[service.name]"
                type="text"
                :placeholder="service.detailsPlaceholder"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <!-- Additional Notes -->
        <div>
          <label class="block text-sm font-medium mb-2">Observações e Detalhes Adicionais</label>
          <textarea 
            v-model="form.notes"
            rows="4"
            placeholder="Descreva o que não coube nos campos acima..."
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          class="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enviar Solicitação de Orçamento
        </button>
      </form>
    </div>
  </ClientLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ClientLayout from '../layouts/ClientLayout.vue'
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