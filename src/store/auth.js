import { defineStore } from 'pinia'
import { users } from '../mock/data'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  function login(email) {
    const found = users.find(u => u.email === email)
    if (found) {
      user.value = found
      return found
    }
    return null
  }

  function logout() {
    user.value = null
  }

  return { user, login, logout }
})
