<template>
  <div class="border rounded p-4 shadow-sm">
    <h3 class="font-bold">{{ event.title }}</h3>
    <p class="text-sm text-gray-600">{{ event.date }}</p>
    <p class="mt-2">Status: <span class="font-semibold">{{ event.status }}</span></p>
  </div>
</template>
<script setup>
const props = defineProps({ event: Object })
</script>
