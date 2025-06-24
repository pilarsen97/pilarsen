<script setup lang="ts">
import { ref } from 'vue';
import type { ProjectItem, Language } from '@/composables/usePortfolio';

interface Props {
  project: ProjectItem;
  currentLang: Language;
}

defineProps<Props>();

const cardRef = ref<HTMLElement>();
const isHovered = ref(false);
let animationId: number | null = null;
let lastUpdate = 0;
const throttleDelay = 16; // ~60fps

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return;
  
  const now = Date.now();
  if (now - lastUpdate < throttleDelay) return;
  
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  
  animationId = requestAnimationFrame(() => {
    const card = cardRef.value;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced rotation sensitivity for better performance
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    // Simplified transform without heavy scale3d
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    
    // Update CSS variables less frequently
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    
    lastUpdate = now;
  });
};

const handleMouseEnter = () => {
  isHovered.value = true;
};

const handleMouseLeave = () => {
  isHovered.value = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (cardRef.value) {
    // Simplified default transform
    cardRef.value.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(0px)';
  }
};
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);
  cursor: pointer;
  overflow: hidden;
  height: 420px;
  display: flex;
  flex-direction: column;
  position: relative;
  
  // Add subtle floating animation
  animation: card-float 8s ease-in-out infinite;
  
  // Shine effect
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }
  &:hover {
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
    &::before {
      opacity: 1;
    }
  }

  &__label {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    font-size: functions.rem(10);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 3;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
  }

  &__content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
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
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
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
  }

  &__button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(145deg, 
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.08) 100%
    );
    color: var(--c-grey-10);
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 600;
    font-size: functions.rem(14);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(145deg, 
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.12) 100%
      );
      transform: translateY(-2px);
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

// Add floating animation keyframes
@keyframes card-float {
  0%, 100% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px);
  }
  50% {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(-8px);
  }
}

.project-3d-card {
  @media (max-width: 768px) {
    height: auto;
    min-height: 350px;
    padding: 1.5rem;

    &__title {
      font-size: functions.rem(20);
    }

    &__description {
      font-size: functions.rem(14);
    }
  }
}
</style>