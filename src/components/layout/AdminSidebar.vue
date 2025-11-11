<template>
  <aside :class="['transition-all duration-200 ease-in-out', collapsed ? 'w-16' : 'w-64']" class="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-800 to-purple-700 text-white py-4 px-4 overflow-auto">
    <!-- removed the empty title block and reduced vertical padding to tighten spacing under the header -->

    <nav class="flex flex-col gap-3">
      <div>
        <div class="text-xs font-semibold text-purple-200 mb-1" v-if="!collapsed">Gestão de Orçamentos</div>
        <router-link to="/admin/orcamentos" class="block py-2 px-2 rounded hover:bg-purple-700">Todos Orçamentos</router-link>
      </div>

      <div class="mt-4">
        <div class="text-xs font-semibold text-purple-200 mb-2" v-if="!collapsed">Operações / Agenda</div>
        <router-link to="/admin/agenda" class="block py-2 px-2 rounded hover:bg-purple-700">Agenda de Eventos</router-link>
        <router-link to="/admin/profissionais" class="block py-2 px-2 rounded hover:bg-purple-700">Gestão de Profissionais</router-link>
      </div>

      <div class="mt-4">
        <div class="text-xs font-semibold text-purple-200 mb-2" v-if="!collapsed">Financeiro</div>
        <router-link to="/admin/relatorios-financeiros" class="block py-2 px-2 rounded hover:bg-purple-700">Relatórios Financeiros</router-link>
        <router-link to="/admin/cadastrar-custos" class="block py-2 px-2 rounded hover:bg-purple-700">Cadastrar Custos</router-link>
        <router-link to="/admin/gerenciar-precos" class="block py-2 px-2 rounded hover:bg-purple-700">Gerenciar Preços</router-link>
        <router-link to="/admin/importar-historico" class="block py-2 px-2 rounded hover:bg-purple-700">Importar Histórico</router-link>
      </div>

      <div class="mt-4">
        <div class="text-xs font-semibold text-purple-200 mb-2" v-if="!collapsed">Cadastros</div>
        <router-link to="/admin/clientes" class="block py-2 px-2 rounded hover:bg-purple-700">Clientes</router-link>
        <router-link to="/admin/tipos-evento" class="block py-2 px-2 rounded hover:bg-purple-700">Tipos de Evento</router-link>
        <router-link to="/admin/categorias-servico" class="block py-2 px-2 rounded hover:bg-purple-700">Categorias de Serviço</router-link>
      </div>

      <div class="mt-4">
        <div class="text-xs font-semibold text-purple-200 mb-2" v-if="!collapsed">Perfil</div>
        <router-link to="/admin/perfil" class="block py-2 px-2 rounded hover:bg-purple-700">Meu Perfil</router-link>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { inject } from 'vue'
const collapsed = inject('adminSidebarCollapsed')
</script>
