<template>
  <div class="container mx-auto px-4 py-16 max-w-2xl">
    <h1 class="text-3xl font-bold text-primary mb-8">Meu Perfil</h1>
    <form @submit.prevent="handleSave" class="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-6 mb-8">
      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
          <input v-model="profile.name" type="text" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="profile.email" type="email" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Telefone/WhatsApp</label>
          <input v-model="profile.phone" type="tel" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">CPF</label>
          <input v-model="profile.cpf" type="text" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
      </div>
      <button type="submit" class="py-3 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition-colors text-lg">Salvar Alterações</button>
    </form>

    <div class="bg-white rounded-xl shadow border border-blue-100 p-6 flex flex-col gap-6">
      <h2 class="font-bold text-lg mb-2 text-gray-700">Alterar Senha</h2>
      <form @submit.prevent="handleChangePassword" class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
          <input v-model="password.current" type="password" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
          <input v-model="password.new" type="password" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
          <input v-model="password.confirm" type="password" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
        </div>
        <button type="submit" class="py-3 bg-blue-50 text-blue-700 rounded font-bold border border-blue-200 hover:bg-blue-100 transition-colors text-lg">Alterar Senha</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const profile = ref({
  name: 'Vitor Savi',
  email: 'cliente@gmail.com',
  phone: '(41) 99999-8888',
  cpf: '123.456.789-00'
})

const password = ref({
  current: '',
  new: '',
  confirm: ''
})

function handleSave() {
  alert('Alterações salvas com sucesso!')
}

function handleChangePassword() {
  if (password.value.new !== password.value.confirm) {
    alert('A nova senha e a confirmação não coincidem.')
    return
  }
  alert('Senha alterada com sucesso!')
  password.value.current = ''
  password.value.new = ''
  password.value.confirm = ''
}
</script>
