
<template>
  <section class="summer-card">
    <div class="summer-card__container container">
        <div class="summer-card__wrapper">
            <span class="summer-card__date">{{ date }}</span>
            <br>
            <h3 class="summer-card__title">{{ title }}</h3>
            <img :src="image" class="summer-card__image"/>
            <p class="summer-card__description">{{ description }}</p>
            <button class="summer-card__button">
              Оставить заявку
            </button>
        </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  date: string
  title: string
  description: string
  image: string
}>()
</script>