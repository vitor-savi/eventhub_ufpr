<template>
  <PublicLayout headerBg="" headerBgGradient>
    <div class="min-h-screen bg-gray-50 py-20 pt-32">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-primary text-center mb-10">Nossos Serviços</h1>
        <p class="text-center text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          Oferecemos soluções completas para todos os tipos de eventos. Confira nossos principais serviços abaixo:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.id" class="bg-white rounded-xl p-8 shadow-lg text-center">
            <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i :class="service.icon" class="text-4xl text-primary"></i>
            </div>
            <h2 class="text-xl font-bold mb-2">{{ service.name }}</h2>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<script setup>
import PublicLayout from '../layouts/PublicLayout.vue'

const services = [
  { id: 1, name: 'Casamentos', description: 'Planejamento completo para o seu dia especial.', icon: 'pi pi-heart' },
  { id: 2, name: 'Eventos Corporativos', description: 'Conferências, workshops e lançamentos de produtos.', icon: 'pi pi-briefcase' },
  { id: 3, name: 'Festas de Aniversário', description: 'Celebre com estilo e sem preocupações.', icon: 'pi pi-users' },
  { id: 4, name: 'Formaturas', description: 'Organização impecável para sua celebração.', icon: 'pi pi-graduation-cap' },
  { id: 5, name: 'Shows e Festivais', description: 'Produção de eventos musicais de grande porte.', icon: 'pi pi-music' },
  { id: 6, name: 'Eventos Sociais', description: 'Qualquer celebração que você imaginar.', icon: 'pi pi-star' }
]
</script>
