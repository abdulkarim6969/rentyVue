<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';



defineProps({
  title: String,
  image: String,
  productId: Number,
});

const router = useRouter();



</script>

<template>
  <div class="product-card">
    <img :src="image" :alt="title" />
    <div class="product-info">
      <h3>{{ title }}</h3>
      <div class="actions">
      <div class="action-buttons">
      <button class="accept-btn" @click="handleAccept">
        <FontAwesomeIcon icon="check-circle" />
        Accetta Richiesta
      </button>
      <button class="reject-btn" @click="handleReject">
        <FontAwesomeIcon icon="times-circle" />
        Rifiuta Richiesta
      </button>
    </div>
      
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

button:hover {
  filter: brightness(0.95);
}

.accept-btn {
  background-color: #2ecc71;
  color: white;
}

.reject-btn {
  background-color: #e74c3c;
  color: white;
}

button svg {
  font-size: 1.1rem;
}
</style>
