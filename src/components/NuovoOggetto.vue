<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import { useRouter } from 'vue-router';

const nome = ref('');
const descrizione = ref('');
const prezzoGiornaliero = ref(0);
const nomeCategoria = ref('');
const attributi = ref([]);
const file = ref(null);
const categorie = ref([]);

const router = useRouter();

const banner = ref({
  message: '',
  type: '',
  show: false
});

function showBanner(message, type = 'success') {
  banner.value = { message, type, show: true };
  setTimeout(() => {
    banner.value.show = false;
  }, 3000);
}

function onFileChange(event) {
  file.value = event.target.files[0];
}

async function fetchCategorie() {
  try {
    const response = await api.get('/api/oggetti/categorie');
    categorie.value = response.data;
  } catch (error) {
    showBanner('Errore nel caricamento delle categorie.', 'error');
  }
}

async function submitForm() {
  try {
    const formData = new FormData();
    const dto = {
      nome: nome.value,
      descrizione: descrizione.value,
      prezzoGiornaliero: prezzoGiornaliero.value,
      emailProprietario: localStorage.getItem('email'),
      nomeCategoria: nomeCategoria.value,
      attributi: attributi.value,
    };

    formData.append('file', file.value);
    formData.append('dati', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    await api.post('/api/oggetti/crea', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    showBanner('Oggetto creato con successo!', 'success');

    setTimeout(() => {
      router.push('/');
    }, 1000);

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Errore nella creazione.';
    showBanner(errorMessage, 'error');
  }
}

// Carica le categorie al montaggio del componente
onMounted(fetchCategorie);
</script>

<template>
  <div class="form-wrapper">
    <div v-if="banner.show" :class="['banner', banner.type]">
      {{ banner.message }}
    </div>

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
      <select v-model="nomeCategoria" required>
        <option disabled value="">Seleziona una categoria</option>
        <option v-for="cat in categorie" :key="cat.id" :value="cat.nome">
          {{ cat.nome }}
        </option>
      </select>
    </div>  

      <div>
        <label>Immagine</label>
        <input type="file" @change="onFileChange" accept="image/*" />
      </div>
      <button type="submit">Crea Oggetto</button>
    </form>
  </div>
</template>

<style scoped>
.form-wrapper {
  max-width: 500px;
  margin: 2rem auto;
}

.banner {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
}

.banner.success {
  background-color: #2ecc71;
  color: white;
}

.banner.error {
  background-color: #e74c3c;
  color: white;
}

.form-crea-oggetto {
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
