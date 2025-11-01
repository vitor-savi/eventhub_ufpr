<template>
  <header class="fixed w-full top-0 z-50 bg-transparent">
    <div class="container mx-auto px-4">
      <nav class="flex justify-between items-center py-4">
        <!-- Logo -->
        <RouterLink to="/" class="text-2xl font-bold text-white">
          EVENTHUB
        </RouterLink>

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink 
            v-for="item in menuItems" 
            :key="item.path" 
            :to="item.path"
            class="text-white hover:text-white/80 transition-colors"
          >
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <RouterLink 
            to="/login"
            class="px-4 py-2 text-white hover:text-white/80 transition-colors"
          >
            Login
          </RouterLink>
          <RouterLink 
            to="/register"
            class="px-4 py-2 bg-white text-primary rounded-full hover:bg-white/90 transition-colors"
          >
            Cadastre-se
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
const menuItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Sobre Nós', path: '/about' },
  { name: 'Contato', path: '/contact' },
]
</script>