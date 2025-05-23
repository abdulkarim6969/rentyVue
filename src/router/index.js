import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';
import Registrazione from '@/components/Registrazione.vue';
import HomePageView from '@/views/HomePageView.vue';
import Inbox from '@/components/Inbox.vue';
import ProfiloUtente from '@/components/ProfiloUtente.vue';
import OggettiPreferiti from '@/components/OggettiPreferiti.vue';
import Noleggi from '@/components/Noleggi.vue';


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
      name: 'login',
      component: Login,
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
    }

   
  ],
})

export default router
