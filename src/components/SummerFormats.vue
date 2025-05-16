<script setup lang="ts">

import SummerCard from './SummerCard.vue';


const formats = [
  {
    date: '1 месяц — 1 раз в неделю',
    title: 'Интенсив',
    description:
      'Резиденты записываются на определённую тему. Занятия проходят 1 раз в неделю. Длительность — 2 астрономических часа с перерывом и перекусом. Можно записаться одновременно на несколько потоков.',
    image: '/formats-img-1.svg',
  },
  {
    date: '1 неделя — с ПН по ПТ',
    title: 'Лагерь',
    description:
      'Резиденты записываются на определённую смену. Смена длится 5 дней подряд с понедельника по пятницу. Сбор на локации с 9:00. В стоимость включено 3-разовое питание, развлекательные программы и трансфер.',
    image: '/formats-img-2.svg', 
  },
]
</script>

<template>
  <section class="summer-formats container">
    <h2 class="summer-formats__title">
      Форматы летнего обучения
    </h2>

    <div class="summer-formats__grid">
      <SummerCard
        v-for="(format, index) in formats"
        :key="index"
        v-bind="format"
      />
    </div>
  </section>
</template>

