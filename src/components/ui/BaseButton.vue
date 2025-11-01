<template>
  <button :class="classes" @click="$emit('click')">
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ label: { type: String, default: '' }, variant: { type: String, default: 'primary' }, class: { type: String, default: '' } })
const classes = computed(() => {
  const base = 'px-4 py-2 rounded focus:outline-none'
  if (props.variant === 'primary') return `${base} bg-primary text-white ${props.class}`
  if (props.variant === 'secondary') return `${base} bg-secondary text-text ${props.class}`
  return `${base} ${props.class}`
})
</script>
