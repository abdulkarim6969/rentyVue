<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  richiesta: Object,
  oggetto: Object
});

const emits = defineEmits(['accetta', 'rifiuta']);

const formatDate = (data) =>
  new Date(data).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
</script>

<template>
  <div class="richiesta-card">
    <img :src="oggetto.image" :alt="oggetto.nome" class="oggetto-image" />

    <div class="richiesta-info">
      <h3>{{ oggetto.nome }}</h3>
      <p class="descrizione">{{ oggetto.descrizione }}</p>
      <p><strong>Categoria:</strong> {{ oggetto.categoria }}</p>
      <p><strong>Prezzo giornaliero:</strong> €{{ oggetto.prezzoGiornaliero.toFixed(2) }}</p>

      <div class="dettagli-richiesta">
        <p><strong>Richiedente:</strong> {{ richiesta.emailUtente }}</p>
        <p><strong>Periodo:</strong> {{ formatDate(richiesta.dataInizio) }} → {{ formatDate(richiesta.dataFine) }}</p>
      </div>

      <div class="buttons">
        <button class="accept-btn" @click="$emit('accetta', richiesta.idNoleggio)">Accetta</button>
        <button class="refuse-btn" @click="$emit('rifiuta', richiesta.idNoleggio)">Rifiuta</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.richiesta-card {
  display: flex;
  gap: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1.2rem;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  transition: box-shadow 0.3s;
}

.richiesta-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.oggetto-image {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
}

.richiesta-info {
  flex: 1;
}

.descrizione {
  color: #555;
  font-size: 0.95rem;
  margin: 0.5rem 0;
}

.dettagli-richiesta {
  background: #f9f9f9;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  font-size: 0.9rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.accept-btn,
.refuse-btn {
  padding: 0.6rem 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.accept-btn {
  background-color: #2ecc71;
  color: white;
}

.accept-btn:hover {
  background-color: #27ae60;
}

.refuse-btn {
  background-color: #e74c3c;
  color: white;
}

.refuse-btn:hover {
  background-color: #c0392b;
}
</style>
