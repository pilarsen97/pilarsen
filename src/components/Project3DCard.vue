<script setup lang="ts">
import type { Language, ProjectItem } from '@/composables/usePortfolio';
import { ref } from 'vue';

interface Props {
  project: ProjectItem;
  currentLang: Language;
}

interface Emits {
  showDetails: [project: ProjectItem];
}

defineProps<Props>();
defineEmits<Emits>();

const cardRef = ref<HTMLElement>();
const isHovered = ref(false);

function handleMouseMove(e: MouseEvent) {
  if (!cardRef.value)
    return;

  const card = cardRef.value;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Simple rotation calculation
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  // Disable transition for smooth tracking
  card.style.transition = 'none';

  // Apply simple transform
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

  // Update CSS variables
  card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
  card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
}

function handleMouseEnter() {
  isHovered.value = true;
}

function handleMouseLeave() {
  isHovered.value = false;
  if (cardRef.value) {
    cardRef.value.style.transition = 'transform 0.3s ease-out';
    cardRef.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    cardRef.value.style.setProperty('--mouse-x', '50%');
    cardRef.value.style.setProperty('--mouse-y', '50%');
  }
}
</script>

<template>
  <div
    ref="cardRef"
    class="project-3d-card"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- A&W Studio Label -->
    <div v-if="project.isAWStudio" class="project-3d-card__label">
      A&W
    </div>

    <!-- Card Content -->
    <div class="project-3d-card__content">
      <!-- Logo/Image -->
      <div class="project-3d-card__logo">
        <span class="project-3d-card__logo-icon">{{ project.logo }}</span>
      </div>

      <!-- Company Name -->
      <div class="project-3d-card__company">
        {{ project.company }}
      </div>

      <!-- Project Name -->
      <h3 class="project-3d-card__title">
        {{ project.name }}
      </h3>

      <!-- Description -->
      <p class="project-3d-card__description">
        {{ project.description[currentLang] }}
      </p>

      <!-- Tech Stack -->
      <div class="project-3d-card__tags">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="project-3d-card__tag"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Details Button -->
      <div class="project-3d-card__footer">
        <a
          :href="project.detailsLink"
          class="project-3d-card__button"
          @click.prevent="$emit('showDetails', project)"
        >
          <span>{{ currentLang === 'ru' ? 'Подробнее' : 'View Details' }}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/helpers/functions';

.project-3d-card {
  position: relative;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px);
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  will-change: transform;
  transition: transform 0.1s ease-out;

  // Enhanced floating animation with 3D depth (disabled for stability)
  // animation: card-float-3d 8s ease-in-out infinite;

  // Enhanced shine effect with 3D awareness
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.05) 60%,
      transparent 100%
    );
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 1;
    transform: translateZ(1px); // Slight depth for shine effect
  }

  // 3D depth shadow effect
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      calc(var(--rotation-y, 0deg) + 45deg),
      rgba(255, 255, 255, 0.1) 0%,
      transparent 30%,
      transparent 70%,
      rgba(0, 0, 0, 0.1) 100%
    );
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.25),
      0 10px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 0.6;
    }
  }

  &__label {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 16px;
    font-size: functions.rem(12);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.3);
    z-index: 3;
  }

  &__content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    transform: translateZ(10px); // Add depth to content
    transition: transform 0.3s ease;
    min-height: 0; // Allow flex shrinking
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 100%
    );
    border-radius: 16px;
    margin-bottom: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transform: translateZ(15px); // Add depth to logo
    transition: transform 0.3s ease;

    &-icon {
      font-size: 2rem;
      line-height: 1;
    }
  }

  &__company {
    color: var(--c-grey-40);
    font-size: functions.rem(14);
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__title {
    font-family: var(--f-headings);
    font-size: functions.rem(24);
    font-weight: 700;
    color: var(--c-grey-10);
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  &__description {
    color: var(--c-grey-20);
    font-size: functions.rem(16);
    line-height: 1.5;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    flex: 1;
    min-height: 0; // Allow flex shrinking
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    flex-shrink: 0; // Prevent tags from shrinking
  }

  &__tag {
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 100%
    );
    color: var(--c-grey-20);
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: functions.rem(12);
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
  }

  &__footer {
    margin-top: auto;
    flex-shrink: 0; // Prevent footer from shrinking
  }

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: linear-gradient(145deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 100%
    );
    color: var(--c-grey-10);
    padding: 0.75rem 1.25rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: functions.rem(14);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    transform: translateZ(20px); // Add depth to button
    transition: all 0.3s ease;
    white-space: nowrap;
    min-width: fit-content;

    &:hover {
      background: linear-gradient(145deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.12) 100%
      );
      transform: translateZ(25px) translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    svg {
      transition: transform 0.3s ease;
    }

    &:hover svg {
      transform: translate(2px, -2px);
    }
  }

}

// Enhanced 3D floating animation keyframes
@keyframes card-float-3d {
  0%, 100% {
    transform: perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1) translateY(0px);
  }
  25% {
    transform: perspective(1200px) rotateX(1deg) rotateY(-0.5deg) translateZ(2px) scale(1) translateY(-4px);
  }
  50% {
    transform: perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(4px) scale(1) translateY(-8px);
  }
  75% {
    transform: perspective(1200px) rotateX(-1deg) rotateY(0.5deg) translateZ(2px) scale(1) translateY(-4px);
  }
}

// Mobile-specific improvements
@media (max-width: 768px) {
  .project-3d-card {
    height: auto;
    padding: 1.5rem;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.3);
    transform: none !important; // Disable 3D effects on mobile
    animation: none; // Disable floating animation
    will-change: auto; // Disable GPU acceleration optimizations

    // Stronger mobile background for better contrast
    backdrop-filter: blur(15px) saturate(150%);
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);

    &::before,
    &::after {
      display: none; // Disable shine and depth effects on mobile
    }

    // Disable 3D transforms for child elements
    &__content,
    &__logo,
    &__button {
      transform: none !important;
    }

    &__label {
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.35rem 0.8rem;
      font-size: functions.rem(11);
    }

    &__logo {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      margin-bottom: 0.75rem;
    }

    &__company {
      font-size: functions.rem(12);
      margin-bottom: 0.4rem;
      color: var(--c-grey-30) !important;
    }

    &__title {
      font-size: functions.rem(20) !important;
      margin-bottom: 0.75rem;
      color: var(--c-grey-00) !important; // Force white color on mobile
    }

    &__description {
      font-size: functions.rem(14);
      margin-bottom: 1rem;
      color: var(--c-grey-10) !important; // Better contrast on mobile
      opacity: 1;
    }

    &__tags {
      margin-bottom: 1rem;
      gap: 0.4rem;
    }

    &__tag {
      padding: 0.25rem 0.6rem;
      font-size: functions.rem(11);
      background: linear-gradient(145deg,
        rgba(255, 255, 255, 0.15) 0%,
        rgba(255, 255, 255, 0.08) 100%
      );
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--c-grey-10) !important;
    }

    &__button {
      padding: 0.65rem 1rem !important;
      font-size: functions.rem(12) !important;
      background: linear-gradient(145deg,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.15) 100%
      ) !important;
      border: 1px solid rgba(255, 255, 255, 0.4) !important;
      color: var(--c-grey-00) !important; // Force white color on mobile
      gap: 0.5rem !important;
      white-space: nowrap !important;
      min-width: fit-content !important;

      &:hover {
        transform: none; // Disable hover transform on mobile
        color: var(--c-grey-00) !important;
      }
    }
  }
}
</style>
