<template>
  <section class="hero">
    <h1>{{ title }}</h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Hero',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
