<script setup lang="ts">

</script>

<template>

  <header class="header container">
      <div class="header__top">
        <nav class="header__menu">
          <ol class="header__list">
            <li class="header__item">
              <a href="#" class="header__link">Программы</a>
            </li>
            <li class="header__item">
              <a href="#" class="header__link">Форматы обучения</a>
            </li>
            <li class="header__item">
              <a href="#" class="header__link">Эксперты</a>
            </li>
            <li class="header__item">
              <a href="#" class="header__link">Контакты</a>
            </li>
          </ol>
        </nav>
        <button class="header__button button button--primary">Связаться с нами</button>
        
        <div class="burger-menu">
          <img src="/burder-menu.png" alt="burber-menu">
        </div>
      </div>
    <slot class="Hero"></slot>
  </header>
 
</template>

<style scoped lang="scss">

</style>

