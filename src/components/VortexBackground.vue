<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Props {
  className?: string;
  particleCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: 200,
});

const canvasRef = ref<HTMLCanvasElement>();

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas)
    return;

  const ctx = canvas.getContext('2d');
  if (!ctx)
    return;

  let animationId: number;

  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Vortex particles - streaking lines like in Inspira UI
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    hue: number;
    alpha: number;
    life: number;
    maxLife: number;
  }> = [];

  const createParticle = () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.5 + 0.3; // Even slower speed
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: Math.random() * 12 + 6,
      hue: Math.random() * 60 + 240, // Blue to purple
      alpha: Math.random() * 0.4 + 0.1, // More transparent
      life: 0,
      maxLife: Math.random() * 200 + 150, // Even longer life for very smooth trails
    };
  };

  // Initialize particles
  for (let i = 0; i < props.particleCount; i++) {
    particles.push(createParticle());
  }

  const animate = () => {
    // Create more transparent trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.life++;

      const prevX = particle.x;
      const prevY = particle.y;

      particle.x += particle.vx;
      particle.y += particle.vy;

      // Fade out over time with more transparency
      const lifeFactor = 1 - (particle.life / particle.maxLife);

      // Calculate distance-based fade near borders
      const fadeDistance = 100; // Distance from border to start fading
      const xFade = Math.min(
        particle.x / fadeDistance,
        (canvas.width - particle.x) / fadeDistance,
      );
      const yFade = Math.min(
        particle.y / fadeDistance,
        (canvas.height - particle.y) / fadeDistance,
      );
      const borderFade = Math.min(xFade, yFade, 1);

      particle.alpha = lifeFactor * 0.4 * borderFade; // Apply border fade

      if (particle.alpha > 0) {
        // Draw streaking line
        ctx.save();

        const gradient = ctx.createLinearGradient(
          prevX,
          prevY,
          particle.x - particle.vx * particle.length,
          particle.y - particle.vy * particle.length,
        );

        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 80%, ${particle.alpha})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 80%, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5; // Thinner lines
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
          particle.x - particle.vx * particle.length,
          particle.y - particle.vy * particle.length,
        );
        ctx.stroke();

        ctx.restore();
      }

      // Reset particle when it dies or goes off screen
      if (particle.life >= particle.maxLife
        || particle.x < -100 || particle.x > canvas.width + 100
        || particle.y < -100 || particle.y > canvas.height + 100) {
        particles[index] = createParticle();
      }
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();

  // Cleanup on unmount
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', resizeCanvas);
  };
});
</script>

<template>
  <div class="vortex-background" :class="className">
    <!-- Animated particle canvas -->
    <canvas
      ref="canvasRef"
      class="vortex-background__canvas"
    />

    <!-- Aurora gradients -->
    <div class="vortex-background__aurora vortex-background__aurora--1" />
    <div class="vortex-background__aurora vortex-background__aurora--2" />
    <div class="vortex-background__aurora vortex-background__aurora--3" />

    <!-- Content slot -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/helpers/functions';

.vortex-background {
  position: relative;
  overflow: hidden;
  background: #000;

  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &__aurora {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    z-index: 1;
    animation: aurora-float ease-in-out infinite;

    &--1 {
      width: 300px;
      height: 300px;
      background: radial-gradient(
        circle,
        rgba(138, 43, 226, 0.4) 0%,
        rgba(75, 0, 130, 0.3) 50%,
        transparent 100%
      );
      top: 20%;
      left: 10%;
      animation-duration: 8s;
      animation-delay: 0s;
    }

    &--2 {
      width: 400px;
      height: 400px;
      background: radial-gradient(
        circle,
        rgba(65, 105, 225, 0.4) 0%,
        rgba(30, 144, 255, 0.3) 50%,
        transparent 100%
      );
      top: 50%;
      right: 15%;
      animation-duration: 12s;
      animation-delay: -4s;
    }

    &--3 {
      width: 250px;
      height: 250px;
      background: radial-gradient(
        circle,
        rgba(147, 112, 219, 0.4) 0%,
        rgba(186, 85, 211, 0.3) 50%,
        transparent 100%
      );
      bottom: 20%;
      left: 30%;
      animation-duration: 10s;
      animation-delay: -2s;
    }
  }

  // Content should be above the aurora effect
  > :not(.vortex-background__canvas):not(.vortex-background__aurora) {
    position: relative;
    z-index: 2;
  }
}

@keyframes aurora-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  25% {
    transform: translate(30px, -20px) scale(1.1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-20px, 30px) scale(0.9);
    opacity: 0.4;
  }
  75% {
    transform: translate(20px, 10px) scale(1.05);
    opacity: 0.7;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .vortex-background {
    &__aurora {
      &--1 {
        width: 200px;
        height: 200px;
      }

      &--2 {
        width: 250px;
        height: 250px;
      }

      &--3 {
        width: 180px;
        height: 180px;
      }
    }
  }
}

// Performance optimization
@media (prefers-reduced-motion: reduce) {
  .vortex-background {
    &__aurora {
      animation: none;
    }

    &__canvas {
      display: none;
    }
  }
}
</style>
