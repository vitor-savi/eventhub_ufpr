<template>
  <div class="min-h-screen flex flex-col">
    <PublicHeader />
    <main class="flex-grow"><slot /></main>
  </div>
</template>

<script setup>
import PublicHeader from '../components/layout/PublicHeader.vue'
</script>
