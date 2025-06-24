<script setup lang="ts">
interface Props {
  className?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="lamp-effect" :class="className">
    <!-- Lamp beam -->
    <div class="lamp-effect__beam" />

    <!-- Lamp glow -->
    <div class="lamp-effect__glow" />

    <!-- Content slot -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/helpers/functions';

.lamp-effect {
  position: relative;
  overflow: hidden;

  &__beam {
    position: absolute;
    top: -50%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 250px solid transparent;
    border-right: 250px solid transparent;
    border-top: 300px solid rgba(255, 255, 255, 0.12);
    filter: blur(25px);
    z-index: 1;

    &::before {
      content: '';
      position: absolute;
      top: -300px;
      left: -150px;
      width: 0;
      height: 0;
      border-left: 150px solid transparent;
      border-right: 150px solid transparent;
      border-top: 200px solid rgba(255, 255, 255, 0.08);
      filter: blur(40px);
    }
  }

  &__glow {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    height: 500px;
    background: radial-gradient(
      ellipse 40vw 250px at center top,
      rgba(255, 255, 255, 0.35) 0%,
      rgba(255, 255, 255, 0.15) 40%,
      rgba(255, 255, 255, 0.05) 60%,
      transparent 80%
    );
    filter: blur(50px);
    z-index: 1;
    animation: lamp-flicker 4s ease-in-out infinite;

    @media (max-width: 768px) {
      width: 600px;
      background: radial-gradient(
        ellipse 300px 250px at center top,
        rgba(255, 255, 255, 0.35) 0%,
        rgba(255, 255, 255, 0.15) 40%,
        rgba(255, 255, 255, 0.05) 60%,
        transparent 80%
      );
    }
  }

  // Content should be above the lamp effect
  > :not(.lamp-effect__beam):not(.lamp-effect__glow) {
    position: relative;
    z-index: 2;
  }
}

@keyframes lamp-flicker {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  25% {
    opacity: 0.8;
    transform: translateX(-50%) scale(1.05);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(0.95);
  }
  75% {
    opacity: 0.9;
    transform: translateX(-50%) scale(1.02);
  }
}

// Dark theme adjustments
.dark-theme .lamp-effect {
  &__beam {
    border-top-color: rgba(255, 255, 255, 0.12);

    &::before {
      border-top-color: rgba(255, 255, 255, 0.08);
    }
  }

  &__glow {
    background: radial-gradient(
      ellipse 400px 250px at center top,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0.12) 30%,
      rgba(255, 255, 255, 0.06) 50%,
      transparent 70%
    );
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .lamp-effect {
    &__beam {
      border-left-width: 180px;
      border-right-width: 180px;
      border-top-width: 220px;

      &::before {
        left: -100px;
        border-left-width: 100px;
        border-right-width: 100px;
        border-top-width: 150px;
      }
    }

    &__glow {
      width: 600px;
      height: 400px;
    }
  }
}
</style>
