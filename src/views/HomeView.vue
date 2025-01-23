<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useGame } from '../services/game';
import router from "@/router/index.js";

const { code, generateCode } = useGame();
const pseudo = ref('');
let intervalId = null;

const submitPseudo = () => {
  // Logique pour gérer le pseudo (par exemple, le stocker ou le rediriger vers une autre route)
  console.log(`Pseudo: ${pseudo.value}`);
  router.push('/game');
};

onMounted(() => {
  generateCode();
  intervalId = setInterval(generateCode, 2000); // Générer un nouveau code toutes les 2 secondes
});

onBeforeUnmount(() => {
  clearInterval(intervalId); // Nettoyer l'intervalle en quittant la vue
});
</script>

<template>
  <div class="home">
    <header>
      <h1>Jeu de Code Breaker</h1>
      <h2>{{ code }}</h2>
    </header>
    <p>Règles du jeu : Devinez le code à 4 chiffres uniques en 10 tentatives.</p>
    <form @submit.prevent="submitPseudo">
      <input v-model="pseudo" placeholder="Entrez votre pseudo" required />
      <button type="submit">Jouer</button>
    </form>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

header h1 {
  animation: fadeIn 2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
