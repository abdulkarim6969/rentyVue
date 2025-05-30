<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faEnvelope);

const messages = ref([]);
const loading = ref(true);

const email = localStorage.getItem('email');

onMounted(async () => {
  try {
    const response = await api.get(`/api/notifiche/destinatario/${email}`);
    messages.value = response.data;
  } catch (error) {
    console.error('Errore nel caricamento delle notifiche:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="inbox-wrapper">
    <div class="sidebar">
      <h2>Inbox ({{ messages.length }})</h2>
      <ul v-if="messages.length">
        <li v-for="msg in messages" :key="msg.id" class="message-preview">
          {{ msg.emailMittente }}: {{ msg.messaggio }}...
        </li>
      </ul>
    </div>

    <div class="main">
      <div v-if="loading" class="spinner"></div>

      <div v-else-if="messages.length === 0" class="empty-state">
        <FontAwesomeIcon icon="envelope" class="mail-icon" />
        <h3>Nessuna Notifica</h3>
      </div>

      <div v-else class="notifications">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="notification-card"
          :class="{ unread: !msg.letto }"
        >
          <h4>{{ msg.nomeOggetto }}</h4>
          <p class="text">{{ msg.messaggio }}</p>
          <p v-if="msg.idOggetto == null" class="deleted-note">Oggetto eliminato</p>
          <p class="sender">Da: {{ msg.emailMittente }}</p>
          <p class="date">{{ new Date(msg.data).toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Spinner CSS */
.spinner {
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.inbox-wrapper {
  display: flex;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  background-color: white;
}

/* Sidebar */
.sidebar {
  width: 240px;
  border-right: 1px solid #e0e0e0;
  padding: 1rem;
  background-color: #fafafa;
}

.sidebar h2 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.message-preview {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

/* Main */
.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.notifications {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
  gap: 1rem;
}

.notification-card {
  width: 100%;
  background: #fdfdfd;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  text-align: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.notification-card.unread {
  background-color: #f2f8ff;
  border-left: 4px solid #3498db;
}

.notification-card h4 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.notification-card .text {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.notification-card .sender,
.notification-card .date {
  font-size: 0.8rem;
  color: #777;
}

.empty-state {
  text-align: center;
  color: #4a4a4a;
}

.mail-icon {
  font-size: 60px;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.deleted-note {
  color: #000000; /* rosso tenue */
  font-weight: bold;
  font-size: 0.95rem;
}

</style>
