<script setup lang="ts">
import type { WikiTreeSection } from '@/types/wiki';
import { useLanguage } from '@/composables';

defineProps<{
  sections: WikiTreeSection[];
}>();

const { localize } = useLanguage();
</script>

<template>
  <div class="wiki-tree">
    <template v-for="(section, sIdx) in sections" :key="sIdx">
      <div class="wiki-tree__section">
        <div
          class="wiki-tree__row wiki-tree__row--root"
          :class="[
            `wiki-tree__row--${section.root.variant ?? 'primary'}`,
            { 'wiki-tree__row--highlight': section.root.highlight },
          ]"
        >
          <span class="wiki-tree__name">{{ section.root.name }}</span>
          <span v-if="section.root.desc" class="wiki-tree__desc">{{ localize(section.root.desc) }}</span>
          <span v-if="section.root.tag" class="wiki-tree__tag">{{ localize(section.root.tag) }}</span>
        </div>

        <template v-for="(child, cIdx) in section.root.children" :key="cIdx">
          <div
            class="wiki-tree__row wiki-tree__row--child"
            :class="[
              `wiki-tree__row--${child.variant ?? 'accent'}`,
              { 'wiki-tree__row--highlight': child.highlight },
            ]"
          >
            <span class="wiki-tree__name">{{ child.name }}</span>
            <span v-if="child.desc" class="wiki-tree__desc">{{ localize(child.desc) }}</span>
            <span v-if="child.tag" class="wiki-tree__tag">{{ localize(child.tag) }}</span>
          </div>

          <template v-for="(child2, c2Idx) in child.children" :key="c2Idx">
            <div
              class="wiki-tree__row wiki-tree__row--child2"
              :class="[
                `wiki-tree__row--${child2.variant ?? 'accent'}`,
                { 'wiki-tree__row--highlight': child2.highlight },
              ]"
            >
              <span class="wiki-tree__name">{{ child2.name }}</span>
              <span v-if="child2.desc" class="wiki-tree__desc">{{ localize(child2.desc) }}</span>
              <span v-if="child2.tag" class="wiki-tree__tag">{{ localize(child2.tag) }}</span>
            </div>

            <template v-for="(child3, c3Idx) in child2.children" :key="c3Idx">
              <div
                class="wiki-tree__row wiki-tree__row--child3"
                :class="[
                  `wiki-tree__row--${child3.variant ?? 'accent'}`,
                  { 'wiki-tree__row--highlight': child3.highlight },
                ]"
              >
                <span class="wiki-tree__name">{{ child3.name }}</span>
                <span v-if="child3.desc" class="wiki-tree__desc">{{ localize(child3.desc) }}</span>
                <span v-if="child3.tag" class="wiki-tree__tag">{{ localize(child3.tag) }}</span>
              </div>

              <div
                v-for="(child4, c4Idx) in child3.children"
                :key="c4Idx"
                class="wiki-tree__row wiki-tree__row--child4"
                :class="[
                  `wiki-tree__row--${child4.variant ?? 'muted'}`,
                  { 'wiki-tree__row--highlight': child4.highlight },
                ]"
              >
                <span class="wiki-tree__name">{{ child4.name }}</span>
                <span v-if="child4.desc" class="wiki-tree__desc">{{ localize(child4.desc) }}</span>
                <span v-if="child4.tag" class="wiki-tree__tag">{{ localize(child4.tag) }}</span>
              </div>
            </template>
          </template>
        </template>
      </div>

      <div v-if="section.separatorAfter" class="wiki-tree__sep" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.wiki-tree {
  display: flex;
  flex-direction: column;
  gap: functions.rem(6);
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: functions.rem(13);
  line-height: 1.5;

  &__section {
    display: flex;
    flex-direction: column;
    gap: functions.rem(2);
    margin-bottom: functions.rem(4);
  }

  &__sep {
    height: 1px;
    background: var(--c-grey-90);
    margin: functions.rem(12) 0;
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: functions.rem(10);
    padding: functions.rem(7) functions.rem(12);
    border-radius: functions.rem(6);
    transition: background 0.15s;
    color: var(--c-grey-20);

    &:hover {
      background: rgba(var(--c-white-rgb), 0.04);
    }

    &--root {
      padding: functions.rem(10) functions.rem(16);
      border: 1px solid var(--c-grey-90);
      background: rgba(var(--c-white-rgb), 0.02);
      border-radius: functions.rem(8);
      margin-bottom: functions.rem(2);
    }

    &--child { padding-left: functions.rem(36); }
    &--child2 { padding-left: functions.rem(60); }
    &--child3 { padding-left: functions.rem(84); }
    &--child4 { padding-left: functions.rem(108); }

    @include media.sm-down {
      &--child { padding-left: functions.rem(20); }
      &--child2 { padding-left: functions.rem(32); }
      &--child3 { padding-left: functions.rem(44); }
      &--child4 { padding-left: functions.rem(56); }
    }

    &--primary .wiki-tree__name { color: var(--c-primary-light); }
    &--accent .wiki-tree__name { color: var(--c-status-info); }
    &--success .wiki-tree__name { color: var(--c-status-success); }
    &--warning .wiki-tree__name { color: var(--c-status-warning); }
    &--muted .wiki-tree__name { color: var(--c-grey-50); }

    &--highlight {
      background: rgba(var(--c-primary-rgb), 0.06);
      border-left: 2px solid var(--c-primary);
    }
  }

  &__name {
    font-weight: 500;
    flex-shrink: 0;
  }

  &__desc {
    color: var(--c-grey-50);
    font-size: functions.rem(12);
  }

  &__tag {
    margin-left: auto;
    color: var(--c-grey-30);
    background: rgba(var(--c-white-rgb), 0.04);
    border: 1px solid var(--c-grey-90);
    padding: functions.rem(2) functions.rem(8);
    border-radius: functions.rem(4);
    font-size: functions.rem(11);
    text-transform: lowercase;
    flex-shrink: 0;
  }
}
</style>
