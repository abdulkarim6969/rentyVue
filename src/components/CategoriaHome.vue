<script setup>
import { Home, BookOpen, Monitor } from 'lucide-vue-next'

</script>


<template>

<section class="categories">
      <div class="container">
      <h2 class="section-title">Noleggia per categoria</h2>
      <div class="category-grid">
      <div class="category-card">
        <Home size="64" stroke-width="1.5" />
        <h3>Casa</h3>
      </div>
      <div class="category-card">
        <BookOpen size="64" stroke-width="1.5" />
        <h3>Libri</h3>
      </div>
      <div class="category-card">
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
  padding: 4rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}


.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card svg {
  color: #355e84;
}


.category-card h3 {
  text-align: center;
  padding: 1.5rem;
  color: #2c3e50;
}

</style>