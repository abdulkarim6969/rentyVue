<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'; // pieno
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'; // vuoto
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fasHeart, farHeart);

defineProps({
  title: String,
  image: String,
  productId: Number,
});

const router = useRouter();
const isFavorite = ref(false);

// const goToProduct = () => {
//   router.push({ name: 'product', params: { id: productId } });
// };

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
</script>

<template>
  <div class="product-card">
    <img :src="image" :alt="title" />
    <div class="product-info">
      <h3>{{ title }}</h3>
      <div class="actions">
        <button class="rent-btn" @click="goToProduct">Noleggia</button>
        <button class="heart-btn" @click="toggleFavorite" aria-label="Aggiungi ai preferiti">
          <FontAwesomeIcon :icon="[isFavorite ? 'fas' : 'far', 'heart']" />
        </button>
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
  gap: 1rem;
  align-items: center;
}

.rent-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.rent-btn:hover {
  background-color: #2980b9;
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
