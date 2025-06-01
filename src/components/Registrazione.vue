<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Crea un nuovo account</h1>

      <div v-if="errorMsg" class="error" role="alert">
        {{ errorMsg }}
      </div>

      <form @submit.prevent="handleRegister" class="login-form">
        <input type="text" v-model="nomeUtente" placeholder="Nome utente" required />
        <input type="text" v-model="nome" placeholder="Nome" required />
        <input type="text" v-model="cognome" placeholder="Cognome" required />
        <input type="text" v-model="indirizzo" placeholder="Indirizzo" required />
        <input type="text" v-model="cap" placeholder="CAP" required />
        <input type="text" v-model="citta" placeholder="Città" required />
        <input type="text" v-model="telefono" placeholder="Telefono" required />
        <input type="date" v-model="dataNascita" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="password" v-model="confirmPassword" placeholder="Conferma password" required />
        <button type="submit" class="submit-button">Registrati</button>
      </form>

      <RouterLink to="/login" class="divider">oppure Accedi</RouterLink>

      <button @click="registerWithGoogle" class="login-button google">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
        Registrati con Google
      </button>

      <button @click="registerWithGithub" class="login-button github">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
        Registrati con GitHub
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const router = useRouter();

const nomeUtente = ref('');
const nome = ref('');
const cognome = ref('');
const indirizzo = ref('');
const cap = ref('');
const citta = ref('');
const telefono = ref('');
const dataNascita = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');

const handleRegister = async () => {
  errorMsg.value = '';

  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Le password non coincidono.';
    return;
  }

  try {
    const response = await api.post('/api/auth/register', {
      nomeUtente: nomeUtente.value,
      nome: nome.value,
      cognome: cognome.value,
      indirizzo: indirizzo.value,
      cap: cap.value,
      citta: citta.value,
      telefono: telefono.value,
      dataNascita: dataNascita.value,
      email: email.value,
      password: password.value,
    });

    await router.push({ name: 'dettagliOggetto' });

  } catch (err) {
    console.error(err);
    if (err.response) {
      errorMsg.value = err.response.data.message || 'Errore durante la registrazione.';
    } else if (err.request) {
      errorMsg.value = 'Errore di rete. Controlla la connessione.';
    } else {
      errorMsg.value = 'Errore inaspettato.';
    }
  }
};

const registerWithGoogle = () => {
  window.location.href = 'http://localhost:8080/oauth2/authorization/google';
};

const registerWithGithub = () => {
  window.location.href = 'http://localhost:8080/oauth2/authorization/github';
};
</script>

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

.login-container {
  overflow-y: auto;
  padding: 20px;
}

.login-box {
  margin: 40px 0;
}

</style>
