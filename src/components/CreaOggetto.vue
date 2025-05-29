<script setup>
import { ref } from 'vue'
import api from '@/services/api'
const form = ref({
  nome: '',
  descrizione: '',
  prezzoGiornaliero: 0,
  nomeCategoria: '',
})

const selectedFile = ref(null)
const success = ref(false)
const error = ref(false)

function handleFileChange(e) {
  selectedFile.value = e.target.files[0]
}

async function submitForm() {
  // Recupera l'email del proprietario da localStorage
  const ownerEmail = localStorage.getItem('emailUtente')
  if (!ownerEmail) {
    error.value = true
    console.error('Email proprietario non trovata in localStorage')
    return
  }

  // Crea payload unendo form e email proprietario
  const payload = {
    ...form.value,
    emailProprietario: ownerEmail,
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append(
    'dati',
    new Blob([JSON.stringify(payload)], { type: 'application/json' })
  )

  try {
    await api.post('/api/oggetti/crea', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    success.value = true
    error.value = false
  } catch (err) {
    success.value = false
    error.value = true
    console.error(err)
  }
}
</script>


<template>

   <div class="new-product-page">
    <form class="product-form" @submit.prevent="handleSubmit">
      <!-- Caricamento Immagine -->
      <div class="image-upload">
        <div class="image-box" @click="triggerFileInput">
          <span v-if="!preview">Clicca qui o carica un'immagine</span>
          <img v-if="preview" :src="preview" alt="Anteprima immagine" class="preview-img" />
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="hidden-input"
        />
        <p class="image-hint">Cattura lo sguardo degli utenti con foto di alta qualità. <a href="#">Scopri di più</a></p>
      </div>

      <!-- Altri campi del form -->
      <div class="form-group">
        <label>Titolo</label>
        <input type="text" v-model="title" placeholder="ad es. maglione bianco COS" />
      </div>

      <div class="form-group">
        <label>Descrivi il tuo articolo</label>
        <textarea v-model="description" placeholder="ad es. indossato solo poche volte, buona vestibilità"></textarea>
      </div>

      <div class="form-group">
        <label>Categoria</label>
        <select v-model="category">
          <option disabled value="">Seleziona una categoria</option>
          <option>Casa</option>
          <option>Elettronica</option>
          <option>Libri</option>
        </select>
      </div>

      <div class="form-group">
        <label>Prezzo</label>
        <input type="number" v-model="price" placeholder="0,00 €" />
      </div>


      <!-- Pulsanti -->
      <div class="form-actions">
        <button type="submit" class="submit">Carica</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.new-product-page {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.product-form {
  background-color: hsl(196, 44%, 95%);
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
}

.image-upload {
  text-align: center;
  margin-bottom: 1rem;
}

.image-box {
  border: 2px dashed #c4c4c4;
  padding: 2rem;
  border-radius: 10px;
  background: #fff;
}

.image-box button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #8281c0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.image-hint {
  background-color: #d7f3f4;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  background-color: white;
}

textarea {
  min-height: 80px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.form-actions .submit {
  background-color: #007b7f;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>
