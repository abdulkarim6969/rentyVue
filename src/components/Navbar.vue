<script setup>
import { useAuthStore } from '@/stores/useAuthStore'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

const searchQuery = ref('')
const authStore = useAuthStore()
const { isLoggedIn } = storeToRefs(authStore)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'RisultatiRicerca', query: { nome: searchQuery.value.trim() } })
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>


<template>
  <header class="header">
    <div class="container header-content">
      <div class="logo">
        <RouterLink to="/home"><h1>Renty</h1></RouterLink>
      </div>

      <div class="container search-bar">
        <input
        name="ricerca"
          type="text"
          v-model="searchQuery"
          placeholder="ricerca..."
          class="search-input"
        />
        <button @click="handleSearch" class="search-button">Cerca</button>

        <div v-if="isLoggedIn" class="search-icons">
          <RouterLink to="/preferiti" class="icon-button" title="Preferiti">
            <font-awesome-icon :icon="['fas', 'heart']" />
          </RouterLink>
          <RouterLink to="/inbox" class="icon-button" title="Inbox">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </RouterLink>
          <RouterLink to="/profilo" class="icon-button" title="Profilo">
            <font-awesome-icon :icon="['fas', 'user']" />
          </RouterLink>
        </div>
      </div>

      <nav class="nav-menu">
        <ul>
          <li v-if="isLoggedIn">
            <RouterLink to="/noleggi">Noleggi</RouterLink>
          </li>
          <li v-if="!authStore.isLoggedIn">
            <RouterLink to="/login">Accedi</RouterLink>
          </li>
          <li v-if="isLoggedIn">
            <a @click="handleLogout" class="logout-button">Esci</a>
          </li>
        </ul>
      </nav>
    </div>

  </header>
</template>

<style scoped>

.search-icons {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
}

.icon-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  transition: transform 0.2s ease;
}

.icon-button:hover {
  transform: scale(1.2);
}


.category-bar {
  background-color: #2c3e50;
  padding: 0 0rem;
  font-family: sans-serif;
  color: #fff;
  border: #fff 1px

}

.main-categories {
  display: flex;
  gap: 5rem;
  list-style: none;
  margin: 0;
  padding-top:  1rem;
  padding-left:   2rem;
  border-top: #a39d9d 1px solid;
}

.category-item {
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0rem;
}

.category-item:hover {
  color: #355e84;
}

.subcategory-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 10;
}

.subcategory-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 2rem;
}

.category-item:hover .subcategory-dropdown {
  display: block;
}

/* Base Styles */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header Styles */

.header {
  background: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  color: white;
  font-size: 2rem;
  font-weight: 700;
}

.nav-menu ul {
  display: flex;
  gap: 2rem;
  list-style: none;
  
}

.nav-menu a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  background: #355e84;
  padding: 10px;
  border-radius: 10px;
}

.nav-menu a:hover {
  color: #3498db;
}

/* Hero Section */
.hero {
  background: #2c3e50;
  color: white;
  padding: 6rem 0;
  flex: 1;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero h2 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
}

.search-input {
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 400px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
}

.search-button {
  padding: 0.5rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.search-button:hover {
  background-color: #c0392b;
}
/* Aggiungi questi stili */
.logout-button {
  cursor: pointer;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  background: #355e84;
  padding: 10px;
  border-radius: 10px;
}

.logout-button:hover {
  color: #ff4757;
}

.nav-menu ul {
  gap: 1rem;
}
</style>