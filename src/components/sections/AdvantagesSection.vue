<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { useAdvantagesData } from '@/composables';

const { title, items } = useAdvantagesData();

const iconNames = [
  'heroicons:puzzle-piece',
  'heroicons:bolt',
  'heroicons:currency-dollar',
  'heroicons:cog-6-tooth',
  'heroicons:lifebuoy',
  'heroicons:chart-bar',
];
</script>

<template>
  <section class="advantages">
    <div class="container">
      <h2 class="advantages__title">
        {{ title }}
      </h2>
      <BentoGrid>
        <BentoGridItem
          v-for="(item, index) in items"
          :key="item.title"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="100 * index"
          :col-span="index === 0 || index === 5 ? 2 : 1"
        >
          <template #icon>
            <Icon :icon="iconNames[index]" />
          </template>
          <template #title>
            {{ item.title }}
          </template>
          <template #description>
            {{ item.description }}
          </template>
          <template v-if="item.highlight" #highlight>
            {{ item.highlight }}
          </template>
        </BentoGridItem>
      </BentoGrid>
    </div>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.advantages {
  padding: functions.rem(80) 0;
  background: linear-gradient(180deg, var(--c-grey-90) 0%, var(--c-grey-100) 100%);

  @include media.md-down {
    padding: functions.rem(48) 0;
  }

  &__title {
    font-size: functions.rem(36);
    font-weight: 700;
    color: var(--c-grey-00);
    text-align: center;
    margin-bottom: functions.rem(48);

    @include media.md-down {
      font-size: functions.rem(28);
      margin-bottom: functions.rem(32);
    }
  }
}
</style>
