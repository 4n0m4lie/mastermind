// services/game.js
import { ref } from 'vue';

export function useGame() {
  const code = ref('');
  const attempts = ref([]);
  const state = ref('en cours'); // 'en cours', 'gagnée', 'perdue'
  const maxAttempts = 10;

  const generateCode = () => {
    const digits = [];
    while (digits.length < 4) {
      const randomDigit = Math.floor(Math.random() * 10);
      if (!digits.includes(randomDigit)) {
        digits.push(randomDigit);
      }
    }
    code.value = digits.join(''); // Stocker le code sous forme de chaîne
  };

  const validateAttempt = (attempt) => {
    const correctPosition = attempt.filter((digit, index) => digit === code.value[index]).length;
    const correctDigits = attempt.filter(digit => code.value.includes(digit)).length;
    const wrongPosition = correctDigits - correctPosition;


    console.log(code);

    attempts.value.push(attempt);

    if (correctPosition === 4) {
      state.value = 'gagnée';
    } else if (attempts.value.length >= maxAttempts) {
      state.value = 'perdue';
    }

    return {
      correctPosition,
      wrongPosition,
    };
  };

  // Initialiser le code lorsque le composable est utilisé
  generateCode();

  return { code, attempts, state, validateAttempt, generateCode };
}
