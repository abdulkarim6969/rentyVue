<template>
  <div class="preferiti-wrapper">
    <h2>Articoli preferiti</h2>

    <div v-if="loading" class="spinner-wrapper">
      <div class="spinner"></div>
    </div>

    <div v-else-if="articoli.length === 0" class="empty-state">
      <p>Salva qualche oggetto nei preferiti</p>
    </div>

    <div v-else class="articoli-grid">
      <Oggetto
        v-for="articolo in articoli"
        :key="articolo.id"
        :title="articolo.nome"
        :image="articolo.immagine"
        :product-id="articolo.id"
        :price="articolo.prezzoGiornaliero"
        :category="articolo.categoria"
        :description="articolo.descrizione"
        :attributes="articolo.attributi"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import Oggetto from '@/components/Oggettocard2.vue'

const articoli = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const email = localStorage.getItem('email')
    const response = await api.get(`/api/preferiti/${encodeURIComponent(email)}`)
    
    articoli.value = response.data.map(item => ({
      id: item.id,
      nome: item.nome,
      immagine: formatBase64(item.immagineBase64),
      prezzoGiornaliero: item.prezzoGiornaliero,
      categoria: item.nomeCategoria,
      descrizione: item.descrizione,
      attributi: item.attributi || []
    }))
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    loading.value = false
  }
})

const formatBase64 = (base64) => {
  if (!base64) return '/placeholder.jpg'
  return base64.startsWith('data:image') 
    ? base64 
    : `data:image/jpeg;base64,${base64}`
}
</script>

<style scoped>
.preferiti-wrapper {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  color: #111;
}

.articoli-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
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
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .preferiti-wrapper {
    padding: 1rem;
  }
  
  .articoli-grid {
    gap: 1rem;
  }
}
</style>