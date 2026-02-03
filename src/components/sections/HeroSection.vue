<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { SingularityBackground } from '@/components/ui/bg-singularity';
import { BlurReveal } from '@/components/ui/blur-reveal';
import { useHeroData } from '@/composables';

const { greeting, description, socialLinks } = useHeroData();
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

    <!-- Avatar Portal - centered in the singularity -->
    <div class="hero__portal">
      <video
        class="hero__avatar"
        src="/ava-alien.mov"
        autoplay
        loop
        muted
        playsinline
      />
    </div>

    <!-- Content at bottom -->
    <div class="hero__content">
      <BlurReveal :delay="0.2" :duration="0.6">
        <h1 class="hero__title">
          {{ greeting }}
        </h1>
        <p class="hero__description">
          {{ description }}
        </p>
        <div class="hero__socials">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            :title="link.name"
            class="hero__social-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg v-if="link.customIcon" class="hero__social-icon" viewBox="0 0 816 807" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M416.421 804.7C336.328 804.7 299.121 793.046 234.619 746.406C193.569 798.879 64.3527 839.703 58.6623 769.726C58.6623 717.294 46.8241 673.119 33.7682 624.501C17.7781 564.93 0 498.665 0 402.362C0 172.738 189.548 0 414.307 0C639.013 0 815.219 181.137 815.219 404.601C815.219 628.036 633.393 804.706 416.41 804.706L416.421 804.7ZM419.665 198.541C310.311 192.85 224.979 268.245 206.161 386.265C190.563 484.005 218.202 603.094 241.83 609.087C252.986 611.909 281.533 588.963 299.109 571.47C328.066 590.115 361.264 604.573 398.18 606.474C510.456 612.319 609.931 525.014 615.823 413.446C621.722 301.871 531.946 204.391 419.671 198.541H419.665Z" />
            </svg>
            <Icon v-else :icon="link.icon!" />
          </a>
        </div>
      </BlurReveal>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

.hero__portal {
  // Match shader's blackhole center position
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: functions.rem(328);
  height: functions.rem(328);
  z-index: 1;

  //@include media.md-up {
  //  width: functions.rem(200);
  //  height: functions.rem(200);
  //}
  //
  //@include media.lg-up {
  //  width: functions.rem(240);
  //  height: functions.rem(240);
  //}
}

.hero__avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  mask-image: radial-gradient(
    circle,
    black 0%,
    black 50%,
    transparent 70%
  );
}

.hero__content {
  position: absolute;
  bottom: functions.rem(40);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 0 functions.rem(20);

  @include media.md-up {
    bottom: functions.rem(60);
  }
}

.hero__title {
  font-size: functions.rem(32);
  margin-bottom: functions.rem(12);

  @include media.md-up {
    font-size: functions.rem(42);
  }

  @include media.lg-up {
    font-size: functions.rem(48);
  }
}

.hero__description {
  font-size: functions.rem(14);
  opacity: 0.8;
  max-width: functions.rem(450);
  margin-bottom: functions.rem(20);

  @include media.md-up {
    font-size: functions.rem(16);
  }
}

.hero__socials {
  display: flex;
  gap: functions.rem(12);
  justify-content: center;
}

.hero__social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: functions.rem(48);
  height: functions.rem(48);
  border-radius: 50%;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.1) 100%
  );
  color: var(--c-grey-10);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    inset 0 -1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  text-decoration: none;
  font-size: functions.rem(22);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);

    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
}

.hero__social-icon {
  width: functions.rem(22);
  height: functions.rem(22);
}
</style>
