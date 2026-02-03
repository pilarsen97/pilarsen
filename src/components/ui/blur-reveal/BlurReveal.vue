<script setup lang="ts">
import { Motion } from 'motion-v';
import { onMounted, ref, useSlots, watchEffect } from 'vue';

interface Props {
  duration?: number;
  delay?: number;
  blur?: string;
  yOffset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0.75,
  delay: 0.15,
  blur: '12px',
  yOffset: 16,
});

const container = ref(null);
const childElements = ref([]);
const slots = useSlots();

const children = ref<ReturnType<NonNullable<typeof slots.default>>>([]);

onMounted(() => {
  watchEffect(() => {
    children.value = slots.default ? slots.default() : [];
  });
});

function getInitial() {
  return {
    opacity: 0,
    filter: `blur(${props.blur})`,
    y: props.yOffset,
  };
}

function getAnimate() {
  return {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
  };
}
</script>

<template>
  <div ref="container">
    <Motion
      v-for="(child, index) in children"
      :key="index"
      ref="childElements"
      as="div"
      :initial="getInitial()"
      :while-in-view="getAnimate()"
      :transition="{
        duration: props.duration,
        ease: 'easeOut',
        delay: props.delay * index,
      }"
    >
      <component :is="child" />
    </Motion>
  </div>
</template>
