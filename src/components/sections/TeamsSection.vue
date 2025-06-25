<script setup lang="ts">
import type { Language } from '@/composables/usePortfolio';
import { teamsData } from '@/composables/usePortfolio';

interface Props {
  currentLang: Language;
}

defineProps<Props>();
</script>

<template>
  <section class="teams">
    <h2 class="teams__title">
      {{ teamsData.title[currentLang] }}
    </h2>
    <div class="teams__grid">
      <div
        v-for="(team, index) in teamsData.items"
        :key="team.name"
        v-motion
        class="team-card"
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="200 * (index + 6)"
      >
        <!-- Since Badge - Top Right -->
        <div class="team-card__since">
          {{ team.since }}
        </div>

        <!-- Team Name -->
        <h3 class="team-card__title">
          {{ team.name }}
        </h3>

        <!-- Description -->
        <p class="team-card__description">
          {{ team.description[currentLang] }}
        </p>

        <!-- Tags -->
        <div class="team-card__tags">
          <span v-for="tag in team.tags" :key="tag" class="team-card__tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
