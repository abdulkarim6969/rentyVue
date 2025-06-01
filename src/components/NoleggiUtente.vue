<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const email = localStorage.getItem('email');

const richiesteRicevute = ref([]);
const noleggiEffettuati = ref([]);

const caricaRichiesteRicevute = async () => {
  try {
    const res = await api.get(`/api/noleggi/richieste/ricevute/${email}`);
    richiesteRicevute.value = res.data;
  } catch (error) {
    console.error('Errore nel caricare le richieste ricevute:', error);
  }
};

const accettaRichiesta = async (id) => {
  try {
    await api.post(`/api/noleggi/richieste/${id}/accetta`);
    caricaRichiesteRicevute();
  } catch (error) {
    console.error('Errore durante l\'accettazione:', error);
  }
};

const rifiutaRichiesta = async (id) => {
  try {
    await api.post(`/api/noleggi/richieste/${id}/rifiuta`);
    caricaRichiesteRicevute(); 
  } catch (error) {
    console.error('Errore durante il rifiuto:', error);
  }
};

onMounted(() => {
  caricaRichiesteRicevute();
});
</script>

<template>
  <div class="noleggi-container">
    <section>
      <h2>Richieste Ricevute</h2>
      <div v-if="richiesteRicevute.length === 0">Nessuna richiesta ricevuta.</div>
      <div v-else class="richiesta" v-for="(richiesta, index) in richiesteRicevute" :key="index">
        <p><strong>Email richiedente:</strong> {{ richiesta.emailUtente }}</p>
        <p><strong>Dal:</strong> {{ richiesta.dataInizio }}</p>
        <p><strong>Al:</strong> {{ richiesta.dataFine }}</p>
        <div class="buttons">
          <button @click="accettaRichiesta(richiesta.codiceOggetto)">Accetta</button>
          <button @click="rifiutaRichiesta(richiesta.codiceOggetto)">Rifiuta</button>
        </div>
      </div>
    </section>

    <section>
      <h2>Noleggi Effettuati</h2>
      <p>Integrazione API in corso...</p>
    </section>
  </div>
</template>

<style scoped>
.noleggi-container {
  padding: 2rem;
  max-width: 800px;
  margin: auto;
}

section {
  margin-bottom: 3rem;
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.richiesta {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:first-child {
  background-color: #2ecc71;
  color: white;
}

button:last-child {
  background-color: #e74c3c;
  color: white;
}
</style>
