import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {inject, ref} from 'vue';
import Game from "@/views/Game.vue";
import Stats from "@/views/Stats.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView },
    { path: '/game',
      name: 'Game',
      component: Game },
    { path: '/stats',
      name: 'Stats',
      component: Stats }
  ],
});

router.beforeEach((to, from, next) => {
  const pseudo = inject("pseudo");
  // Vérifier si l'utilisateur est authentifié pour accéder à /game et /stats
  if ((to.path === '/game' || to.path === '/stats') && pseudo.value === "") {
    next('/home'); // Rediriger vers la page d'accueil si l'utilisateur n'est pas authentifié
  } else {
    next();
  }
});

export default router
