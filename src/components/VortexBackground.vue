<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
  className?: string;
  particleCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  particleCount: window.innerWidth < 768 ? 50 : 100, // Reduced from 200 for performance
});

const canvasRef = ref<HTMLCanvasElement>();
const isVisible = ref(true);
const observer = ref<IntersectionObserver>();

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas)
    return;

  const ctx = canvas.getContext('2d');
  if (!ctx)
    return;

  let animationId: number;

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
      x: Math.random() * (canvas?.width || 800),
      y: Math.random() * (canvas?.height || 600),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      length: Math.random() * 12 + 6,
      hue: Math.random() * 60 + 240, // Blue to purple
      alpha: Math.random() * 0.4 + 0.1, // More transparent
      life: 0,
      maxLife: Math.random() * 200 + 150, // Even longer life for very smooth trails
    };
  };

  // Animation function declaration (hoisted)
  function animate() {
    // Only animate if visible for performance
    if (!isVisible.value || !ctx || !canvas) {
      return;
    }

    // Use requestIdleCallback for better performance when available
    const performAnimation = () => {
      if (!ctx || !canvas)
        return;

      // Create more transparent trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position with smooth motion
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Wrap around edges for continuous flow
        if (particle.x < 0)
          particle.x = canvas?.width || 800;
        if (particle.x > (canvas?.width || 800))
          particle.x = 0;
        if (particle.y < 0)
          particle.y = canvas?.height || 600;
        if (particle.y > (canvas?.height || 600))
          particle.y = 0;

        // Calculate fade based on life
        const lifeFade = 1 - (particle.life / particle.maxLife);
        const currentAlpha = particle.alpha * lifeFade;

        // Draw streaking particle
        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${currentAlpha})`;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(
          particle.x - particle.vx * particle.length,
          particle.y - particle.vy * particle.length,
        );
        ctx.stroke();
        ctx.restore();

        // Reset particle when it dies
        if (particle.life >= particle.maxLife) {
          particles[index] = createParticle();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    // Use requestIdleCallback when available for better performance
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(performAnimation);
    }
    else {
      performAnimation();
    }
  }

  // Intersection Observer for performance optimization
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isVisible.value = entry.isIntersecting;
      if (!entry.isIntersecting && animationId) {
        cancelAnimationFrame(animationId);
      }
      else if (entry.isIntersecting) {
        animate();
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '100px', // Start animation when element is near viewport
  });

  observer.value.observe(canvas);

  const resizeCanvas = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Initialize particles
  for (let i = 0; i < props.particleCount; i++) {
    particles.push(createParticle());
  }

  animate();

  // Cleanup on unmount
  return () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    window.removeEventListener('resize', resizeCanvas);
    if (observer.value) {
      observer.value.disconnect();
    }
  };
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <div class="vortex-background" :class="className">
    <canvas
      ref="canvasRef"
      class="vortex-background__canvas"
    />
    <slot />
  </div>
</template>

<style scoped>
.vortex-background {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.vortex-background__canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* Better mobile performance and contrast */
@media (max-width: 768px) {
  .vortex-background {
    background: linear-gradient(180deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(15, 15, 15, 0.95) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }

  .vortex-background__canvas {
    opacity: 0.3; /* Further reduce intensity on mobile */
    filter: blur(1px); /* Add slight blur for performance */
  }
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .vortex-background__canvas {
    display: none;
  }

  .vortex-background {
    background: var(--c-grey-95);
  }
}
</style>
