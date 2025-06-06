<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Oggetto from '@/components/OggettoProfilo.vue';
import api from '@/services/api'

const route = useRoute();
const user = ref(null);
const userProducts = ref([]);
const isLoading = ref(true);
const error = ref(null);

const handleDelete = (deletedId) => {
  userProducts.value = userProducts.value.filter(product => product.id !== deletedId);
};


onMounted(async () => {
  try {
    const email = localStorage.getItem('email');
    
    const [oggettiResponse, utenteResponse] = await Promise.all([
      api.get(`/api/oggetti/${email}`),
      api.get(`/api/utenti/${email}`)
    ]);

    userProducts.value = oggettiResponse.data.map(oggetto => ({
      id: oggetto.id,
      title: oggetto.nome,
      description: oggetto.descrizione,
      price: oggetto.prezzoGiornaliero,
      category: oggetto.nomeCategoria,
      image: `data:image/jpeg;base64,${oggetto.immagineBase64}`,
      attributes: oggetto.attributi,
      createdAt: oggetto.dataCreazione,
      updatedAt: oggetto.ultimaModifica
    }));

    const userData = utenteResponse.data;
    user.value = {
      email: userData.email,
      username: userData.nomeUtente,
      nome: userData.nome,
      cognome: userData.cognome,
      indirizzo: userData.indirizzo,
      cap: userData.cap,
      citta: userData.citta,
      telefono: userData.telefono,
      dataNascita: new Date(userData.dataNascita).toLocaleDateString('it-IT'),
      verified: ['Facebook', 'Google', 'E-mail'] 
    };

  } catch (err) {
    error.value = 'Errore nel caricamento dei dati';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="user-profile">
    <div v-if="isLoading" class="loading-spinner-container">
  <div class="spinner"></div>
  </div>


    <div v-else-if="error">{{ error }}</div>

    <div v-else>
      <div class="profile-header">
        <div class="profile-info">
          <h2>{{ user.nome }} {{ user.cognome }}</h2>
          <div class="contact-details">
            <div class="contact-item">
              <svg>...</svg>
              <span>👤 {{ user.username }}</span>
            </div>
            <div class="contact-item">
              <svg>...</svg>
              <span>📧 {{ user.email }}</span>
            </div>
            <div class="contact-item">
              <svg>...</svg>
              <span>📅 {{ user.dataNascita }}</span>
            </div>
            <div class="contact-item">
              <svg>...</svg>
              <span>📱 {{ user.telefono }}</span>
            </div>
          </div>
          <p>🏠 {{ user.indirizzo }}, {{ user.cap }} {{ user.citta }}</p>
        </div>
      </div>

      <h3 class="section-title">Oggetti in noleggio ({{ userProducts.length }})</h3>
      <div class="product-grid">
        <Oggetto
          v-for="product in userProducts"
          :key="product.id"
          :title="product.title"
          :image="product.image"
          :product-id="product.id"
          :price="product.price"
          :category="product.category"
          :description="product.description"
          :attributes="product.attributes"
          @deleted="handleDelete"
        />

      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.profile-header {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-info h2 {
  color: #1a1a1a;
  margin: 0 0 0.8rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
  font-size: 0.9rem;
}

.profile-info p {
  margin: 0.2rem 0;
  padding: 0.4rem 0;
  color: #4a4a4a;
  line-height: 1.4;
  border-bottom: 1px solid #f0f0f0;
}

.profile-info p:last-child {
  border-bottom: none;
}

/* Badge verificato */
.verified-badge {
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  margin: 0.2rem 0.2rem 0 0;
}

.section-title {
  margin: 1.5rem 0 1rem;
  font-size: 1.2rem;
  color: #333;
  font-weight: 500;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
  padding: 0.5rem 0;
}

@media (max-width: 768px) {
  .user-profile {
    padding: 0.5rem;
  }
  
  .profile-header {
    padding: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .profile-info {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .profile-info h2 {
    font-size: 1.3rem;
  }
  
  .section-title {
    font-size: 1.1rem;
    margin: 1rem 0;
  }
  
  .product-grid {
    gap: 1rem;
  }
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: #f8f8f8;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

.contact-item svg {
  width: 14px;
  height: 14px;
  opacity: 0.7;
}

.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 6px solid #f3f3f3; 
  border-top: 6px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>