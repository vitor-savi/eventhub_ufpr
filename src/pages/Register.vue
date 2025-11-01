<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2">
    <!-- Left Panel -->
    <div class="bg-primary p-8 flex flex-col justify-center items-center text-white">
      <div class="w-32 h-32 bg-white rounded-lg mb-8 flex items-center justify-center">
        <span class="text-primary text-lg font-bold">LOGO</span>
      </div>
      <h2 class="text-2xl font-bold mb-4">Bem-vindo(a)!</h2>
      <p class="text-center max-w-sm">
        Faça login para acessar sua conta ou cadastre-se para criar uma nova.
      </p>
    </div>

    <!-- Right Panel -->
    <div class="p-8 flex flex-col justify-center max-w-md mx-auto w-full">
      <h1 class="text-2xl font-bold mb-8">Cadastro de Novo Cliente</h1>
      
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Nome Completo</label>
          <input 
            v-model="form.name" 
            type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input 
            v-model="form.email" 
            type="email"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Telefone/WhatsApp</label>
          <input 
            v-model="form.phone" 
            type="tel"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">CPF (Opcional)</label>
          <input 
            v-model="form.cpf" 
            type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Senha</label>
          <div class="relative">
            <input 
              v-model="form.password" 
              :type="showPassword ? 'text' : 'password'"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button 
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <i :class="['pi', showPassword ? 'pi-eye-slash' : 'pi-eye']"></i>
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-1">min. 8 caracteres, Letra maiúscula, números e Símbolo</p>
        </div>

        <div class="flex items-center">
          <input type="checkbox" id="terms" v-model="form.acceptTerms" required class="rounded text-primary" />
          <label for="terms" class="ml-2 text-sm">Li e aceito os Termos de Serviço</label>
        </div>

        <button 
          type="submit"
          class="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Cadastrar
        </button>

        <div class="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
          <i class="pi pi-lock"></i>
          <span>Seus dados estão seguros e criptografados.</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  cpf: '',
  password: '',
  acceptTerms: false
})

function handleRegister() {
  // Mock implementation
  alert('Registro realizado com sucesso!')
  router.push('/login')
}
</script>
