<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import { Marquee } from '@/components/ui/marquee';
import { useWorksData } from '@/composables';

const { title, subtitle, viewAllText, items } = useWorksData();

// Split items into two rows for the marquee
const firstRow = computed(() => items.value.slice(0, Math.ceil(items.value.length / 2)));
const secondRow = computed(() => items.value.slice(Math.ceil(items.value.length / 2)));
</script>

<template>
  <section class="works">
    <div class="container">
      <div class="works__header">
        <h2 class="works__title">
          {{ title }}
        </h2>
        <p class="works__subtitle">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="works__marquee">
      <Marquee :pause-on-hover="true" duration="60s" gap="1rem">
        <a
          v-for="work in firstRow"
          :key="work.title"
          class="work-card"
          :href="work.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div v-if="work.isAWStudio" class="work-card__badge">A&W</div>
          <div class="work-card__icon">
            <Icon :icon="work.icon || 'lucide:globe'" />
          </div>
          <div class="work-card__content">
            <h3 class="work-card__title">
              {{ work.title }}
              <Icon icon="heroicons:arrow-top-right-on-square" class="work-card__link-icon" />
            </h3>
            <p class="work-card__description">
              {{ work.description }}
            </p>
          </div>
          <div class="work-card__tags">
            <span v-for="tag in work.tags" :key="tag" class="work-card__tag">
              {{ tag }}
            </span>
          </div>
        </a>
      </Marquee>

      <Marquee :pause-on-hover="true" :reverse="true" duration="60s" gap="1rem">
        <a
          v-for="work in secondRow"
          :key="work.title"
          class="work-card"
          :href="work.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div v-if="work.isAWStudio" class="work-card__badge">A&W</div>
          <div class="work-card__icon">
            <Icon :icon="work.icon || 'lucide:globe'" />
          </div>
          <div class="work-card__content">
            <h3 class="work-card__title">
              {{ work.title }}
              <Icon icon="heroicons:arrow-top-right-on-square" class="work-card__link-icon" />
            </h3>
            <p class="work-card__description">
              {{ work.description }}
            </p>
          </div>
          <div class="work-card__tags">
            <span v-for="tag in work.tags" :key="tag" class="work-card__tag">
              {{ tag }}
            </span>
          </div>
        </a>
      </Marquee>
    </div>

    <div class="works__footer">
      <AppButton variant="outline-primary" to="/works">
        {{ viewAllText }}
      </AppButton>
    </div>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.works {
  padding: functions.rem(80) 0;
  background: var(--c-grey-100);
  overflow: hidden;

  @include media.md-down {
    padding: functions.rem(48) 0;
  }

  &__header {
    text-align: center;
    margin-bottom: functions.rem(48);

    @include media.md-down {
      margin-bottom: functions.rem(32);
    }
  }

  &__title {
    font-family: var(--f-section-title);
    font-size: functions.rem(36);
    font-weight: 700;
    color: var(--c-grey-00);
    margin-bottom: functions.rem(12);

    @include media.md-down {
      font-size: functions.rem(28);
    }
  }

  &__subtitle {
    font-size: functions.rem(18);
    color: var(--c-grey-40);
    margin: 0;

    @include media.md-down {
      font-size: functions.rem(16);
    }
  }

  &__marquee {
    display: flex;
    flex-direction: column;
    gap: functions.rem(16);
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-top: functions.rem(40);

    @include media.md-down {
      margin-top: functions.rem(28);
    }
  }
}
</style>
