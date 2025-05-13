<template>
  <div>
    <Hero title="Летние каникулы с IT обучением" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hero from './components/Hero.vue';

export default defineComponent({
  name: 'App',
  components: {
    Hero,
  },
});
</script>