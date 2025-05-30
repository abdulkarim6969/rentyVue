<script setup>
import { onMounted, ref } from 'vue';
import CategoriaHome from '@/components/CategoriaHome.vue';
import Oggetto from '@/components/Oggettocard2.vue';
import { fetchOggettiRandom, fetchOggettiRandomPublic } from '@/services/oggetti2.js';
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const oggetti = ref([]);
const visibleCount = ref(8); // Numero iniziale di oggetti mostrati
const router = useRouter();
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

// Format base64 image
const formatBase64 = (base64) => {
  if (!base64) return '/placeholder.jpg';
  return base64.startsWith('data:image')
    ? base64
    : `data:image/jpeg;base64,${base64}`;
};

// Funzione per mischiare array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Caricamento oggetti
const loadOggetti = async () => {
  try {
    const start = 1;
    const end = 15; // Numero massimo da caricare
    let response;

    
    const emailProprietario = localStorage.getItem('email');
    response = await fetchOggettiRandom(start, end, emailProprietario);
    

    const dati = (response.oggetti || []).map(item => ({
      productId: item.id,
      title: item.nome,
      description: item.descrizione,
      price: item.prezzoGiornaliero,
      category: item.nomeCategoria,
      image: formatBase64(item.immagineBase64),
      attributes: item.attributi || []
    }));

    oggetti.value = shuffle(dati);
  } catch (error) {
    console.error('Errore nel caricamento degli oggetti:', error);
    oggetti.value = [];
  }
};

onMounted(loadOggetti);

// Navigazione nuovo oggetto
function vaiANuovoOggetto() {
  if (isLoggedIn.value) {
    router.push('/nuovo-oggetto');
  } else {
    router.push('/login');
  }
}

// Aumenta numero visibile
function mostraAltriOggetti() {
  visibleCount.value += 4;
}
</script>

<template>
  <main>
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h2>Noleggia gli oggetti che non utilizzi</h2>
          <p>È arrivato il momento di liberare la casa!</p>
          <button class="cta-btn" @click="vaiANuovoOggetto">Metti a Noleggio subito</button>
        </div>
      </div>
    </section>

    <CategoriaHome />

    <section class="products">
      <div class="container">
        <div class="product-grid">
          <Oggetto
            v-for="oggetto in oggetti.slice(0, visibleCount)"
            :key="oggetto.productId"
            :productId="oggetto.productId"
            :title="oggetto.title"
            :image="oggetto.image"
            :price="oggetto.price"
            :category="oggetto.category"
            :description="oggetto.description"
            :attributes="oggetto.attributes"
          />
        </div>

        <div v-if="visibleCount < oggetti.length" class="load-more-container">
          <button class="load-more-btn" @click="mostraAltriOggetti">
            Mostra altri oggetti
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.hero {
  background-image: url('/src/assets/img/renty.webp');
  position: relative;
  color: white;
  padding: 6rem 0;
  flex: 1;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-btn {
  background: #e74c3c;
  color: white;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cta-btn:hover {
  background: #c0392b;
}

.products {
  padding: 4rem 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.load-more-container {
  text-align: center;
  margin-top: 2rem;
}

.load-more-btn {
  background: #3498db;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.load-more-btn:hover {
  background: #2980b9;
}
</style>
