// services/game.js
import { ref } from 'vue';

export function useGame() {
  const code = ref('');

  const generateCode = () => {
    const digits = [];
    while (digits.length < 4) {
      const randomDigit = Math.floor(Math.random() * 10);
      if (!digits.includes(randomDigit)) {
        digits.push(randomDigit);
      }
    }
    code.value = digits.join(' ');
  };

  return { code, generateCode };
}
