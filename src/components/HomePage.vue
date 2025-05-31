<script setup>
import { onMounted, ref } from 'vue';
import CategoriaHome from '@/components/CategoriaHome.vue';
import Oggetto from '@/components/Oggettocard2.vue';
import { fetchOggettiRandom } from '@/services/oggetti2.js';
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

const oggetti = ref([]);
const isLoading = ref(true); // 👉 Stato di caricamento
const router = useRouter();
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

const formatBase64 = (base64) => {
  if (!base64) return '/placeholder.jpg';
  return base64.startsWith('data:image') 
    ? base64 
    : `data:image/jpeg;base64,${base64}`;
};

onMounted(async () => {
  try {
    const start = 1;
    const end = 8;
    let response;

    if (isLoggedIn) {
      const emailProprietario = localStorage.getItem('email');
      response = await fetchOggettiRandom(start, end, emailProprietario);
    }

    oggetti.value = (response?.oggetti || []).map(item => ({
      productId: item.id,
      title: item.nome,
      description: item.descrizione,
      price: item.prezzoGiornaliero,
      category: item.nomeCategoria,
      image: formatBase64(item.immagineBase64),
      attributes: item.attributi || []
    }));

  } catch (error) {
    console.error('Errore nel caricamento degli oggetti:', error);
    oggetti.value = [];
  } finally {
    isLoading.value = false; // 👉 Nascondi spinner al termine
  }
});

function vaiANuovoOggetto() {
  if (isLoggedIn.value) {
    router.push('/nuovo-oggetto');
  } else {
    router.push('/login');
  }
}
</script>

<template>
  <main>
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h2>Metti a noleggio gli oggetti che non utilizzi</h2>
          <p>è arrivato il momento di liberare la casa!</p>
          <button class="cta-btn" @click="vaiANuovoOggetto">Metti a Noleggio subito</button>
        </div>
      </div>
    </section>

    <CategoriaHome />

    <section class="products">
      <div class="container">
        <div v-if="isLoading" class="spinner-wrapper">
          <div class="spinner"></div>
        </div>
        <div v-else class="product-grid">
          <Oggetto
            v-for="oggetto in oggetti"
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

/* Spinner */
.spinner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #e74c3c;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 0.9s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
