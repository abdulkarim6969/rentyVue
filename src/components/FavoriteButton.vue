<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
})

const isFavorite = ref(false)
const loading = ref(false)

onMounted(async () => {
  try {
    const response = await api.get(`/api/preferiti/check/${props.productId}`)
    isFavorite.value = response.data.preferito
    console.log('Stato iniziale preferito:', isFavorite.value)
  } catch (error) {
    console.error('Errore nel controllo preferito:', error)
  }
})

const toggleFavorite = async () => {
  if (loading.value) return;

  const token = localStorage.getItem('token');
  if (!token) {
    console.error("Token non presente, utente non autenticato.");
    return;
  }

  loading.value = true;
  try {
    if (isFavorite.value) {
      console.log('Rimuovo dai preferiti:', props.productId);
      await api.delete(`/api/preferiti/rimuovi/${props.productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      isFavorite.value = false;
    } else {
      console.log('Aggiungo ai preferiti:', props.productId);
      await api.post(`/api/preferiti/aggiungi/${props.productId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      isFavorite.value = true;
    }
  } catch (error) {
    console.error('Errore toggle preferiti:', error);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <button 
    class="heart-btn" 
    @click="toggleFavorite" 
    :aria-pressed="isFavorite.toString()" 
    :title="isFavorite ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'">
    <svg 
      v-if="isFavorite" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="red" 
      width="24" height="24" 
      aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 
               19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
    <svg 
      v-else 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="red" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      width="24" height="24" 
      aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
               2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
               C13.09 3.81 14.76 3 16.5 3 
               19.58 3 22 5.42 22 8.5
               c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  </button>
</template>

<style scoped>
.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.15s ease;
}
.heart-btn:hover {
  transform: scale(1.2);
}
</style>
