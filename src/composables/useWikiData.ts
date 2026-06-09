/**
 * useWikiData Composable
 * Wiki content (categories + articles) with localization
 */

import type {
  LocalizedWikiArticle,
  LocalizedWikiCategory,
  WikiArticle,
  WikiCategory,
} from '@/types/wiki';
import { computed } from 'vue';
import { useLanguage } from './useLanguage';

const categories: WikiCategory[] = [
  {
    slug: 'godot',
    title: { ru: 'Godot', en: 'Godot' },
    description: {
      ru: 'Геймдев на Godot 4 — структура, паттерны, практики',
      en: 'Game dev on Godot 4 — structure, patterns, practices',
    },
    icon: 'simple-icons:godotengine',
  },
];

const articles: WikiArticle[] = [
  {
    slug: 'project-structure',
    category: 'godot',
    title: {
      ru: 'Правильная структура проекта',
      en: 'Correct project structure',
    },
    subtitle: {
      ru: 'Godot 4 · архитектура World → Level + Player · .tscn и .gd всегда вместе',
      en: 'Godot 4 · World → Level + Player architecture · .tscn and .gd always together',
    },
    intro: {
      ru: 'Разбираем на примере Top-Down игры, как организовать папки и сцены в Godot, чтобы проект масштабировался без боли. Логика — в src/, ассеты в assets/, статические данные в data/. Игрок живёт в World, а не внутри уровня.',
      en: 'We break down — using a Top-Down game as an example — how to organize folders and scenes in Godot so the project scales painlessly. Logic in src/, assets in assets/, static data in data/. The Player lives inside World, not inside a Level.',
    },
    blocks: [
      {
        kind: 'heading',
        text: { ru: 'Дерево проекта', en: 'Project tree' },
      },
      {
        kind: 'tree',
        sections: [
          {
            root: {
              name: 'res://',
              desc: { ru: 'корень проекта', en: 'project root' },
              variant: 'primary',
            },
          },
          {
            separatorAfter: true,
            root: {
              name: 'src/',
              desc: { ru: 'вся игровая логика', en: 'all game logic' },
              variant: 'primary',
              children: [
                {
                  name: 'autoloads/',
                  desc: { ru: 'GameManager.gd · AudioBus.gd · SaveSystem.gd · EventBus.gd', en: 'GameManager.gd · AudioBus.gd · SaveSystem.gd · EventBus.gd' },
                  tag: { ru: 'singleton', en: 'singleton' },
                  variant: 'accent',
                },
                {
                  name: 'entities/',
                  desc: { ru: '.tscn + .gd всегда в одной папке', en: '.tscn + .gd always in one folder' },
                  variant: 'accent',
                  children: [
                    {
                      name: 'player/',
                      desc: { ru: 'player.tscn · player.gd · player_states/', en: 'player.tscn · player.gd · player_states/' },
                      tag: { ru: 'живёт в World, не в Level', en: 'lives in World, not in Level' },
                      variant: 'accent',
                      highlight: true,
                      children: [
                        {
                          name: 'player_states/',
                          desc: { ru: 'idle_state.gd · run_state.gd · attack_state.gd', en: 'idle_state.gd · run_state.gd · attack_state.gd' },
                          variant: 'accent',
                        },
                        {
                          name: 'abilities/',
                          desc: { ru: 'способности игрока — меч, магия и т.д.', en: 'player abilities — sword, magic, etc.' },
                          tag: { ru: 'только для player', en: 'player only' },
                          variant: 'accent',
                          children: [
                            {
                              name: 'attack_controller.tscn',
                              desc: { ru: 'управляет всеми способностями', en: 'controls all abilities' },
                              variant: 'muted',
                            },
                            { name: 'attack_controller.gd', variant: 'muted' },
                            {
                              name: 'attack/',
                              desc: { ru: 'attack_ability.tscn · attack_ability.gd · attack_ability.png', en: 'attack_ability.tscn · attack_ability.gd · attack_ability.png' },
                              variant: 'muted',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'enemies/',
                      desc: { ru: 'base_enemy.gd · goblin/ · boss/', en: 'base_enemy.gd · goblin/ · boss/' },
                      variant: 'accent',
                    },
                    {
                      name: 'items/',
                      desc: { ru: 'base_item.gd · sword/ · potion/', en: 'base_item.gd · sword/ · potion/' },
                      variant: 'accent',
                    },
                    {
                      name: 'npcs/',
                      desc: { ru: 'villager/ · merchant/', en: 'villager/ · merchant/' },
                      variant: 'accent',
                    },
                  ],
                },
                {
                  name: 'levels/',
                  variant: 'accent',
                  children: [
                    {
                      name: 'world/',
                      desc: { ru: 'world.tscn · world.gd', en: 'world.tscn · world.gd' },
                      tag: { ru: 'точка входа', en: 'entry point' },
                      variant: 'primary',
                      highlight: true,
                      children: [
                        {
                          name: '▸ World.tscn',
                          desc: { ru: 'содержит: Level (динамически) + Player (постоянно)', en: 'contains: Level (dynamically) + Player (persistent)' },
                          variant: 'muted',
                        },
                        {
                          name: '▸ load_level(path)',
                          desc: { ru: 'меняет Level, Player не трогает — состояние сохраняется', en: 'swaps Level, leaves Player intact — state is preserved' },
                          variant: 'muted',
                        },
                      ],
                    },
                    {
                      name: 'level_01/',
                      desc: { ru: 'level_01.tscn · level_01.gd · TileMap · SpawnPoint (Marker2D)', en: 'level_01.tscn · level_01.gd · TileMap · SpawnPoint (Marker2D)' },
                      variant: 'accent',
                    },
                    {
                      name: 'level_02/',
                      desc: { ru: 'level_02.tscn · level_02.gd', en: 'level_02.tscn · level_02.gd' },
                      variant: 'accent',
                    },
                  ],
                },
                {
                  name: 'ui/',
                  desc: { ru: 'hud/ · menus/ · screens/', en: 'hud/ · menus/ · screens/' },
                  variant: 'accent',
                },
                {
                  name: 'systems/',
                  desc: { ru: 'inventory/ · quests/ · dialogue/ · чистая логика без сцен', en: 'inventory/ · quests/ · dialogue/ · pure logic without scenes' },
                  variant: 'accent',
                },
                {
                  name: 'components/',
                  desc: { ru: 'HealthBar.tscn · Hitbox.tscn · InteractionArea.tscn', en: 'HealthBar.tscn · Hitbox.tscn · InteractionArea.tscn' },
                  variant: 'accent',
                },
                {
                  name: 'resources/',
                  desc: { ru: 'ItemData.tres · EnemyStat.tres · кастомные Resource классы', en: 'ItemData.tres · EnemyStat.tres · custom Resource classes' },
                  variant: 'accent',
                },
                {
                  name: 'utils/',
                  desc: { ru: 'helpers · extensions · static функции', en: 'helpers · extensions · static functions' },
                  variant: 'accent',
                },
              ],
            },
          },
          {
            separatorAfter: true,
            root: {
              name: 'assets/',
              desc: { ru: 'структура зеркалит src/entities/ — всегда знаешь где искать', en: 'mirrors src/entities/ — you always know where to look' },
              variant: 'warning',
              children: [
                { name: 'textures/', desc: { ru: 'player/ · enemies/ · items/ · ui/ · bg/', en: 'player/ · enemies/ · items/ · ui/ · bg/' }, variant: 'warning' },
                { name: 'audio/', desc: { ru: 'sfx/ · music/', en: 'sfx/ · music/' }, variant: 'warning' },
                { name: 'fonts/', desc: { ru: '.ttf · .otf', en: '.ttf · .otf' }, variant: 'warning' },
                { name: 'shaders/', desc: { ru: '.gdshader файлы', en: '.gdshader files' }, variant: 'warning' },
                { name: 'animations/', desc: { ru: '.anim · AnimationLibrary ресурсы', en: '.anim · AnimationLibrary resources' }, variant: 'warning' },
                { name: '3d/', desc: { ru: '.glb · .obj · materials/ · только для 3D-проектов', en: '.glb · .obj · materials/ · for 3D projects only' }, variant: 'warning' },
              ],
            },
          },
          {
            separatorAfter: true,
            root: {
              name: 'data/',
              desc: { ru: 'статические данные, не код', en: 'static data, not code' },
              variant: 'success',
              children: [
                { name: 'localization/', desc: { ru: '.csv · .po · .translation', en: '.csv · .po · .translation' }, variant: 'success' },
                { name: 'configs/', desc: { ru: 'balance.json · settings.json', en: 'balance.json · settings.json' }, variant: 'success' },
                { name: 'maps/', desc: { ru: 'тайлсеты · навигационные меши · TileMap ресурсы', en: 'tilesets · navigation meshes · TileMap resources' }, variant: 'success' },
              ],
            },
          },
          {
            separatorAfter: true,
            root: {
              name: 'addons/',
              desc: { ru: 'плагины AssetLib / git submodule · не редактировать вручную', en: 'AssetLib plugins / git submodule · do not edit manually' },
              variant: 'accent',
            },
          },
          {
            root: {
              name: 'Файлы в корне',
              variant: 'muted',
              children: [
                { name: 'project.godot', desc: { ru: 'настройки проекта, autoload регистрация', en: 'project settings, autoload registration' }, variant: 'muted' },
                { name: '.gitignore', desc: { ru: 'добавь .godot/ · НЕ добавляй *.import — нужны в репо', en: 'add .godot/ · do NOT add *.import — they belong in the repo' }, variant: 'muted' },
                { name: 'README.md', variant: 'muted' },
                { name: 'export_presets.cfg', variant: 'muted' },
                { name: 'CHANGELOG.md', variant: 'muted' },
                { name: '.editorconfig', variant: 'muted' },
                { name: '.github/workflows/', desc: { ru: 'CI/CD для экспорта сборок', en: 'CI/CD for export builds' }, variant: 'muted' },
              ],
            },
          },
        ],
      },
      {
        kind: 'callout',
        tone: 'tip',
        title: { ru: 'Ключевое правило архитектуры', en: 'Key architecture rule' },
        text: {
          ru: 'Player живёт в World.tscn, а не внутри уровня. World загружает уровни динамически через load_level(path) — Player остаётся нетронутым, его состояние (здоровье, инвентарь) сохраняется при смене уровня. Каждый уровень содержит SpawnPoint (Marker2D) — координату появления игрока.',
          en: 'The Player lives in World.tscn, not inside a Level. World loads levels dynamically via load_level(path) — the Player stays intact, and state (health, inventory) is preserved across level changes. Each level contains a SpawnPoint (Marker2D) — the player spawn coordinate.',
        },
      },
      {
        kind: 'callout',
        tone: 'info',
        title: { ru: 'Способности (abilities)', en: 'Abilities' },
        text: {
          ru: 'Если способность уникальна для игрока — живёт в player/abilities/. Если способность могут использовать и враг, и игрок (например, огненный шар) — выносим в components/abilities/.',
          en: 'If an ability is unique to the player — it lives in player/abilities/. If an ability can be used by both enemy and player (e.g. a fireball) — move it to components/abilities/.',
        },
      },
    ],
  },
];

export function useWikiData() {
  const { localize, currentLang } = useLanguage();

  const pageTitle = computed(() =>
    currentLang.value === 'ru' ? 'Вики' : 'Wiki',
  );

  const pageSubtitle = computed(() =>
    currentLang.value === 'ru'
      ? 'Полезные материалы и обучение'
      : 'Useful materials and learning',
  );

  const backText = computed(() =>
    currentLang.value === 'ru' ? 'На главную' : 'Back to Home',
  );

  const backToWikiText = computed(() =>
    currentLang.value === 'ru' ? 'К списку статей' : 'Back to articles',
  );

  const localizedCategories = computed<LocalizedWikiCategory[]>(() =>
    categories.map(category => ({
      slug: category.slug,
      title: localize(category.title),
      description: category.description ? localize(category.description) : undefined,
      icon: category.icon,
      articles: articles
        .filter(a => a.category === category.slug)
        .map<LocalizedWikiArticle>(a => ({
          slug: a.slug,
          category: a.category,
          title: localize(a.title),
          subtitle: a.subtitle ? localize(a.subtitle) : undefined,
          intro: a.intro ? localize(a.intro) : undefined,
        })),
    })),
  );

  function findArticle(category: string, slug: string) {
    return articles.find(a => a.category === category && a.slug === slug) ?? null;
  }

  function findCategory(slug: string) {
    return categories.find(c => c.slug === slug) ?? null;
  }

  return {
    pageTitle,
    pageSubtitle,
    backText,
    backToWikiText,
    categories: localizedCategories,
    findArticle,
    findCategory,
    localize,
    currentLang,
  };
}
