<script setup>
import { Home, BookOpen, Monitor } from 'lucide-vue-next'
import { useRouter } from 'vue-router';
const router = useRouter();

function vaiACategoria(nomeCategoria) {
  router.push({ name: 'CategoriaPage', params: { nomeCategoria } });
}
</script>


<template>
  <section class="categories">
    <div class="container">
      <h2 class="section-title">Noleggia per categoria</h2>
      <div class="category-grid">
        <div class="category-card" @click="vaiACategoria('Casa')">
          <Home size="64" stroke-width="1.5" />
          <h3>Casa</h3>
        </div>
        <div class="category-card" @click="vaiACategoria('Libri')">
          <BookOpen size="64" stroke-width="1.5" />
          <h3>Libri</h3>
        </div>
        <div class="category-card" @click="vaiACategoria('Elettronica')">
          <Monitor size="64" stroke-width="1.5" />
          <h3>Elettronica</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

/* Categories Section */
.categories {
  padding: 2rem 0;
  background: #f9f9f9;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.category-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.category-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  background-color: #f0f0f0;
}

.category-card h3 {
  margin-top: 1rem;
  font-size: 1.25rem;
  color: #444;
}

.category-card svg {
  color: #355e84;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
}

</style>