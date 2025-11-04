<template>
  <div class="min-h-screen bg-gray-50">
    <AdminHeader />
    <AdminSidebar />
    <main :class="['p-6 pt-16 transition-all duration-200', collapsed ? 'ml-16' : 'ml-64']">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import AdminHeader from '../components/layout/AdminHeader.vue'
import AdminSidebar from '../components/layout/AdminSidebar.vue'
import { ref, provide } from 'vue'

const collapsed = ref(false)
provide('adminSidebarCollapsed', collapsed)
provide('toggleAdminSidebar', () => { collapsed.value = !collapsed.value })
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
