<template>
  <header class="fixed w-full top-0 z-50 py-4 bg-gradient-to-r from-primary/90 to-primary/80">
    <div class="container mx-auto flex items-center justify-between px-4">
      <div class="flex items-center space-x-8">
        <router-link to="/cliente/dashboard" class="text-2xl font-bold text-white">EVENTHUB</router-link>
        <router-link to="/cliente/dashboard" class="text-white font-medium hover:text-white/80 transition-colors">Meus Eventos</router-link>
        <router-link to="/cliente/orcamentos" class="text-white font-medium hover:text-white/80 transition-colors">Orçamentos</router-link>
        <router-link to="/cliente/perfil" class="text-white font-medium hover:text-white/80 transition-colors">Perfil</router-link>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-white/90 font-medium">Olá, {{ userName }}</span>
        <button @click="logout" class="px-4 py-2 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors">Sair</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()
const router = useRouter()
const userName = computed(() => auth.user?.nome || 'Cliente')

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
