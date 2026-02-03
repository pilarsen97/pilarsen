<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

export interface IconCloudProps {
  images: string[];
  size?: number;
}

const props = withDefaults(defineProps<IconCloudProps>(), {
  size: 400,
});

interface CloudIcon {
  x: number;
  y: number;
  z: number;
  img: HTMLImageElement;
  loaded: boolean;
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const icons = ref<CloudIcon[]>([]);
const mouseX = ref(0);
const mouseY = ref(0);
const rotationX = ref(0);
const rotationY = ref(0);
let animationId: number | null = null;

const radius = computed(() => props.size * 0.35);

// Fibonacci sphere distribution
function fibonacci(i: number, n: number): { x: number; y: number; z: number } {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;

  return {
    x: Math.cos(theta) * Math.sin(phi),
    y: Math.sin(theta) * Math.sin(phi),
    z: Math.cos(phi),
  };
}

// Rotate point around X and Y axes
function rotatePoint(
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
): { x: number; y: number; z: number } {
  // Rotate around Y axis
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;

  // Rotate around X axis
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const y2 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  return { x: x1, y: y2, z: z2 };
}

function loadImages() {
  const n = props.images.length;
  icons.value = props.images.map((src, i) => {
    const pos = fibonacci(i, n);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    const icon: CloudIcon = {
      x: pos.x * radius.value,
      y: pos.y * radius.value,
      z: pos.z * radius.value,
      img,
      loaded: false,
    };

    img.onload = () => {
      icon.loaded = true;
    };

    return icon;
  });
}

function render() {
  const canvas = canvasRef.value;
  if (!canvas)
    return;

  const ctx = canvas.getContext('2d');
  if (!ctx)
    return;

  const centerX = props.size / 2;
  const centerY = props.size / 2;

  // Clear canvas
  ctx.clearRect(0, 0, props.size, props.size);

  // Auto-rotate + mouse influence
  rotationY.value += 0.003 + mouseX.value * 0.00005;
  rotationX.value += mouseY.value * 0.00003;

  // Sort icons by z-depth (back to front)
  const sortedIcons = icons.value
    .map((icon) => {
      const rotated = rotatePoint(
        icon.x,
        icon.y,
        icon.z,
        rotationX.value,
        rotationY.value,
      );
      return { ...icon, rx: rotated.x, ry: rotated.y, rz: rotated.z };
    })
    .sort((a, b) => a.rz - b.rz);

  // Draw icons
  for (const icon of sortedIcons) {
    if (!icon.loaded)
      continue;

    // Scale and opacity based on z-depth
    const scale = (icon.rz + radius.value) / (radius.value * 2);
    const size = 24 + scale * 24; // 24-48px
    const opacity = 0.3 + scale * 0.7;

    const screenX = centerX + icon.rx;
    const screenY = centerY + icon.ry;

    ctx.save();
    ctx.globalAlpha = opacity;

    // Draw circular clipped image
    ctx.beginPath();
    ctx.arc(screenX, screenY, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(
      icon.img,
      screenX - size / 2,
      screenY - size / 2,
      size,
      size,
    );

    ctx.restore();
  }

  animationId = requestAnimationFrame(render);
}

function handleMouseMove(e: MouseEvent) {
  const canvas = canvasRef.value;
  if (!canvas)
    return;

  const rect = canvas.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  mouseX.value = e.clientX - centerX;
  mouseY.value = e.clientY - centerY;
}

function handleMouseLeave() {
  mouseX.value = 0;
  mouseY.value = 0;
}

onMounted(() => {
  loadImages();
  animationId = requestAnimationFrame(render);

  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
  <div
    class="icon-cloud"
    @mouseleave="handleMouseLeave"
  >
    <canvas
      ref="canvasRef"
      :width="size"
      :height="size"
      class="icon-cloud__canvas"
    />
  </div>
</template>

<style scoped>
.icon-cloud {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-cloud__canvas {
  cursor: grab;
}

.icon-cloud__canvas:active {
  cursor: grabbing;
}
</style>
