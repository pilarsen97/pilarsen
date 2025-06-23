<script setup lang="ts">
import { ref } from 'vue';

const navigation = ref([
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]);
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <div class="header__logo">
          <h2 class="logo">
            Vue Starter
          </h2>
        </div>
        <nav class="header__nav">
          <ul class="nav-list">
            <li v-for="item in navigation" :key="item.name" class="nav-list__item">
              <a :href="item.href" class="nav-list__link">{{ item.name }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
// Component styles are handled in separate SCSS files
// This follows the project's SCSS architecture
</style>
