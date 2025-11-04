<template>
  <header class="fixed left-0 w-full top-0 z-50 h-16 bg-gradient-to-r from-purple-500 to-purple-400">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-full px-8">
      <div class="flex items-center gap-4">
        <button @click="toggleSidebar" class="text-white/90 px-3 py-2 rounded hover:bg-white/10 md:hidden">☰</button>
        <button @click="toggleSidebar" class="text-white/90 px-3 py-2 rounded hover:bg-white/10 hidden md:inline-block">☰</button>
        <router-link to="/admin/dashboard" class="text-2xl font-extrabold text-white tracking-wide">EVENTHUB</router-link>
        <router-link to="/admin/eventos" class="text-white font-medium hover:text-white/80 transition-colors">Eventos</router-link>
        <router-link to="/admin/orcamentos" class="text-white font-medium hover:text-white/80 transition-colors">Orçamentos</router-link>
        <router-link to="/admin/clientes" class="text-white font-medium hover:text-white/80 transition-colors">Clientes</router-link>
        <router-link to="/admin/relatorios" class="text-white font-medium hover:text-white/80 transition-colors">Relatórios</router-link>
      </div>
        <div class="flex items-center gap-4">
          <span class="text-white/90 font-medium">Olá, {{ userName }}</span>
          <button @click="logout" class="px-4 py-2 bg-white text-purple-600 rounded-full font-bold hover:bg-white/90 transition-colors">Sair</button>
        </div>
    </div>
  </header>
</template>

<script setup>
 import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()
const router = useRouter()
const userName = computed(() => auth.user?.nome || 'Admin')

function logout() {
  auth.logout()
  router.push('/')
}
 const toggle = inject('toggleAdminSidebar')
 function toggleSidebar() {
   if (toggle) toggle()
 }
</script>
