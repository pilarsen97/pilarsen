<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { ShaderToy } from '@/components/ui/shader-toy';

interface Props {
  class?: HTMLAttributes['class'];
  speed?: number;
  brightness?: number;
}

withDefaults(defineProps<Props>(), {
  speed: 0.5,
  brightness: 1,
});

// Drifting violet/indigo nebula veil — organic, slow, readable behind content.
// ShaderToy-style fragment (iTime / iResolution provided by InspiraShaderToy).
const shader = `
float hash(vec2 p){
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), u.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}
void mainImage(out vec4 O, vec2 F){
  vec2 uv = (F - 0.5 * iResolution.xy) / iResolution.y;
  float t = iTime * 0.06;

  float f  = fbm(uv * 2.0 + vec2(t, -t * 0.6));
  float f2 = fbm(uv * 3.2 - vec2(t * 0.5, t * 0.3) + f);
  float glow = smoothstep(0.22, 0.95, f * 0.8 + f2 * 0.6);

  // soft secondary bloom drifting the other way
  float bloom = smoothstep(0.45, 1.05, fbm(uv * 1.4 + vec2(-t * 0.4, t)));

  vec3 violet = vec3(0.52, 0.24, 1.0);
  vec3 indigo = vec3(0.20, 0.17, 0.70);
  vec3 col = mix(indigo, violet, f2);
  col *= glow;
  col += violet * bloom * 0.3;

  vec3 base = vec3(0.022, 0.020, 0.040);
  col = base + col * 0.85;

  // gentle vignette toward edges keeps focus center
  float vig = 1.0 - 0.35 * dot(uv, uv);
  col *= vig;

  O = vec4(col, 1.0);
}
`;
</script>

<template>
  <div class="aurora-background" :class="[$props.class]">
    <ShaderToy
      :shader-code="shader"
      :speed="speed"
      :brightness="brightness"
      :saturation="1"
      :mouse-sensitivity="0"
      :damping="1"
    />
  </div>
</template>

<style scoped>
.aurora-background {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.aurora-background :deep(canvas) {
  cursor: default;
}
</style>
