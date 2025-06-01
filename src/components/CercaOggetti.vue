<template>
  <div class="search-results">
    <h2 v-if="route.params.nome" class="results-title">
        Risultati per "{{ route.params.nome }}" 
    </h2>


    <div v-if="loading" class="spinner-wrapper">
      <div class="spinner"></div>
    </div>

    <div v-else-if="risultati.length === 0">
      <p>Nessun oggetto trovato.</p>
    </div>

    <div v-else class="articoli-grid">
      <Oggetto
        v-for="item in risultati"
        :key="item.id"
        :title="item.nome"
        :image="formatBase64(item.immagineBase64)"
        :product-id="item.id"
        :price="item.prezzoGiornaliero"
        :category="item.nomeCategoria"
        :description="item.descrizione"
        :attributes="item.attributi"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import Oggetto from '@/components/Oggettocard2.vue' //cambia se hai un altro componente

const route = useRoute()
const risultati = ref([])
const loading = ref(false)

const formatBase64 = (base64) => {
  if (!base64) return '/placeholder.jpg'
  return base64.startsWith('data:image') ? base64 : `data:image/jpeg;base64,${base64}`
}

const cercaOggetti = async () => {
  const nome = route.query.nome
  if (!nome) return

  loading.value = true
  try {
    const token = localStorage.getItem('token') 
    const response = await api.get(`/api/oggetti/cerca/${encodeURIComponent(nome)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    risultati.value = response.data
  } catch (error) {
    console.error('Errore durante la ricerca:', error)
  } finally {
    loading.value = false
  }
}

onMounted(cercaOggetti)
watch(() => route.query.nome, cercaOggetti)
</script>

<style scoped>
.spinner-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.articoli-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

.articoli-grid > * {
  flex: 1 1 300px;
  max-width: 350px; 
  box-sizing: border-box;
}



.results-title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.08);
}


.results-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

</style>
