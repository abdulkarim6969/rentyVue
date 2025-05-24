import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Registrazione from '@/components/Registrazione.vue';
import HomePageView from '@/views/HomePageView.vue';
import Inbox from '@/components/Inbox.vue';
import ProfiloUtente from '@/components/ProfiloUtente.vue';
import OggettiPreferiti from '@/components/OggettiPreferiti.vue';
import Noleggi from '@/components/Noleggi.vue';
import CercaOggetti from '@/components/CercaOggetti.vue'
import NuovoOggetto from '@/components/NuovoOggetto.vue';
import CategoriaPage from '@/components/CategoriaPage.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePageView,
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login.vue'),
      meta: { hideNavbar: true }
    },

    {
      path: '/regi',
      name: 'regi',
      component: Registrazione,
      },

    {
      path: '/profilo',
      name: 'profilo',
      component: ProfiloUtente,
    },

     {
      path: '/inbox',
      name: 'inbox',
      component: Inbox,
    },
     {
      path: '/preferiti',
      name: 'preferiti',
      component: OggettiPreferiti,
    },

    {
      path: '/noleggi',
      name: 'noleggi',
      component: Noleggi,
    }, 

    {
    path: '/risultati-ricerca',
    name: 'RisultatiRicerca',
    component: CercaOggetti
    },

    {
    path: '/nuovo-oggetto',
    name: 'NuovoOggetto',
    component: NuovoOggetto,
    },

    {
    path: '/categoria/:nomeCategoria',
    name: 'CategoriaPage',
    component: CategoriaPage
    }
   
  ],
})

export default router
