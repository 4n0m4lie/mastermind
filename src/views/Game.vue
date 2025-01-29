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
let { code, state, validateAttempt } = useGame();
const currentAttempt = ref('');
const results = ref([]);

const submitAttempt = (value) => {
  const attemptArray = value.split('').map(Number);
  const result = validateAttempt(attemptArray);
  results.value.push({ attempt: currentAttempt.value, ...result });
  if(state.value === 'gagnée' || state.value === 'perdue'){

    localStorage.setItem('score','"' + pseudo.value +'":{ nombreChercher: "'+ code.value +'", state: "' + state.value + '", nbtry: ' + results.value.length + '}');
    console.log(localStorage.getItem('score'))
  }
  currentAttempt.value = ''; // Réinitialiser l'entrée
};

const restartGame = () => {
  results.value = [];
  state.value = 'en cours';
};
</script>

<style scoped>
.game {
  text-align: center;
}
</style>
