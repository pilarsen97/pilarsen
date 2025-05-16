<template>
    <AppHeader>    
      <Hero title="Летние каникулы с IT обучением" />
    </AppHeader>
    <main>
      <Sessions/>
      <SummerFormats/>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Hero from './components/Hero.vue';
import AppHeader from './components/Header.vue'
import Sessions from './components/Sessions.vue';
import SummerFormats from './components/SummerFormats.vue';
import SummerCard from './components/SummerCard.vue';

export default defineComponent({
  name: 'App',
  components: {
    Hero,
    AppHeader,
    Sessions,
    SummerFormats,
    SummerCard,
  },
});
</script>