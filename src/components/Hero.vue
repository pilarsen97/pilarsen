<template>
  <section class="hero">
    <div class="hero__left">
      <h1 class="hero__title">
        Летний лагерь
        и интенсивы с IT обучением
      </h1>
      <p class="hero__description">
        Заменяем бесполезное времяпровождение в гаджетах на&nbsp;полезное!
      </p>
      <div class="hero__buttons">
        <button class="hero__button button button--primary">Обратная связь</button>
        <button class="hero__button button button--secondary">Все смены</button>
      </div>
    </div>
    <div class="hero__right">
      <img src="/kubki.gif" alt="" class="hero__img">
    </div>
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
