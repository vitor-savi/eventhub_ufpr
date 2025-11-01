<template>
  <header class="fixed w-full top-0 z-50 py-4">
    <div class="container mx-auto flex items-center justify-between px-4">
      <router-link to="/" class="text-2xl font-bold text-white">EVENTHUB</router-link>
      <nav class="flex items-center space-x-6">
        <router-link to="/" class="text-white/90 hover:text-white transition-colors">Home</router-link>
        <router-link to="/servicos" class="text-white/90 hover:text-white transition-colors">Serviços</router-link>
        <router-link to="/sobre-nos" class="text-white/90 hover:text-white transition-colors">Sobre Nós</router-link>
        <router-link to="/contato" class="text-white/90 hover:text-white transition-colors">Contato</router-link>
        <div class="flex items-center space-x-3">
          <router-link to="/login" class="px-4 py-2 text-white hover:text-white/90 transition-colors">Login</router-link>
          <router-link to="/cadastro" class="px-4 py-2 bg-white text-primary rounded-full hover:bg-white/90 transition-colors">Cadastre-se</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>
