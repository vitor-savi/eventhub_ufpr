<template>
  <div 
    class="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 
           transition-all duration-300 hover:bg-gradient-to-br hover:from-primary/5 hover:to-primary/10"
  >
    <div class="flex flex-col items-center text-center">
      <div 
        class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6
               group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300"
      >
        <i :class="[service.icon, 'text-4xl text-primary']"></i>
      </div>
      <h3 class="text-2xl font-bold mb-4 text-gray-900">{{ service.name }}</h3>
      <p class="text-gray-600 leading-relaxed">{{ service.description }}</p>
      
      <button 
        class="mt-6 px-6 py-2 rounded-full border-2 border-primary text-primary font-medium
               opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0
               transition-all duration-300 hover:bg-primary hover:text-white"
        @click="$emit('select', service)"
      >
        Saiba Mais
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  service: {
    type: Object,
    required: true,
    validator: (prop) => prop.name && prop.description && prop.icon
  }
})

defineEmits(['select'])
</script>