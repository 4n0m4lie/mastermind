vue
<template>
  <div class="game">
    <h1>Bienvenue {{ pseudo }}</h1>
    <div v-if="state === 'en cours'">
      <code-field :length="4" v-model="currentAttempt" @submit="submitAttempt" />
      <div v-for="(result, index) in results" :key="index">
        <p>Essai {{ index + 1 }}: {{ result.attempt }} - Bien placés: {{ result.correctPosition }}, Mal placés: {{ result.wrongPosition }}</p>
      </div>
    </div>
    <div v-else>
      <p v-if="state === 'gagnée'">Bravo {{ pseudo }}! Vous avez gagné!</p>
      <p v-else>Vous avez perdu, {{ pseudo }}. Le code était: {{ code }}</p>
      <button @click="restartGame">Recommencer une nouvelle partie</button>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useGame } from '../services/game';
import CodeField from './CodeField.vue'; // Importer le composant CodeField

const pseudo = inject('pseudo');
const { code, state, validateAttempt } = useGame();
const currentAttempt = ref('');
const results = ref([]);

const submitAttempt = () => {
  const attemptArray = currentAttempt.value.split('').map(Number);
  const result = validateAttempt(attemptArray);
  results.value.push({ attempt: currentAttempt.value, ...result });
  currentAttempt.value = ''; // Réinitialiser l'entrée
};

const restartGame = () => {
  // Logique pour redémarrer le jeu
  results.value = [];
  state.value = 'en cours';
};
</script>

<style scoped>
.game {
  text-align: center;
}
</style>
