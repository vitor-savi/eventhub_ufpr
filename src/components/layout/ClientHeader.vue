<template>
  <header class="bg-[#1B1F38] text-white py-4">
    <div class="container mx-auto flex items-center justify-between px-4">
      <router-link to="/cliente/dashboard" class="text-xl font-bold">EVENTHUB</router-link>
      <nav class="flex items-center space-x-6">
        <router-link to="/cliente/meus-eventos" class="hover:text-primary">Meus Eventos</router-link>
        <router-link to="/cliente/orcamentos" class="hover:text-primary">Orçamentos</router-link>
        <router-link to="/cliente/perfil" class="hover:text-primary">Perfil</router-link>
        <div class="flex items-center space-x-2">
          <span>Olá, {{ userName }}</span>
          <button @click="logout" class="hover:text-primary">Sair</button>
        </div>
      </nav>
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
