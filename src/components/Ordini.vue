<script setup>
defineProps({
  title: String,
  price: String,
  status: {
    type: String,
    validator: (value) => ['in_corso', 'completato', 'annullato'].includes(value)
  },
  statusMessage: String
})
</script>

<template>
  <div class="order-card">
    <div class="header">
      <h3 class="title">{{ title }}</h3>
      <span class="price">{{ price }}</span>
    </div>
    <div class="status-message" :class="status">
      {{ statusMessage }}
    </div>
  </div>
</template>

<style scoped>
.order-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.price {
  font-weight: bold;
  color: #2c3e50;
}

.status-message {
  font-size: 0.875rem;
  line-height: 1.4;
}

.status-message.annullato {
  color: #e74c3c;
}

.status-message.completato {
  color: #2ecc71;
}

.status-message.in_corso {
  color: #3498db;
}
</style>