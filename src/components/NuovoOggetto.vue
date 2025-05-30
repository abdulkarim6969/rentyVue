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
      router.push('/home');
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

      <div class="file-upload-wrapper">
  <label for="file-upload" class="custom-file-upload">Scegli immagine</label>
  <input id="file-upload" type="file" @change="onFileChange" accept="image/*" />
  <span v-if="file">{{ file.name }}</span>
</div>
      <button type="submit">Crea Oggetto</button>
    </form>
  </div>
</template>

<style scoped>
.file-upload-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.custom-file-upload {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  color: white;
  background-color: #9b59b6;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
}

.custom-file-upload:hover {
  background-color: #8e44ad;
}

input[type="file"] {
  display: none;
}

.file-upload-wrapper span {
  font-size: 0.95rem;
  color: #555;
}


.form-wrapper {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  transition: opacity 0.3s ease;
}

.banner.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.banner.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.form-crea-oggetto {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-crea-oggetto label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  display: block;
}

.form-crea-oggetto input,
.form-crea-oggetto textarea,
.form-crea-oggetto select {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
}

.form-crea-oggetto input:focus,
.form-crea-oggetto textarea:focus,
.form-crea-oggetto select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.form-crea-oggetto textarea {
  resize: vertical;
  min-height: 100px;
}

.form-crea-oggetto button {
  background-color: #3498db;
  color: white;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.05rem;
  transition: background-color 0.3s;
}

.form-crea-oggetto button:hover {
  background-color: #2980b9;
}

</style>
