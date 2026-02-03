<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import AppButton from '@/components/ui/AppButton.vue';
import { useContactData, useLanguage } from '@/composables';

const { isRussian } = useLanguage();
const { name, title, logo, socials, phone, email, location, vcardText } = useContactData();

// Localized labels
const socialTitle = computed(() => isRussian.value ? 'Соцсети' : 'Social');
const contactTitle = computed(() => isRussian.value ? 'Контакты' : 'Contact');
const emailLabel = computed(() => 'Email:');
const phoneLabel = computed(() => isRussian.value ? 'Телефон:' : 'Phone:');
const locationLabel = computed(() => isRussian.value ? 'Местоположение:' : 'Location:');
const backHomeText = computed(() => isRussian.value ? 'На главную' : 'Back to Home');

function openSocialLink(url: string) {
  window.open(url, '_blank');
}

function generateVCard() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name.value}
TITLE:${title.value}
TEL:${phone}
EMAIL:${email}
ADR:;;;;;;${location.value}
URL:https://pilarsen.dev
END:VCARD`;

  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${name.value}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="me-page">
    <div class="me-page__container">
      <!-- Logo Section -->
      <div class="me-page__logo-section">
        <div class="me-page__logo">
          {{ logo }}
        </div>
        <h1 class="me-page__name">
          {{ name }}
        </h1>
        <p class="me-page__title">
          {{ title }}
        </p>
      </div>

      <!-- Social Buttons -->
      <div class="me-page__social-section">
        <h2 class="me-page__social-title">
          {{ socialTitle }}
        </h2>

        <div class="me-page__social-buttons">
          <AppButton
            v-for="social in socials"
            :key="social.name"
            class="me-page__social-button"
            @click="openSocialLink(social.url)"
          >
            <Icon :icon="social.icon" class="me-page__social-icon" />
            {{ social.name }}
          </AppButton>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="me-page__contact-section">
        <h2 class="me-page__contact-title">
          {{ contactTitle }}
        </h2>

        <div class="me-page__contact-info">
          <div class="me-page__contact-item">
            <span class="me-page__contact-label">
              {{ emailLabel }}
            </span>
            <a
              :href="`mailto:${email}`"
              class="me-page__contact-link"
            >
              {{ email }}
            </a>
          </div>

          <div class="me-page__contact-item">
            <span class="me-page__contact-label">
              {{ phoneLabel }}
            </span>
            <a
              :href="`tel:${phone}`"
              class="me-page__contact-link"
            >
              {{ phone }}
            </a>
          </div>

          <div class="me-page__contact-item">
            <span class="me-page__contact-label">
              {{ locationLabel }}
            </span>
            <span class="me-page__contact-text">
              {{ location }}
            </span>
          </div>
        </div>

        <!-- Add to Contacts Button -->
        <AppButton
          class="me-page__vcard-button"
          @click="generateVCard"
        >
          📱 {{ vcardText }}
        </AppButton>
      </div>

      <!-- Back to Home Button -->
      <div class="me-page__navigation">
        <AppButton
          class="me-page__back-button"
          @click="$router.push('/')"
        >
          ← {{ backHomeText }}
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/functions';
@use '../assets/styles/helpers/media';

.me-page {
  min-height: 100vh;
  background: var(--c-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @include media.sm-down {
    padding: 1rem;
  }

  &__container {
    max-width: 28rem;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--b-radius-lg);
    padding: 3rem 2rem;
    text-align: center;

    @include media.sm-down {
      padding: 2rem 1.5rem;
    }
  }

  &__logo-section {
    margin-bottom: 3rem;
  }

  &__logo {
    font-size: functions.rem(80);
    line-height: 1;
    margin-bottom: 1rem;

    @include media.sm-down {
      font-size: functions.rem(64);
    }
  }

  &__name {
    font-family: var(--f-headings);
    font-size: functions.rem(32);
    font-weight: 700;
    color: var(--c-grey-20);
    margin-bottom: 0.5rem;

    @include media.sm-down {
      font-size: functions.rem(28);
    }
  }

  &__title {
    font-size: functions.rem(18);
    color: var(--c-grey-40);
    font-weight: 400;
  }

  &__social-section {
    margin-bottom: 3rem;
  }

  &__social-title {
    font-family: var(--f-headings);
    font-size: functions.rem(20);
    font-weight: 600;
    color: var(--c-grey-20);
    margin-bottom: 1.5rem;
  }

  &__social-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__social-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: functions.rem(16);
    font-weight: 500;
  }

  &__social-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  &__contact-section {
    margin-bottom: 3rem;
  }

  &__contact-title {
    font-family: var(--f-headings);
    font-size: functions.rem(20);
    font-weight: 600;
    color: var(--c-grey-20);
    margin-bottom: 1.5rem;
  }

  &__contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    text-align: left;
  }

  &__contact-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    @include media.md-up {
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
    }
  }

  &__contact-label {
    font-size: functions.rem(14);
    color: var(--c-grey-40);
    font-weight: 500;
    min-width: 7rem;

    @include media.md-up {
      text-align: right;
    }
  }

  &__contact-link {
    color: var(--c-grey-20);
    text-decoration: none;
    font-size: functions.rem(16);
    transition: color 0.2s ease;

    &:hover {
      color: var(--c-accent);
    }
  }

  &__contact-text {
    color: var(--c-grey-20);
    font-size: functions.rem(16);
  }

  &__vcard-button {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: functions.rem(16);
    font-weight: 500;
    background: var(--c-accent);
    color: var(--c-grey-100);

    &:hover {
      background: var(--c-accent-hover);
    }
  }

  &__navigation {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 2rem;
  }

  &__back-button {
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: functions.rem(16);
    font-weight: 500;
    background: rgba(255, 255, 255, 0.05);
    color: var(--c-grey-20);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
