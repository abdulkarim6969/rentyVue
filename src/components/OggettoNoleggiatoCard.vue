<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTag, faInfoCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTag, faInfoCircle, faUser);

const props = defineProps({
  productId: Number,
  title: String,
  image: String,
  price: Number,
  description: String,
  category: String,
  attributes: Array,
  dataInizio: String,
  dataFine: String,
  emailNoleggiante: String
});

const showAttributes = ref(false);

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

      <div class="noleggio-info">
        <p><strong>Inizio:</strong> {{ dataInizio }}</p>
        <p><strong>Fine:</strong> {{ dataFine }}</p>
        <p><FontAwesomeIcon :icon="['fas', 'user']" /> <strong>Noleggiato da:</strong> {{ emailNoleggiante }}</p>
      </div>

      <div class="attributes-toggle" @click="showAttributes = !showAttributes">
        <FontAwesomeIcon :icon="['fas', 'info-circle']" />
        {{ showAttributes ? 'Nascondi dettagli' : 'Mostra dettagli' }}
      </div>

      <div v-if="showAttributes" class="attributes">
        <div v-for="attr in attributes" :key="attr.nomeAttributo" class="attribute">
          <strong>{{ attr.nomeAttributo }}:</strong> {{ attr.valore }}
        </div>
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

.noleggio-info {
  background: #f9f9f9;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: #444;
  line-height: 1.5;
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
</style>
