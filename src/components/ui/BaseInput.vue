<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :class="'border rounded px-3 py-2 w-full ' + (className || '')" />
</template>

<script setup>
const props = defineProps({ modelValue: [String, Number], placeholder: { type: String, default: '' }, className: { type: String, default: '' } })
</script>
