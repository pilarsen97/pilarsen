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

.work-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  width: functions.rem(280);
  padding: functions.rem(20);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: functions.rem(16);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  min-height: functions.rem(140);

  @include media.md-down {
    width: functions.rem(240);
    padding: functions.rem(16);
    min-height: functions.rem(120);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: functions.rem(15);
    font-weight: 600;
    color: var(--c-grey-00);
    margin-bottom: functions.rem(6);
    display: flex;
    align-items: center;
    gap: functions.rem(6);
    transition: color 0.3s ease;

    .work-card:hover & {
      color: var(--c-primary, #6366f1);
    }
  }

  &__link-icon {
    width: functions.rem(14);
    height: functions.rem(14);
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.3s ease;

    .work-card:hover & {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &__description {
    font-size: functions.rem(12);
    line-height: 1.5;
    color: var(--c-grey-40);
    margin: 0 0 functions.rem(10);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: functions.rem(4);
  }

  &__tag {
    padding: functions.rem(2) functions.rem(6);
    background: rgba(255, 255, 255, 0.06);
    border-radius: functions.rem(4);
    font-size: functions.rem(10);
    color: var(--c-grey-30);
    transition: all 0.3s ease;

    .work-card:hover & {
      background: rgba(99, 102, 241, 0.15);
      color: var(--c-grey-10);
    }
  }

  &__badge {
    position: absolute;
    top: functions.rem(10);
    right: functions.rem(10);
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    padding: functions.rem(2) functions.rem(6);
    border-radius: functions.rem(8);
    font-size: functions.rem(9);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
    z-index: 2;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: functions.rem(36);
    height: functions.rem(36);
    margin-bottom: functions.rem(12);
    background: rgba(99, 102, 241, 0.1);
    border-radius: functions.rem(10);
    color: var(--c-primary, #6366f1);
    transition: all 0.3s ease;

    svg {
      width: functions.rem(20);
      height: functions.rem(20);
    }

    .work-card:hover & {
      background: rgba(99, 102, 241, 0.2);
      transform: scale(1.05);
    }
  }
}
</style>
