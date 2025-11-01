<template>
  <div class="min-h-screen flex flex-col">
    <PublicHeader :bg="headerBg" :bgGradient="headerBgGradient" />
    <main class="flex-grow"><slot /></main>
  </div>
</template>

<script setup>
import PublicHeader from '../components/layout/PublicHeader.vue'
const props = defineProps({
  headerBg: {
    type: String,
    default: ''
  },
  headerBgGradient: {
    type: Boolean,
    default: false
  }
})
</script>
