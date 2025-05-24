<script setup>
import { ref } from 'vue';
import axios from 'axios';

const nome = ref('');
const descrizione = ref('');
const prezzoGiornaliero = ref(0);
const nomeCategoria = ref('');
const attributi = ref([]); // puoi aggiungere gestione dinamica in futuro
const file = ref(null);

function onFileChange(event) {
  file.value = event.target.files[0];
}

async function submitForm() {
  try {
    const formData = new FormData();

    // Costruisci l'oggetto dati per il DTO
    const dto = {
      nome: nome.value,
      descrizione: descrizione.value,
      prezzoGiornaliero: prezzoGiornaliero.value,
      emailProprietario: localStorage.getItem('email'),
      nomeCategoria: nomeCategoria.value,
      attributi: attributi.value, // eventualmente lascia vuoto o struttura minima
    };

    formData.append('file', file.value);
    formData.append('dati', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    const response = await axios.post('/api/oggetti/crea', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // se usi token
      }
    });

    alert('Oggetto creato con successo!');
    // magari fai redirect o reset form

  } catch (error) {
    alert('Errore nella creazione: ' + error.response?.data || error.message);
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="form-crea-oggetto">
    <div>
      <label>Nome</label>
      <input type="text" v-model="nome" required />
    </div>
    <div>
      <label>Descrizione</label>
      <textarea v-model="descrizione" required></textarea>
    </div>
    <div>
      <label>Prezzo Giornaliero (€)</label>
      <input type="number" v-model.number="prezzoGiornaliero" required min="0" step="0.01" />
    </div>
    <div>
      <label>Categoria</label>
      <input type="text" v-model="nomeCategoria" required />
    </div>
    <!-- qui puoi aggiungere campi per attributi dinamici -->
    <div>
      <label>Immagine</label>
      <input type="file" @change="onFileChange" accept="image/*" />
    </div>
    <button type="submit">Crea Oggetto</button>
  </form>
</template>

<style scoped>
.form-crea-oggetto {
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-crea-oggetto label {
  font-weight: 600;
}

.form-crea-oggetto input,
.form-crea-oggetto textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-crea-oggetto button {
  background-color: #e74c3c;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 700;
}

.form-crea-oggetto button:hover {
  background-color: #c0392b;
}
</style>
