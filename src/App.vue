<script setup>
import { RouterView, useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'


onMounted(() => {
  const authStore = useAuthStore()
  authStore.checkAuthStatus()
})
const route = useRoute()
</script>

<template>
  <Navbar v-if="!route.meta.hideNavbar" />
  <RouterView />
</template>
