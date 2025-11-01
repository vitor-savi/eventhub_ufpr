<template>
  <div id="app" class="min-h-screen bg-white">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Ensure we start at home if no route
  if (router.currentRoute.value.path === '/') {
    router.push('/')
  }
})
</script>

<style>
#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
