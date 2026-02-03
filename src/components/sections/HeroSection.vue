<script setup lang="ts">
import { SingularityBackground } from '@/components/ui/bg-singularity';
import { useHeroData } from '@/composables';

const { greeting, description, viewWorkText, contactText } = useHeroData();
</script>

<template>
  <section class="hero">
    <SingularityBackground
      :speed="0.8"
      :brightness="0.9"
      :saturation="1.2"
      :mouse-sensitivity="0.3"
      :damping="0.95"
    />

    <div class="container">
      <div class="hero__content">
        <h1
          v-motion
          class="hero__title"
          :data-text="greeting"
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="200"
        >
          {{ greeting }}
        </h1>
        <p
          v-motion
          class="hero__description"
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="400"
        >
          {{ description }}
        </p>
        <div
          v-motion
          class="hero__actions"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="600"
        >
          <a href="#projects" class="button button--primary">
            {{ viewWorkText }}
          </a>
          <a href="#contact" class="button button--secondary">
            {{ contactText }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}
</style>
