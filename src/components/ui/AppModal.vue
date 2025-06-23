<script setup lang="ts">
import { computed, watch } from 'vue';

interface Props {
  modelValue: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  closeOnBackdrop?: boolean;
  scrollable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnBackdrop: true,
  scrollable: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'close': [];
}>();

const dialogClasses = computed(() => [
  `app-modal__dialog--${props.size}`,
  {
    'app-modal__dialog--scrollable': props.scrollable,
  },
]);

function handleClose() {
  emit('update:modelValue', false);
  emit('close');
}

function handleBackdropClick(event: Event) {
  if (props.closeOnBackdrop && event.target === event.currentTarget) {
    handleClose();
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  }
  else {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="app-modal" @click="handleBackdropClick">
        <div class="app-modal__dialog" :class="dialogClasses">
          <div class="app-modal__content">
            <div v-if="$slots.header || title" class="app-modal__header">
              <slot name="header">
                <h2 v-if="title" class="app-modal__title">
                  {{ title }}
                </h2>
              </slot>
              <button
                v-if="closable"
                class="app-modal__close"
                type="button"
                @click="handleClose"
              >
                <i class="icon-cancel" />
              </button>
            </div>

            <div class="app-modal__body">
              <slot />
            </div>

            <div v-if="$slots.footer" class="app-modal__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/mixins';
@use '@/assets/styles/helpers/media';

.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-top);
  @include mixins.flex-center;
  padding: 1rem;

  &__dialog {
    background: var(--c-grey-00);
    border-radius: var(--b-radius-lg);
    width: 100%;
    max-height: 90vh;
    @include mixins.card-shadow(3);

    &--sm {
      max-width: 400px;
    }

    &--md {
      max-width: 600px;
    }

    &--lg {
      max-width: 800px;
    }

    &--xl {
      max-width: 1200px;
    }

    &--full {
      max-width: 95vw;
      max-height: 95vh;
    }

    &--scrollable {
      display: flex;
      flex-direction: column;

      .app-modal__body {
        overflow-y: auto;
        flex: 1;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__header {
    @include mixins.flex-between;
    padding: 1.5rem 1.5rem 0;
    border-bottom: 1px solid var(--c-grey-20);
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }

  &__title {
    @include mixins.heading-base;
    font-size: functions.rem(24);
    margin: 0;
    color: var(--c-grey-90);
  }

  &__close {
    @include mixins.button-reset;
    @include mixins.flex-center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--b-radius-sm);
    color: var(--c-grey-60);
    @include mixins.smooth-hover;

    &:hover {
      background: var(--c-grey-20);
      color: var(--c-grey-90);
    }

    i {
      font-size: functions.rem(16);
    }
  }

  &__body {
    padding: 0 1.5rem;
    flex: 1;
  }

  &__footer {
    padding: 1.5rem;
    border-top: 1px solid var(--c-grey-20);
    @include mixins.flex-between;
    gap: 1rem;
    margin-top: 1.5rem;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s var(--animation-fade-in-curve);

  .app-modal__dialog {
    transition: transform 0.3s var(--animation-fade-in-curve);
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .app-modal__dialog {
    transform: scale(0.9) translateY(-20px);
  }
}
</style>
