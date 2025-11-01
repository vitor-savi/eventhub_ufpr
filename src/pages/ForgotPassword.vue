<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-4">Esqueceu sua Senha?</h2>
        <p class="text-gray-600 mb-8">
          Informe o e-mail associado à sua conta para receber o link de redefinição.
        </p>
      </div>

      <form @submit.prevent="handleResetRequest" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input 
            v-model="email" 
            type="email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <button 
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enviar Link de Recuperação
        </button>

        <div class="text-center">
          <router-link to="/login" class="text-primary hover:underline">
            Voltar para o Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

function handleResetRequest() {
  // Mock implementation
  alert('Link de recuperação enviado! Por favor, verifique seu email.')
  router.push('/login')
}
</script>