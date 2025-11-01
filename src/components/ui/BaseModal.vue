<template>
  <div v-if="visible" class="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div class="bg-white p-4 rounded shadow-md w-11/12 max-w-xl">
      <slot />
      <div class="mt-4 text-right">
        <button class="px-3 py-1 border rounded" @click="$emit('close')">Fechar</button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ visible: { type: Boolean, default: false } })
</script>
