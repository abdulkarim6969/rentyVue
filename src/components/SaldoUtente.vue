<script setup>
import { ref } from 'vue';

const meseCorrente = 'maggio 2025';

const saldoInSospeso = ref(0.00);
const saldoDisponibile = ref(0.00);
</script>

<template>
  <div class="saldo-container">
    <aside class="sidebar">
      <h2>Saldo</h2>
      <ul>
        <li><strong>Saldo</strong></li>
        <li>Impostazioni</li>
        <li>Cronologia pagamenti</li>
        <li>Fatture</li>
        <li>Guadagno</li>
      </ul>
    </aside>

    <main class="content">
      <div class="card">
        <div class="card-header">
          <h3>{{ meseCorrente }}</h3>
          <p class="sospeso">
            Saldo in sospeso <span>{{ saldoInSospeso.toFixed(2) }} €</span>
          </p>
        </div>

        <div class="card-body">
          <div class="promo-box">
            <p><strong>Vuoi guadagnare soldi extra?</strong><br>
              Più articoli carichi, più facile sarà per gli utenti trovarti.</p>
            <a href="#" class="carica-link">Carica un articolo ›</a>
          </div>

          <div class="disponibile">
            <p class="saldo-valore">{{ saldoDisponibile.toFixed(2) }} €</p>
            <p class="label">Saldo disponibile</p>
            <button class="attiva-btn">Attiva il Saldo</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.saldo-container {
  display: flex;
  font-family: sans-serif;
}

.sidebar {
  width: 200px;
  background: #f1f5f5;
  padding: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.sidebar li {
  margin-bottom: 1rem;
  color: #4a4a4a;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  padding: 1.5rem;
}

.card-header h3 {
  margin: 0 0 0.5rem 0;
  font-weight: normal;
}

.sospeso {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #666;
}

.card-body {
  margin-top: 1.5rem;
}

.promo-box {
  background: #e6fcff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  color: #003333;
}

.carica-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: #007f91;
  font-weight: bold;
  text-decoration: none;
}

.disponibile {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.saldo-valore {
  font-size: 2rem;
  font-weight: bold;
}

.label {
  font-size: 0.9rem;
  color: #666;
}

.attiva-btn {
  background-color: #007f91;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>
