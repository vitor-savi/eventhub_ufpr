<template>
  <div class="min-h-screen flex flex-col">
    <PublicHeader :bg="headerBg" />
    <main class="flex-grow"><slot /></main>
  </div>
</template>

<script setup>
import PublicHeader from '../components/layout/PublicHeader.vue'
const props = defineProps({
  headerBg: {
    type: String,
    default: ''
  }
})
</script>
