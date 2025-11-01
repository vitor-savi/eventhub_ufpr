<template>
  <PublicLayout headerBg="" headerBgGradient>
    <div class="min-h-screen bg-gray-50 py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-primary text-center mb-10">Contato</h1>
        <div class="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
          <form class="space-y-6">
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Nome</label>
              <input type="text" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Seu nome" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Seu email" />
            </div>
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Mensagem</label>
              <textarea class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary" rows="4" placeholder="Digite sua mensagem"></textarea>
            </div>
            <button type="submit" class="w-full py-3 bg-primary text-white rounded font-bold hover:bg-primary/90 transition-colors">Enviar Mensagem</button>
          </form>
          <div class="mt-10 text-center text-gray-600">
            <p><i class="pi pi-envelope mr-2"></i> contato@eventhub.com</p>
            <p><i class="pi pi-phone mr-2"></i> (XX) XXXX-XXXX</p>
          </div>
        </div>
      </div>
    </div>
  </PublicLayout>
</template>

<script setup>
import PublicLayout from '../layouts/PublicLayout.vue'
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
