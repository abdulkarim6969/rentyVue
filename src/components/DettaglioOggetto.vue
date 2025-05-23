<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const route = useRoute()
const item = ref(null)
const unavailableRanges = ref([]) // intervalli di date da disabilitare
const selectedRange = ref(null)

const fallbackItem = {
  id: 'default',
  title: 'Maglia Inter 2025/2026',
  brand: 'Nike',
  size: 'L',
  color: 'Bianco',
  condition: 'Nuovo con cartellino',
  price: 31.15,
  images: ['https://via.placeholder.com/250'],
  description: 'Nuovissima maglia da gara Inter 2025/2026.'
}

// Simula un backend che restituisce intervalli occupati
const fetchItemDetails = async (id) => {
  try {
    // Simula richiesta backend
    const response = {
      item: fallbackItem,
      booked: [
        { start: '2025-07-01', end: '2025-07-05' },
        { start: '2025-07-10', end: '2025-07-12' }
      ]
    }

    item.value = response.item

    // Converti in array di oggetti Date
    unavailableRanges.value = response.booked.map(r => ({
      start: new Date(r.start),
      end: new Date(r.end)
    }))
  } catch (err) {
    item.value = fallbackItem
  }
}

onMounted(() => {
  const itemId = route.params.id || 'default'
  fetchItemDetails(itemId)
})
</script>

<template>
  <div v-if="item" class="item-detail">
    <div class="images">
      <img
        v-for="(img, i) in item.images"
        :key="i"
        :src="img"
        :alt="item.title"
        class="item-image"
      />
    </div>
    <div class="info">
      <h1>{{ item.title }}</h1>
      <p><strong>Brand:</strong> {{ item.brand }}</p>
      <p><strong>Taglia:</strong> {{ item.size }}</p>
      <p><strong>Condizioni:</strong> {{ item.condition }}</p>
      <p><strong>Colore:</strong> {{ item.color }}</p>
      <p><strong>Prezzo:</strong> €{{ item.price.toFixed(2) }}</p>
      <p><strong>Descrizione:</strong> {{ item.description }}</p>

      <div class="calendar">
        <h3>Seleziona le date per il noleggio:</h3>
        <Datepicker
          v-model="selectedRange"
          :disabled-date="disableBookedDates"
          range
          placeholder="Seleziona intervallo"
          :min-date="new Date()"
        />
      </div>
      <button @click="rentItem" class="rent-button">Noleggia</button>

    </div>
    
  </div>
</template>

<style scoped>

.rent-button {
  margin-top: 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}


.item-detail {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
}
.images {
  flex: 1;
}
.item-image {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.info {
  flex: 2;
}
.calendar {
  margin-top: 2rem;
}
</style>

<script>
// Funzione per disabilitare date occupate
function disableBookedDates(date) {
  return unavailableRanges.value.some(range => {
    const d = date.setHours(0, 0, 0, 0)
    const start = range.start.setHours(0, 0, 0, 0)
    const end = range.end.setHours(0, 0, 0, 0)
    return d >= start && d <= end
  })
}
</script>
