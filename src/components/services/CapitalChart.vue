<script setup lang="ts">
import type { ChartSeries } from '@/types/services';
import { useElementSize } from '@vueuse/core';
import { computed, ref } from 'vue';

interface Props {
  labels: number[];
  series: ChartSeries[];
  formatValue: (value: number) => string;
  axisLabel: (value: number) => string;
  yearSuffix: string;
  /** 1-based year to mark with a vertical line (e.g. financial-independence year) */
  markerYear?: number | null;
  markerLabel?: string;
  /** Value to mark with a horizontal goal line */
  goalValue?: number | null;
  goalLabel?: string;
  /** Optional scenario corridor (upper/lower bound per year) */
  band?: { upper: number[]; lower: number[] } | null;
}

const props = defineProps<Props>();

const wrap = ref<HTMLElement | null>(null);
const { width } = useElementSize(wrap);

const HEIGHT = 320;
const PADDING = { top: 16, right: 16, bottom: 28, left: 64 } as const;

const innerWidth = computed(() => Math.max(0, (width.value || 720) - PADDING.left - PADDING.right));
const innerHeight = HEIGHT - PADDING.top - PADDING.bottom;

const maxValue = computed(() => {
  const all = props.series.flatMap(s => s.data);
  if (props.band)
    all.push(...props.band.upper);
  const max = Math.max(0, ...all);
  if (max === 0)
    return 1;
  const magnitude = 10 ** Math.floor(Math.log10(max));
  return Math.ceil(max / magnitude) * magnitude;
});

const stepX = computed(() => {
  const count = props.labels.length;
  return count > 1 ? innerWidth.value / (count - 1) : 0;
});

function x(index: number): number {
  return PADDING.left + index * stepX.value;
}

function y(value: number): number {
  return PADDING.top + innerHeight - (value / maxValue.value) * innerHeight;
}

function linePath(data: number[]): string {
  if (!data.length)
    return '';
  return data
    .map((value, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(2)} ${y(value).toFixed(2)}`)
    .join(' ');
}

function areaPath(data: number[]): string {
  if (!data.length)
    return '';
  const top = data
    .map((value, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(2)} ${y(value).toFixed(2)}`)
    .join(' ');
  const baseY = (PADDING.top + innerHeight).toFixed(2);
  return `${top} L ${x(data.length - 1).toFixed(2)} ${baseY} L ${x(0).toFixed(2)} ${baseY} Z`;
}

const gridLines = computed(() => {
  const lines = [];
  const segments = 5;
  for (let i = 0; i <= segments; i++) {
    const value = (maxValue.value / segments) * i;
    lines.push({ value, y: y(value) });
  }
  return lines;
});

const xTicks = computed(() => {
  const count = props.labels.length;
  if (!count)
    return [];
  const target = 8;
  const stride = Math.max(1, Math.round(count / target));
  return props.labels
    .map((label, i) => ({ label, i }))
    .filter(({ i }) => i % stride === 0 || i === count - 1);
});

