<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  try {
    await authStore.login({ email: email.value, password: password.value })
    router.push('/') // Vai alla home dopo il login
  } catch (err) {
    error.value = 'Email o password non validi'
    console.error(err)
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Accedi al tuo Account</h1>

      <!-- Error message -->
      <div v-if="errorMsg" class="error" role="alert">
        {{ errorMsg }}
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit" class="submit-button">Login</button>
      </form>

      <div class="divider">oppure</div>

      <!-- @click="loginWithGoogle" -->
      <button  class="login-button google">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
        Continue with Google
      </button>

      <!-- @click="loginWithGithub" -->
      <button  class="login-button github">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
        Continue with GitHub
      </button>
    </div>
  </div>
</template>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.error {
  color: #c53030;
  margin-bottom: 12px;
  font-size: 14px;
}

.login-container {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  box-sizing: border-box;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
}

.login-box h1 {
  font-size: 24px;
  margin-bottom: 24px;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.login-form input {
  padding: 10px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.submit-button {
  padding: 10px;
  background-color: #355e84;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: rgb(21, 64, 93);
}

.divider {
  margin: 20px 0;
  font-size: 14px;
  color: #888;
}

.login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  margin-bottom: 12px;
  width: 100%;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.login-button img {
  width: 20px;
  height: 20px;
}

.login-button.google {
  background-color: #db4437;
  color: white;
}

.login-button.google:hover {
  background-color: #c1351d;
}

.login-button.github {
  background-color: #24292e;
  color: white;
}

.login-button.github:hover {
  background-color: #1b1f23;
}
</style>
