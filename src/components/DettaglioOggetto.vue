<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import api from '@/services/api'

const route = useRoute()

const selectedRange = ref(null)
const bookedDates = ref(new Set())
const isLoading = ref(false)

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

const formatDateToYMD = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return date.toISOString().split('T')[0]
}

const disableBookedDates = (date) => {
  const formatted = formatDateToYMD(date)
  return bookedDates.value.has(formatted)
}

const isRangeValid = computed(() => {
  if (!selectedRange.value || selectedRange.value.length < 2) return false
  
  const [start, end] = selectedRange.value
  const currentDate = new Date(start)
  
  while (currentDate <= end) {
    if (disableBookedDates(currentDate)) {
      return false
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return true
})

const fetchUnavailableDates = async () => {
  try {
    isLoading.value = true
    const response = await api.get(`/api/noleggi/giorniOccupati/${item.value.id}`)
    const data = response.data

    if (!Array.isArray(data)) {
      console.warn('⚠️ La risposta non è un array:', data)
      return
    }

    const newBookedDates = new Set()
    data.forEach(dateStr => {
      try {
        const normalized = formatDateToYMD(dateStr)
        newBookedDates.add(normalized)
      } catch (e) {
        console.warn('Formato data non valido:', dateStr)
      }
    })

    bookedDates.value = newBookedDates
    console.log('📅 Date occupate caricate:', Array.from(bookedDates.value))
  } catch (error) {
    console.error('Errore nel fetch delle date occupate:', error)
  } finally {
    isLoading.value = false
  }
}
const rentItem = async () => {
  if (!isRangeValid.value) {
    alert('L\'intervallo selezionato contiene date non disponibili. Seleziona un altro periodo.')
    return
  }

  const [start, end] = selectedRange.value

  try {
    const payload = {
      idNoleggio: null,
      emailUtenteRichiedente: localStorage.getItem('email'), 
      codiceOggetto: parseInt(item.value.id),
      dataInizio: formatDateToYMD(start),
      dataFine: formatDateToYMD(end),
      oggetto: null
    }

    const response = await api.post('/api/noleggi/richieste', payload)
    
    alert('✅ Richiesta di noleggio inviata con successo!')
  } catch (error) {
    console.error('Errore durante l\'invio della richiesta:', error)
    alert('❌ Errore durante l\'invio della richiesta di noleggio.')
  }
}

watch(bookedDates, () => {
  selectedRange.value = null
}, { deep: true })

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
        <div v-if="isLoading">Caricamento date disponibili...</div>
        <Datepicker
          v-else
          v-model="selectedRange"
          :disabled-date="disableBookedDates"
          range
          placeholder="Seleziona intervallo"
          :min-date="new Date()"
          :hide-offset-dates="true"
          :highlight="{
            dates: Array.from(bookedDates).map(d => new Date(d)),
            color: '#ff8080',
            opacity: 0.5
          }"
        />
        <div v-if="selectedRange && !isRangeValid" class="error-message">
          Attenzione: L'intervallo selezionato contiene date non disponibili
        </div>
      </div>
      <button 
        @click="rentItem" 
        class="rent-button" 
        :disabled="!selectedRange || !isRangeValid || isLoading"
      >
        {{ isLoading ? 'Caricamento...' : 'Noleggia' }}
      </button>
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
  transition: background-color 0.3s;
}
.rent-button:hover {
  background-color: #0056b3;
}
.rent-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.error-message {
  color: #d32f2f;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
</style>