const bandPath = computed(() => {
  if (!props.band)
    return '';
  const { upper, lower } = props.band;
  if (!upper.length)
    return '';
  const top = upper.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(2)} ${y(v).toFixed(2)}`).join(' ');
  const bottom = lower
    .map((v, i) => ({ v, i }))
    .reverse()
    .map(({ v, i }) => `L ${x(i).toFixed(2)} ${y(v).toFixed(2)}`)
    .join(' ');
  return `${top} ${bottom} Z`;
});

const markerX = computed(() => {
  if (props.markerYear == null)
    return null;
  const i = props.labels.indexOf(props.markerYear);
  return i >= 0 ? x(i) : null;
});

const goalY = computed(() => {
  if (props.goalValue == null || props.goalValue <= 0 || props.goalValue > maxValue.value)
    return null;
  return y(props.goalValue);
});

const hoverIndex = ref<number | null>(null);

function onMove(event: MouseEvent): void {
  if (!wrap.value || stepX.value === 0)
    return;
  const rect = wrap.value.getBoundingClientRect();
  const relX = event.clientX - rect.left - PADDING.left;
  const idx = Math.round(relX / stepX.value);
  hoverIndex.value = Math.min(props.labels.length - 1, Math.max(0, idx));
}

function onLeave(): void {
  hoverIndex.value = null;
}

const tooltip = computed(() => {
  if (hoverIndex.value === null)
    return null;
  const i = hoverIndex.value;
  const px = x(i);
  return {
    x: px,
    left: `${(px / (width.value || 1)) * 100}%`,
    flip: px > (width.value || 0) * 0.62,
    year: props.labels[i],
    points: props.series.map(s => ({
      name: s.name,
      color: s.color,
      value: s.data[i],
      cy: y(s.data[i]),
    })),
  };
});
</script>

<template>
  <div ref="wrap" class="cap-chart" @mousemove="onMove" @mouseleave="onLeave">
    <svg
      class="cap-chart__svg"
      :viewBox="`0 0 ${width || 720} ${HEIGHT}`"
      :width="width || 720"
      :height="HEIGHT"
      role="img"
      aria-label="График роста капитала"
    >
      <!-- gridlines + y labels -->
      <g class="cap-chart__grid">
        <g v-for="(line, li) in gridLines" :key="li">
          <line
            :x1="PADDING.left"
            :y1="line.y"
            :x2="(width || 720) - PADDING.right"
            :y2="line.y"
            :class="{ 'is-base': li === 0 }"
          />
          <text :x="PADDING.left - 12" :y="line.y + 3" text-anchor="end">
            {{ axisLabel(line.value) }}
          </text>
        </g>
      </g>

      <!-- x labels + ticks -->
      <g class="cap-chart__xlabels">
        <g v-for="tick in xTicks" :key="tick.i">
          <line
            :x1="x(tick.i)"
            :y1="PADDING.top + innerHeight"
            :x2="x(tick.i)"
            :y2="PADDING.top + innerHeight + 4"
          />
          <text :x="x(tick.i)" :y="HEIGHT - 8" text-anchor="middle">
            {{ tick.label }}
          </text>
        </g>
      </g>

      <!-- scenario corridor -->
      <path v-if="bandPath" class="cap-chart__band" :d="bandPath" />

      <!-- series -->
      <g v-for="(s, si) in series" :key="`s-${si}`">
        <path
          v-if="si === 0"
          :d="areaPath(s.data)"
          :fill="s.color"
          fill-opacity="0.06"
        />
        <path
          class="cap-chart__line"
          :class="{ 'is-secondary': si > 0 }"
          :d="linePath(s.data)"
          fill="none"
          :stroke="s.color"
          :stroke-width="si === 0 ? 2.25 : 1.5"
          :stroke-dasharray="si > 0 ? '4 3' : undefined"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      </g>

      <!-- goal line -->
      <g v-if="goalY != null" class="cap-chart__goal">
        <line
          :x1="PADDING.left"
          :y1="goalY"
          :x2="(width || 720) - PADDING.right"
          :y2="goalY"
        />
        <text :x="(width || 720) - PADDING.right" :y="goalY - 6" text-anchor="end">
          {{ goalLabel }}
        </text>
      </g>

      <!-- FIRE marker -->
      <g v-if="markerX != null" class="cap-chart__marker">
        <line
          :x1="markerX"
          :y1="PADDING.top"
          :x2="markerX"
          :y2="PADDING.top + innerHeight"
        />
        <text :x="markerX + 5" :y="PADDING.top + 10" text-anchor="start">
          {{ markerLabel }}
        </text>
      </g>

      <!-- crosshair + markers -->
      <g v-if="tooltip" class="cap-chart__hover">
        <line
          :x1="tooltip.x"
          :y1="PADDING.top"
          :x2="tooltip.x"
          :y2="PADDING.top + innerHeight"
        />
        <rect
          v-for="(p, pi) in tooltip.points"
          :key="pi"
          :x="tooltip.x - 3.5"
          :y="p.cy - 3.5"
          width="7"
          height="7"
          :fill="p.color"
        />
      </g>
    </svg>

    <div
      v-if="tooltip"
      class="cap-chart__tip"
      :class="{ 'cap-chart__tip--flip': tooltip.flip }"
      :style="{ left: tooltip.left }"
    >
      <div class="cap-chart__tip-year">
        {{ tooltip.year }} {{ yearSuffix }}
      </div>
      <div v-for="(p, pi) in tooltip.points" :key="pi" class="cap-chart__tip-row">
        <span class="cap-chart__tip-dot" :style="{ background: p.color }" />
        <span class="cap-chart__tip-name">{{ p.name }}</span>
        <span class="cap-chart__tip-value">{{ formatValue(p.value) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';

.cap-chart {
  position: relative;
  width: 100%;

  &__svg {
    display: block;
    width: 100%;
    height: auto;
  }

  &__grid {
    line {
      stroke: var(--cap-rule);
      stroke-width: 1;

      &.is-base {
        stroke: var(--cap-rule-strong);
      }
    }

    text {
      fill: var(--cap-ink-3);
      font-size: functions.rem(10.5);
      font-family: var(--cap-mono);
      font-feature-settings: 'tnum' 1;
    }
  }

  &__xlabels {
    line {
      stroke: var(--cap-rule-strong);
      stroke-width: 1;
    }

    text {
      fill: var(--cap-ink-3);
      font-size: functions.rem(10.5);
      font-family: var(--cap-mono);
    }
  }

  &__band {
    fill: var(--cap-red);
    fill-opacity: 0.1;
  }

  &__line {
    stroke-dasharray: 2400;
    stroke-dashoffset: 2400;
    animation: capDraw 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;

    &.is-secondary {
      stroke-dasharray: 4 3;
      animation: none;
    }
  }

  &__goal {
    line {
      stroke: var(--cap-ink-2);
      stroke-width: 1;
      stroke-dasharray: 2 3;
    }

    text {
      fill: var(--cap-ink-2);
      font-family: var(--cap-mono);
      font-size: functions.rem(9.5);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  &__marker {
    line {
      stroke: var(--cap-red);
      stroke-width: 1;
      stroke-dasharray: 3 2;
    }

    text {
      fill: var(--cap-red);
      font-family: var(--cap-mono);
      font-size: functions.rem(9.5);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  }

  &__hover {
    line {
      stroke: var(--cap-ink);
      stroke-width: 1;
    }

    rect {
      stroke: var(--cap-paper);
      stroke-width: 1.5;
    }
  }

  &__tip {
    position: absolute;
    top: functions.rem(4);
    transform: translateX(functions.rem(14));
    min-width: functions.rem(216);
    padding: functions.rem(10) functions.rem(12);
    background: var(--cap-paper);
    border: 1px solid var(--cap-rule-strong);
    border-radius: 3px;
    box-shadow: 0 8px 24px color-mix(in oklch, var(--cap-ink) 12%, transparent);
    pointer-events: none;
    z-index: 2;

    &--flip {
      transform: translateX(calc(-100% - #{functions.rem(14)}));
    }
  }

  &__tip-year {
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    font-weight: 500;
    color: var(--cap-ink-3);
    margin-bottom: functions.rem(8);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  &__tip-row {
    display: flex;
    align-items: center;
    gap: functions.rem(8);
    font-size: functions.rem(12.5);

    & + & {
      margin-top: functions.rem(5);
    }
  }

  &__tip-dot {
    width: functions.rem(8);
    height: functions.rem(8);
    flex-shrink: 0;
  }

  &__tip-name {
    color: var(--cap-ink-2);
  }

  &__tip-value {
    margin-left: auto;
    font-family: var(--cap-mono);
    font-weight: 600;
    font-feature-settings: 'tnum' 1;
    color: var(--cap-ink);
    white-space: nowrap;
  }
}

@keyframes capDraw {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cap-chart__line {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
