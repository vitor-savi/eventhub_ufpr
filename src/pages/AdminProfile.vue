<template>
  <div class="min-h-screen">
    <div class="bg-white rounded-xl shadow p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>

      <!-- Informações Pessoais -->
      <section class="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Informações Pessoais</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
            <input v-model.trim="profile.name" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Nome do Administrador" />
            <p v-if="errors.name" class="text-xs text-red-600 mt-1">{{ errors.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input v-model.trim="profile.email" type="email" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="email@eventhub.com" />
            <p v-if="errors.email" class="text-xs text-red-600 mt-1">{{ errors.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
            <input v-model.trim="profile.phone" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="(XX) XXXXX-XXXX" />
            <p v-if="errors.phone" class="text-xs text-red-600 mt-1">{{ errors.phone }}</p>
          </div>
          <div class="pt-2">
            <button @click="saveProfile" class="px-5 py-2.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Salvar Alterações</button>
            <span v-if="saveMsg" :class="['ml-3 text-sm font-medium', saveError ? 'text-red-600' : 'text-green-700']">{{ saveMsg }}</span>
          </div>
        </div>
      </section>

      <!-- Alterar Senha -->
      <section class="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 class="text-lg font-bold text-gray-800 mb-4">Alterar Senha</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Senha Atual</label>
            <input v-model="pwd.current" type="password" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="pwdErrors.current" class="text-xs text-red-600 mt-1">{{ pwdErrors.current }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Nova Senha</label>
            <input v-model="pwd.newPass" type="password" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="pwdErrors.newPass" class="text-xs text-red-600 mt-1">{{ pwdErrors.newPass }}</p>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Confirmar Nova Senha</label>
            <input v-model="pwd.confirm" type="password" class="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <p v-if="pwdErrors.confirm" class="text-xs text-red-600 mt-1">{{ pwdErrors.confirm }}</p>
          </div>
          <div class="pt-2">
            <button @click="changePassword" class="px-5 py-2.5 rounded bg-green-600 text-white font-semibold hover:bg-green-700">Alterar Senha</button>
            <span v-if="pwdMsg" :class="['ml-3 text-sm font-medium', pwdError ? 'text-red-600' : 'text-green-700']">{{ pwdMsg }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Mock profile data; em produção viria do store/API
const profile = ref({ name: 'Maria Admin', email: 'admin@eventhub.com', phone: '(41) 99999-9999' })
const errors = ref({ name: '', email: '', phone: '' })
const saveMsg = ref('')
const saveError = ref(false)
let saveTimer = null

function saveProfile() {
  errors.value = { name: '', email: '', phone: '' }
  if (!profile.value.name) errors.value.name = 'Informe seu nome completo.'
  if (!profile.value.email || !/.+@.+\..+/.test(profile.value.email)) errors.value.email = 'Email inválido.'
  if (!profile.value.phone) errors.value.phone = 'Informe um telefone.'

  const has = Object.values(errors.value).some(Boolean)
  if (has) { showSaveMsg('Corrija os campos destacados.', true); return }

  showSaveMsg('Alterações salvas com sucesso.')
}

function showSaveMsg(msg, isError = false) {
  saveMsg.value = msg
  saveError.value = isError
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => saveMsg.value = '', 4000)
}

// Change password
const pwd = ref({ current: '', newPass: '', confirm: '' })
const pwdErrors = ref({ current: '', newPass: '', confirm: '' })
const pwdMsg = ref('')
const pwdError = ref(false)
let pwdTimer = null

function changePassword() {
  pwdErrors.value = { current: '', newPass: '', confirm: '' }
  if (!pwd.value.current) pwdErrors.value.current = 'Informe a senha atual.'
  if (!pwd.value.newPass || pwd.value.newPass.length < 6) pwdErrors.value.newPass = 'A nova senha deve ter ao menos 6 caracteres.'
  if (pwd.value.newPass !== pwd.value.confirm) pwdErrors.value.confirm = 'A confirmação deve coincidir com a nova senha.'
  const has = Object.values(pwdErrors.value).some(Boolean)
  if (has) { showPwdMsg('Não foi possível alterar a senha. Verifique os campos.', true); return }
  // Simulação de sucesso
  pwd.value = { current: '', newPass: '', confirm: '' }
  showPwdMsg('Senha alterada com sucesso.')
}

function showPwdMsg(msg, isError = false) {
  pwdMsg.value = msg
  pwdError.value = isError
  if (pwdTimer) clearTimeout(pwdTimer)
  pwdTimer = setTimeout(() => pwdMsg.value = '', 4000)
}
</script>
