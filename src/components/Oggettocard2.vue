<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart as fasHeart, faTag, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fasHeart, farHeart, faTag, faInfoCircle);

const props = defineProps({
  title: String,
  image: String,
  productId: Number,
  price: Number,
  description: String,
  category: String,
  attributes: Array
});

const router = useRouter();
const isFavorite = ref(false);
const showAttributes = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};
</script>

<template>
  <div class="product-card">
    <div class="product-badges">
      <div class="category-badge">
        <FontAwesomeIcon :icon="['fas', 'tag']" />
        {{ category }}
      </div>
    </div>
    
    <img :src="image" :alt="title" class="product-image" />
    
    <div class="product-info">
      <h3>{{ title }}</h3>
      
      <div class="price">
        {{ formatPrice(price) }}<span class="day">/giorno</span>
      </div>
      
      <p class="description">{{ description }}</p>
      
      <div class="attributes-toggle" @click="showAttributes = !showAttributes">
        <FontAwesomeIcon :icon="['fas', 'info-circle']" />
        {{ showAttributes ? 'Nascondi dettagli' : 'Mostra dettagli' }}
      </div>
      
      <div v-if="showAttributes" class="attributes">
        <div v-for="attr in attributes" :key="attr.nomeAttributo" class="attribute">
          <strong>{{ attr.nomeAttributo }}:</strong> {{ attr.valore }}
        </div>
      </div>
      
      <div class="actions">
        <button class="rent-btn" @click="router.push(`/products/${productId}`)">
          Noleggia
        </button>
        <button class="heart-btn" @click="toggleFavorite">
          <FontAwesomeIcon :icon="[isFavorite ? 'fas' : 'far', 'heart']" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  position: relative;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}

.category-badge {
  background: rgba(255, 255, 255, 0.9);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.product-info {
  padding: 1.2rem;
}

.price {
  color: #2ecc71;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0.8rem 0;
}

.day {
  font-size: 0.9rem;
  color: #666;
  margin-left: 0.3rem;
}

.description {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 1rem 0;
}

.attributes-toggle {
  color: #3498db;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
}

.attributes-toggle:hover {
  text-decoration: underline;
}

.attributes {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}

.attribute {
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
}

.rent-btn {
  background-color: #2c3e50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  flex-grow: 1;
  transition: background-color 0.2s;
}

.rent-btn:hover {
  background-color: #2980b9;
}
</style>