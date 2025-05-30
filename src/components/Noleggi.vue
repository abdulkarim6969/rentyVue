<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import OggettoCard from '@/components/OggettoNoleggiatoCard.vue'

const email = localStorage.getItem('email');

const richiesteRicevute = ref([]);
const noleggiEffettuati = ref([]);
const loading = ref(true);
const attiviProprietario = ref([]);
const attiviAcquirente = ref([]);

const fetchNoleggiAttivi = async () => {
  try {
    const [resProp, resAcq] = await Promise.all([
      api.get(`/api/noleggi/attivi/proprietario/${email}`),
      api.get(`/api/noleggi/attivi/acquirente/${email}`)
    ]);

    attiviProprietario.value = resProp.data.map(n => ({
    productId: n.oggetto.id,
    title: n.oggetto.nome,
    image: `data:image/jpeg;base64,${n.oggetto.immagineBase64}`,
    price: n.oggetto.prezzoGiornaliero,
    description: n.oggetto.descrizione,
    category: n.oggetto.nomeCategoria,
    attributes: n.oggetto.attributi,
    dataInizio: n.dataInizio,
    dataFine: n.dataFine,
    emailNoleggiante: n.email // oppure n.emailAcquirente, se disponibile
  }));

  attiviAcquirente.value = resAcq.data.map(n => ({
    productId: n.oggetto.id,
    title: n.oggetto.nome,
    image: `data:image/jpeg;base64,${n.oggetto.immagineBase64}`,
    price: n.oggetto.prezzoGiornaliero,
    description: n.oggetto.descrizione,
    category: n.oggetto.nomeCategoria,
    attributes: n.oggetto.attributi,
    dataInizio: n.dataInizio,
    dataFine: n.dataFine,
    emailNoleggiante: n.oggetto.emailProprietario}));
    
    

  } catch (error) {
    console.error('Errore nel recupero dei noleggi attivi:', error);
  } finally {
    loading.value = false;
  }
};

const caricaRichiesteRicevute = async () => {
  try {
    const res = await api.get(`/api/noleggi/richieste/ricevute/${email}`);
    richiesteRicevute.value = res.data;
    console.log(res.data);
    
  } catch (error) {
    console.error('Errore nel caricare le richieste ricevute:', error);
  }
};

const vista = ref('richieste');


const accettaRichiesta = async (id) => {
  try {
    await api.post(`/api/noleggi/richieste/${id}/accetta`);
    caricaRichiesteRicevute(); // aggiorna dopo l'azione
  } catch (error) {
    console.error('Errore durante l\'accettazione:', error);
  }
};

const rifiutaRichiesta = async (id) => {
  try {
    await api.post(`/api/noleggi/richieste/${id}/rifiuta`);
    caricaRichiesteRicevute(); // aggiorna dopo l'azione
  } catch (error) {
    console.error('Errore durante il rifiuto:', error);
  }
};

onMounted(() => {
  caricaRichiesteRicevute();
  fetchNoleggiAttivi();
   console.log("acquirente" + attiviAcquirente.value);
    console.log("propritario" + attiviProprietario.value);
  // TODO: caricare i noleggi effettuati da endpoint futuro
});
</script>

<template>
  <div class="noleggi-container">
    <div class="view-buttons">
      <button :class="{ active: vista === 'richieste' }" @click="vista = 'richieste'">Richieste Ricevute</button>
      <button :class="{ active: vista === 'proprietario' }" @click="vista = 'proprietario'">Noleggi da Proprietario</button>
      <button :class="{ active: vista === 'acquirente' }" @click="vista = 'acquirente'">Noleggi da Acquirente</button>
    </div>

    <!-- Richieste ricevute -->
    <section v-if="vista === 'richieste'">
      <h2>Richieste Ricevute</h2>
      <div v-if="richiesteRicevute.length === 0">Nessuna richiesta ricevuta.</div>
      <RichiestaNoleggioCard
        v-for="(richiesta, index) in richiesteRicevute"
        :key="index"
        :richiesta="richiesta"
        :oggetto="richiesta.oggetto"
        @accetta="accettaRichiesta"
        @rifiuta="rifiutaRichiesta"
      />
    </section>

    <!-- Noleggi come proprietario -->
    <section v-if="vista === 'proprietario'">
      <h2>Noleggi in corso come proprietario</h2>
      <div v-if="loading">Caricamento in corso...</div>
      <div v-else-if="attiviProprietario.length === 0">
        Nessun noleggio attivo come proprietario.
      </div>
      <div v-else class="noleggi-grid">
        <OggettoCard
          v-for="oggetto in attiviProprietario"
          :key="oggetto.productId"
          :product-id="oggetto.productId"
          :title="oggetto.title"
          :image="oggetto.image"
          :price="oggetto.price"
          :description="oggetto.description"
          :category="oggetto.category"
          :attributes="oggetto.attributes"
          :data-inizio="oggetto.dataInizio"
          :data-fine="oggetto.dataFine"
          :email-noleggiante="oggetto.emailNoleggiante"
        />
      </div>
    </section>

    <!-- Noleggi come acquirente -->
    <section v-if="vista === 'acquirente'">
      <h2>Noleggi in corso come acquirente</h2>
      <div v-if="loading">Caricamento in corso...</div>
      <div v-else-if="attiviAcquirente.length === 0">
        Nessun noleggio attivo come acquirente.
      </div>
      <div v-else class="noleggi-grid">
        <OggettoCard
          v-for="oggetto in attiviAcquirente"
          :key="oggetto.productId"
          :product-id="oggetto.productId"
          :title="oggetto.title"
          :image="oggetto.image"
          :price="oggetto.price"
          :description="oggetto.description"
          :category="oggetto.category"
          :attributes="oggetto.attributes"
          :data-inizio="oggetto.dataInizio"
          :data-fine="oggetto.dataFine"
          :email-noleggiante="oggetto.emailNoleggiante"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.noleggi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
.mt-8 {
  margin-top: 2rem;
}


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


.view-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.view-buttons button {
  padding: 0.6rem 1.2rem;
  border: 2px solid transparent;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  background-color: #e0e0e0;
}

.view-buttons button.active {
  background-color: #3498db;
  color: white;
  border-color: #2980b9;
}

section {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

</style>
