// src/stores/useAuthStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(!!localStorage.getItem('email'))

  const checkAuthStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('email')
}

  const login = async ({ email, password }) => {
    try {
      const res = await api.post('http://localhost:8080/api/auth/login', {
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

const logout = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await api.post('http://localhost:8080/api/auth/logoutt');
        console.log(res);
        
        console.log(res.data);
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenType');
        isLoggedIn.value = false;
        // Opcional: redirigir al usuario
    } catch (error) {
        console.error("Error al hacer logout:", error);
        // Puedes mostrar un mensaje al usuario o reintentar
    }
}


  return { isLoggedIn, login, logout, checkAuthStatus }
})
