<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fasHeart, farHeart);

defineProps({
  title: String,
  image: String,
  productId: Number,
  richiestaId: Number
});

const router = useRouter();

const accettaRichiesta = () => {
  console.log(`Richiesta ${richiestaId} accettata`);
};

const rifiutaRichiesta = () => {
  console.log(`Richiesta ${richiestaId} rifiutata`);
};

const goToProduct = () => {
  router.push({ name: 'product', params: { id: productId } });
};

</script>

<template>
  <div class="product-card">
    <img :src="image" :alt="title" />
    <div class="product-info">
      <h3>{{ title }}</h3>

      <div class="actions">
        <button class="accept-btn" @click="accettaRichiesta">Accetta</button>
        <button class="reject-btn" @click="rifiutaRichiesta">Rifiuta</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
  max-width: 300px;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info h3 {
  margin: 1rem 0;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.accept-btn,
.reject-btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.95rem;
  cursor: pointer;
}

.accept-btn {
  background-color: #2ecc71;
  color: white;
}

.accept-btn:hover {
  background-color: #27ae60;
}

.reject-btn {
  background-color: #e74c3c;
  color: white;
}

.reject-btn:hover {
  background-color: #c0392b;
}

.heart-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.3rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.heart-btn:hover {
  transform: scale(1.1);
}
</style>
