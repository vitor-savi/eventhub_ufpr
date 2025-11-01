<template>
  <PublicLayout headerBg="primary">
    <div class="min-h-screen bg-white py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-primary text-center mb-10">Sobre Nós</h1>
        <div class="max-w-3xl mx-auto text-center mb-12">
          <p class="text-lg text-gray-700 mb-6">
            A EVENTHUB nasceu do sonho de transformar momentos especiais em experiências inesquecíveis. Com mais de 5 anos de atuação, somos referência em organização de eventos sociais, corporativos e culturais.
          </p>
          <p class="text-lg text-gray-700">
            Nossa equipe é formada por profissionais apaixonados, criativos e comprometidos com a excelência. Trabalhamos para que cada evento seja único, personalizado e memorável.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">Ana Souza</h2>
            <p class="text-gray-600">Diretora de Eventos</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">Carlos Lima</h2>
            <p class="text-gray-600">Coordenador de Produção</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">Juliana Alves</h2>
            <p class="text-gray-600">Especialista em Atendimento</p>
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
/* Adicione seus estilos personalizados aqui, se necessário */
</style>
