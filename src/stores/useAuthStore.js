// src/stores/useAuthStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(!!localStorage.getItem('token'))

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      })

      const { token, tokenType } = res.data

      localStorage.setItem('email', email)
      localStorage.setItem('token', token)
      localStorage.setItem('tokenType', tokenType)
      isLoggedIn.value = true
    } catch (error) {
      console.error('Login fallito', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('tokenType')
    isLoggedIn.value = false
  }

  return { isLoggedIn, login, logout }
})
