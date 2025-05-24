<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import Oggetto from '@/components/Oggettocard2.vue'

const route = useRoute()
const risultati = ref([])
const loading = ref(false)
const categoria = ref(route.params.nomeCategoria)

const formatBase64 = (base64) => {
  if (!base64) return '/placeholder.jpg'
  return base64.startsWith('data:image') ? base64 : `data:image/jpeg;base64,${base64}`
}

const fetchOggettiPerCategoria = async (cat) => {
  if (!cat) {
    risultati.value = []
    return
  }
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await api.get(`/api/oggetti/categoria/${encodeURIComponent(cat)}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    risultati.value = response.data
  } catch (error) {
    console.error('Errore nel recupero degli oggetti per categoria:', error)
    risultati.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOggettiPerCategoria(categoria.value)
})

watch(() => route.params.nomeCategoria, (newCat) => {
  categoria.value = newCat
  fetchOggettiPerCategoria(newCat)
})
</script>

<template>
  <main class="categoria-page">
    <h2>Oggetti nella categoria "{{ categoria }}"</h2>

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
  </main>
</template>

<style scoped>
.categoria-page {
  padding: 2rem;
}

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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 0 1.5rem;
}
</style>
