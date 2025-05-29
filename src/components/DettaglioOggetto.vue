<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import api from '@/services/api';

const route = useRoute()

const selectedRange = ref(null)
const bookedDates = ref(new Set()) // sarà popolato con le date occupate

const fallbackImage = 'https://via.placeholder.com/250'

const item = ref({
  id: route.params.id,
  title: route.query.title || 'Oggetto non disponibile',
  image: route.query.image || fallbackImage,
  price: parseFloat(route.query.price) || 0,
  description: route.query.description || 'Nessuna descrizione disponibile',
  category: route.query.category || 'N/A',
  attributes: [],
  images: [route.query.image || fallbackImage]
})

try {
  item.value.attributes = JSON.parse(route.query.attributes || '[]')
} catch {
  item.value.attributes = []
}

// 🔄 Chiamata per recuperare le date prenotate
const fetchUnavailableDates = async () => {
  try {
    const response = await api.get(`/api/noleggi/giorniOccupati/${item.value.id}`)
    const data = response.data

    if (!Array.isArray(data)) {
      console.warn('⚠️ La risposta non è un array:', data)
      return
    }

    if (data.length === 0) {
      console.info('✅ Nessuna data occupata trovata.')
      return
    }

    bookedDates.value = new Set(
      data.map(dateStr => new Date(dateStr).toDateString())
    )

    console.log('📅 Date occupate caricate:', bookedDates.value)

  } catch (error) {
    console.error('Errore nel fetch delle date occupate:', error)
  }
}



// ⛔ Disabilita le date già prenotate
const disableBookedDates = (date) => {
  if (!bookedDates.value || bookedDates.value.size === 0) return false
  return bookedDates.value.has(date.toDateString())
}

// 📦 Prenotazione fittizia (alert)
const rentItem = () => {
  if (!selectedRange.value) {
    alert('Seleziona un intervallo di date per procedere.')
    return
  }

  alert(`Hai prenotato dal ${selectedRange.value.start.toLocaleDateString()} al ${selectedRange.value.end.toLocaleDateString()}.`)
}

onMounted(() => {
  fetchUnavailableDates()
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
      <h2>{{ item.title }}</h2>
      <p><strong>Prezzo:</strong> {{ item.price }} €/giorno</p>
      <p><strong>Categoria:</strong> {{ item.category }}</p>
      <p>{{ item.description }}</p>

      <div v-for="attr in item.attributes" :key="attr.nomeAttributo">
        <strong>{{ attr.nomeAttributo }}:</strong> {{ attr.valore }}
      </div>

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
</style>
