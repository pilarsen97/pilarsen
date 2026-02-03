<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="bento-grid"
    :class="[props.class]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: functions.rem(16);
  max-width: 1200px;
  margin: 0 auto;

  @include media.lg-down {
    grid-template-columns: repeat(2, 1fr);
  }

  @include media.sm-down {
    grid-template-columns: 1fr;
  }
}
</style>
