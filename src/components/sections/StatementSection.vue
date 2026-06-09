<script setup lang="ts">
import ScrollReveal from '@/components/ui/ScrollReveal.vue';
import { useStatementData } from '@/composables';

const { lead, body, signoff } = useStatementData();
</script>

<template>
  <section class="statement">
    <div class="statement__glow" aria-hidden="true" />
    <div class="container statement__inner">
      <p class="statement__lead">
        {{ lead }}
      </p>
      <ScrollReveal :text="body" :stagger="0.05" class="statement__body" />
      <p class="statement__signoff">
        {{ signoff }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.statement {
  position: relative;
  padding: functions.rem(140) 0;
  background: var(--c-section-dark);
  overflow: hidden;
  isolation: isolate;

  @include media.md-down {
    padding: functions.rem(88) 0;
  }

  &__glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: functions.rem(720);
    height: functions.rem(420);
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(ellipse at center, rgba(var(--c-violet-rgb), 0.16), transparent 70%);
    filter: blur(40px);
  }

  &__inner {
    position: relative;
    max-width: functions.rem(960);
    text-align: center;
  }

  &__lead {
    font-family: var(--f-section-title);
    font-size: functions.rem(40);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 functions.rem(20);
    background: linear-gradient(
      100deg,
      var(--c-violet-300) 0%,
      var(--c-violet-500) 50%,
      var(--c-violet-300) 100%
    );
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 40px rgba(var(--c-violet-rgb), 0.35);

    @include media.md-up {
      font-size: functions.rem(56);
    }

    @include media.lg-up {
      font-size: functions.rem(64);
    }
  }

  &__body {
    font-family: var(--f-section-title);
    font-size: functions.rem(24);
    line-height: 1.4;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--c-grey-00);

    @include media.md-up {
      font-size: functions.rem(34);
    }

    @include media.lg-up {
      font-size: functions.rem(40);
    }
  }

  &__signoff {
    margin: functions.rem(28) 0 0;
    font-size: functions.rem(13);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: functions.rem(3);
    color: rgba(var(--c-white-rgb), 0.5);
  }
}
</style>
