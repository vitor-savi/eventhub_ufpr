<template>
  <PublicLayout headerBg="" headerBgGradient>
    <div class="min-h-screen bg-white py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold text-primary text-center mb-10">Sobre Nós</h1>
        <div class="max-w-3xl mx-auto text-center mb-12">
          <p class="text-lg text-gray-700 mb-6">
            Nossa história começou no início dos anos 90, quando João Luiz e Maria decidiram transformar sua paixão por celebrar momentos especiais em um negócio familiar. Desde então, nossa empresa tem se dedicado a realizar eventos inesquecíveis, combinando experiência, carinho e um atendimento personalizado que acompanha cada detalhe.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            O que começou com pequenos eventos mensais cresceu ao longo dos anos graças à confiança e satisfação de nossos clientes. Hoje, contamos com uma equipe completa e uma rede de profissionais especializados — garçons, cozinheiros, músicos, bartenders, monitores e muito mais — prontos para transformar qualquer ocasião em uma experiência única.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Atendemos os mais diversos tipos de eventos: casamentos, festas de 15 anos, aniversários, confraternizações empresariais e celebrações em geral. Oferecemos não apenas os serviços, mas também toda a infraestrutura necessária — refeições, bebidas, coquetéis, materiais e equipamentos — para que você tenha tudo o que precisa em um só lugar.
          </p>
          <p class="text-lg text-gray-700 mb-6">
            Nosso compromisso é com a excelência, a organização e a realização de sonhos. Acreditamos que cada evento é único e merece atenção especial, do planejamento à execução.
          </p>
          <p class="text-lg text-gray-700 font-semibold text-primary">
            Mais do que festas, criamos memórias que ficam para sempre.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-16">
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">João Luiz</h2>
            <p class="text-gray-600">Diretor de Atendimento e Operações</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">Maria</h2>
            <p class="text-gray-600">Diretora Financeira e Administrativa</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">Paulo</h2>
            <p class="text-gray-600">Coordenador de Logística e Equipes</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/women/20.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">Regina</h2>
            <p class="text-gray-600">Supervisora de Atendimento e Experiência do Cliente</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-8 shadow text-center">
            <img src="https://randomuser.me/api/portraits/women/50.jpg" alt="Equipe" class="w-20 h-20 rounded-full mx-auto mb-4">
            <h2 class="text-lg font-bold text-primary mb-2">Carla</h2>
            <p class="text-gray-600">Coordenadora de Produção e Montagem de Eventos</p>
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
