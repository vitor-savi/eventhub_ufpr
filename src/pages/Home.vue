<template>
  <PublicLayout>
    <!-- Hero Section with Background Image -->
    <div class="relative min-h-[60vh] bg-gradient-to-r from-primary/90 to-primary/80 overflow-hidden flex items-center justify-center">
      <!-- Decorative circles -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-2xl mx-auto text-center text-white">
          <h1 class="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
            Realize seu Evento dos Sonhos com a EVENTHUB
          </h1>
          <p class="text-xl mb-8 text-white/90 animate-fade-in-delay">
            Transformamos momentos especiais em memórias inesquecíveis
          </p>
          <router-link 
            to="/login" 
            class="inline-flex items-center px-8 py-4 bg-white text-primary rounded-full 
                   text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105
                   shadow-lg hover:shadow-xl animate-fade-in-delay-2"
          >
            Solicite um Orçamento Agora!
            <i class="pi pi-arrow-right ml-2"></i>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Services Section with Enhanced Design -->
    <div class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-4xl font-bold mb-6 text-gray-900">Nossos Serviços</h2>
          <p class="text-gray-600 text-lg">
            Oferecemos uma gama completa de serviços para tornar seu evento único e memorável
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard v-for="service in services" :key="service.id" :service="service" />
        </div>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="p-6">
            <div class="text-4xl font-bold text-primary mb-2">4000+</div>
            <div class="text-gray-600">Eventos Realizados</div>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-primary mb-2">98%</div>
            <div class="text-gray-600">Clientes Satisfeitos</div>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-primary mb-2">100+</div>
            <div class="text-gray-600">Parceiros</div>
          </div>
          <div class="p-6">
            <div class="text-4xl font-bold text-primary mb-2">35</div>
            <div class="text-gray-600">Anos de Experiência</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-12">O que Nossos Clientes Dizem</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 3" :key="i" class="bg-white p-8 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <div class="text-primary">
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
                <i class="pi pi-star-fill"></i>
              </div>
            </div>
            <p class="text-gray-600 mb-6">"A EVENTHUB superou todas as nossas expectativas. Nosso casamento foi exatamente como sonhamos!"</p>
            <div class="font-semibold">Maria & João</div>
            <div class="text-sm text-gray-500">Casamento - Dezembro 2024</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Footer -->
    <footer class="bg-[#1B1F38] text-white pt-20 pb-10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 class="text-2xl font-bold mb-6">EVENTHUB</h3>
            <p class="text-gray-300 mb-4">Transformando sonhos em realidade, um evento por vez.</p>
            <div class="space-y-2">
              <p class="flex items-center text-gray-300">
                <i class="pi pi-envelope mr-2"></i>
                contato@eventhub.com
              </p>
              <p class="flex items-center text-gray-300">
                <i class="pi pi-phone mr-2"></i>
                (XX) XXXX-XXXX
              </p>
            </div>
          </div>
          <div>
            <h4 class="text-lg font-bold mb-6">Links Rápidos</h4>
            <ul class="space-y-3">
              <li><router-link to="/servicos" class="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Serviços</router-link></li>
              <li><router-link to="/sobre-nos" class="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Sobre Nós</router-link></li>
              <li><router-link to="/contato" class="text-gray-300 hover:text-white hover:pl-2 transition-all duration-300">Contato</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-bold mb-6">Nossos Serviços</h4>
            <ul class="space-y-3">
              <li class="text-gray-300">Casamentos</li>
              <li class="text-gray-300">Formaturas</li>
              <li class="text-gray-300">Eventos Corporativos</li>
              <li class="text-gray-300">Festas Temáticas</li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-bold mb-6">Redes Sociais</h4>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i class="pi pi-facebook"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i class="pi pi-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i class="pi pi-twitter"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <i class="pi pi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="mt-16 pt-8 border-t border-gray-700/50 text-center text-gray-400">
          <p>© {{ new Date().getFullYear() }} EVENTHUB. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </PublicLayout>
</template>

<script setup>
import { ref } from 'vue'
import PublicLayout from '../layouts/PublicLayout.vue'
import ServiceCard from '../components/cards/ServiceCard.vue'
import { useServicesStore } from '../store/services'

const servicesStore = useServicesStore()
const services = servicesStore.services
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 0.8s ease-out 0.3s both;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 0.8s ease-out 0.6s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>