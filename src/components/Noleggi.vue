<template>
  <div class="noleggi-page">
    <aside class="sidebar">
      <h2>I miei Noleggi</h2>
      <button class="sidebar-btn">Noleggiati</button>
      <button class="sidebar-btn">Messi a noleggio</button>
    </aside>

    <main class="main-content">
      <div class="tabs">
        <button :class="{ active: selectedTab === 'tutti' }" @click="selectedTab = 'tutti'">Tutti</button>
        <button :class="{ active: selectedTab === 'in_corso' }" @click="selectedTab = 'in_corso'">In corso</button>
        <button :class="{ active: selectedTab === 'completati' }" @click="selectedTab = 'completati'">Completati</button>
        <button :class="{ active: selectedTab === 'annullati' }" @click="selectedTab = 'annullati'">Annullati</button>
      </div>

      <div class="cards">
        <RichiestaNoleggioCard
          v-for="(noleggio, index) in noleggi"
          :key="index"
          :title="noleggio.title"
          :image="noleggio.image"
          :productId="noleggio.productId"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RichiestaNoleggioCard from './RichiestaNoleggiCard.vue';

const selectedTab = ref('tutti');

const noleggi = ref([
  {
    title: 'Jeans corto blu scuro',
    image: 'https://via.placeholder.com/120x120?text=Jeans',
    productId: 1,
  },
  {
    title: 'Scarpe Adidas',
    image: 'https://via.placeholder.com/120x120?text=Scarpe',
    productId: 2,
  },
  {
    title: 'Occhiali Anguria',
    image: 'https://via.placeholder.com/120x120?text=Occhiali',
    productId: 3,
  },
]);
</script>

<style scoped>
.noleggi-page {
  display: flex;
  gap: 2rem;
}

.sidebar {
  width: 200px;
  padding: 1rem;
  margin-right: 100px;
}

.sidebar h2 {
  margin-bottom: 1rem;
}

.sidebar-btn {
  display: block;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #f1f1f1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}

.main-content {
  flex: 1;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tabs button {
  background: none;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
}

.tabs .active {
  background-color: #ddd;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
