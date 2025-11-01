<template>
  <div class="border rounded p-4 shadow-sm">
    <h3 class="font-bold">Orçamento #{{ budget.id }}</h3>
    <p>Cliente: {{ budget.client }}</p>
    <p>Total: R$ {{ budget.total }}</p>
    <p>Status: <strong>{{ budget.status }}</strong></p>
  </div>
</template>
<script setup>
const props = defineProps({ budget: Object })
</script>
