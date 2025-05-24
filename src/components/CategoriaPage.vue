<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Oggetto from '@/components/Oggettocard2.vue';

const route = useRoute();
const risultati = ref([]);
const categoria = ref(route.params.nomeCategoria);

const formatBase64 = (base64) => {
  if (!base64) return '/placeholder.jpg';
  return base64.startsWith('data:image') ? base64 : `data:image/jpeg;base64,${base64}`;
};

const fetchOggetti = async (cat) => {
  console.log('Caricamento categoria:', cat);
  try {
    const response = await axios.get(`/api/oggetti/categoria/${cat}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    console.log('Risposta API:', response.data);
    if (Array.isArray(response.data)) {
      risultati.value = response.data;
    } else {
      risultati.value = [];
    }
  } catch (error) {
    console.error('Errore nel recupero degli oggetti:', error);
    risultati.value = [];
  }
};

onMounted(() => {
  console.log('Mounted con categoria:', categoria.value);
  fetchOggetti(categoria.value);
});

watch(() => route.params.nomeCategoria, (newCat) => {
  console.log('Parametro nomeCategoria cambiato:', newCat);
  categoria.value = newCat;
  fetchOggetti(newCat);
});
</script>

<template>
  <main class="categoria-page">
    <h2>Oggetti nella categoria "{{ categoria }}"</h2>
    <div class="articoli-grid">
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

.articoli-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding: 0 1.5rem;
}
</style>
