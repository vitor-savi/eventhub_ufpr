<template>
  <div class="min-h-screen grid grid-cols-1 md:grid-cols-2 relative">
    <!-- Back Button -->
    <router-link to="/" class="absolute top-6 left-6 z-10 flex items-center gap-2 text-white hover:text-white/80 transition-colors">
      <i class="pi pi-arrow-left"></i>
      <span class="text-sm font-medium">Voltar</span>
    </router-link>

    <!-- Left Panel -->
    <div class="bg-primary p-8 flex flex-col justify-center items-center text-white">
      <div class="w-40 h-40 mb-8 flex items-center justify-center">
        <img src="/icons/logo_eventhub.jpg" alt="EventHub Logo" class="w-full h-full object-contain rounded-lg" />
      </div>
      <h2 class="text-2xl font-bold mb-4">Bem-vindo(a)!</h2>
      <p class="text-center max-w-sm">
        Faça login para acessar sua conta ou cadastre-se para criar uma nova.
      </p>
    </div>

    <!-- Right Panel -->
    <div class="p-8 flex flex-col justify-center max-w-md mx-auto w-full">
      <h1 class="text-2xl font-bold mb-8">Acessar Conta</h1>
      
      <form @submit.prevent="doLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">E-mail</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="seu@email.com"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Senha</label>
          <div class="relative">
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="********"
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
        </div>

        <div class="flex items-center">
          <input type="checkbox" id="remember" v-model="rememberMe" class="rounded text-primary" />
          <label for="remember" class="ml-2 text-sm">Lembrar-me</label>
        </div>

        <button 
          type="submit"
          class="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Entrar
        </button>

        <div class="text-center">
          <router-link to="/esqueci-senha" class="text-primary hover:underline">
            Esqueci minha senha
          </router-link>
        </div>

        <div class="text-center">
          <span class="text-gray-600">Novo por aqui?</span>
          <router-link to="/cadastro" class="text-primary hover:underline ml-1">
            Cadastrar-se
          </router-link>
        </div>

        <div class="text-center text-gray-500 text-sm flex items-center justify-center gap-2">
          <i class="pi pi-lock"></i>
          <span>Seus dados estão seguros e criptografados.</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const router = useRouter()
const auth = useAuthStore()

function doLogin() {
  const u = auth.login(email.value)
  if (u) {
    if (u.role === 'cliente') router.push('/cliente/dashboard')
    else if (u.role === 'admin') router.push('/admin/dashboard')
  } else {
    alert('Usuário não encontrado! Use:\ncliente@gmail.com\nadmin@eventhub.com')
  }
}
</script>
