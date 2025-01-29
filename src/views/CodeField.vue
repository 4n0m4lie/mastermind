vue
<template>
  <div>
    <div class="input-container">
      <input v-on:keyup.enter="submit"
        v-for="(input, index) in inputs"
        :key="index"
        v-model="inputs[index]"
        maxlength="1"
        placeholder="0"
        @input="focusNext(index)"
      ref="inputRefs"
      />
    </div>
    <button @click="submit">Valider</button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  length: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits(['submit']);
const inputs = ref(Array(props.length).fill(''));
const inputRefs = ref([]); // Références pour chaque input

const focusNext = (index) => {
  // Vérifiez si l'index suivant existe et si l'input actuel n'est pas vide
  if (index < inputs.value.length - 1 && inputs.value[index]) {
    inputRefs.value[index + 1].focus(); // Mettre le focus sur l'input suivant
  }
};

const submit = () => {
  emit('submit', inputs.value.join(''));
  inputs.value = Array(props.length).fill(''); // Réinitialiser les inputs
};
</script>

<style scoped>
.input-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.input-container input {
  width: 40px;
  height: 40px;
  text-align: center;
  margin: 0 5px;
}
</style>
