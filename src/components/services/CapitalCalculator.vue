<script setup lang="ts">
import type { OneTimeExpense } from '@/types/services';
import { computed } from 'vue';
import { useCapitalCalculator } from '@/composables/useCapitalCalculator';
import CapitalChart from './CapitalChart.vue';
import MoneyInput from './MoneyInput.vue';

const {
  inputs,
  oneTimeExpenses,
  goal,
  view,
  copied,
  scenariosOn,
  withdrawalRate,
  rows,
  summary,
  fire,
  goalResult,
  chartLabels,
  chartSeries,
  goalLine,
  scenarioBand,
  sensitivity,
  drawdown,
  presets,
  isRu,
  formatMoney,
  formatNumber,
  addEvent,
  removeEvent,
  applyPreset,
  activePresetId,
  setView,
  copyShareLink,
  reset,
} = useCapitalCalculator();

const t = computed(() => isRu.value
  ? {
      paramsTitle: 'Параметры',
      resultLabel: 'Результат',
      reset: 'Сбросить',
      initial: 'Стартовый капитал',
      income: 'Доходы в месяц',
      expenses: 'Расходы в месяц',
      extra: 'Доп. взнос в месяц',
      incomeGrowth: 'Прирост доходов в год',
      rate: 'Ставка инвестиций',
      inflation: 'Инфляция',
      tax: 'Налог на доход',
      years: 'Срок расчёта',
      yearsUnit: 'лет',
      events: 'Разовые операции',
      eventsHint: 'В текущих ценах. − трата, + поступление. Инфляция учитывается автоматически.',
      eventName: 'Назначение',
      eventNamePlaceholder: 'Квартира, бонус, машина…',
      eventAmount: 'Сумма',
      eventYear: 'Год',
      addEvent: 'Добавить операцию',
      capCaption: 'Капитал через',
      capCaptionReal: 'в текущих ценах',
      summaryOther: 'В текущих ценах',
      summaryOtherNominal: 'Номинал',
      summaryPassive: 'Пассивный доход / мес',
      freedom: 'Фин. свобода',
      growth: 'Рост капитала',
      fireReached: 'Финансовая свобода — через',
      fireNot: 'Пассивный доход не покрывает расходы за',
      viewNominal: 'Номинал',
      viewReal: 'Тек. цены',
      goalTitle: 'Цель',
      goalIncome: 'Доход / мес',
      goalCapital: 'Капитал',
      goalReached: 'Цель — год',
      goalProgress: 'до цели',
      chartTitle: 'Проекция',
      fireMarker: 'свобода',
      goalMarker: 'цель',
      scenarios: 'Сценарии',
      scenarioBand: 'коридор ±4 п.п. ставки',
      tableTitle: 'По годам',
      savePdf: 'Сохранить PDF',
      share: 'Копировать ссылку',
      copied: 'Скопировано',
      drawTitle: 'Фаза снятия',
      drawHint: 'Сколько можно ежемесячно тратить с итогового капитала, если начать «проедать» его после срока расчёта.',
      drawRate: 'Ставка снятия',
      drawIncome: 'Доход / мес',
      drawToday: 'в текущих ценах',
      drawSustain: 'Капитал не истощается',
      drawLast: 'Хватит на',
      sensTitle: 'Чувствительность',
      sensHint: 'Как меняется итоговый капитал при отклонении параметра на ±2 п.п.',
      sensRate: 'Ставка',
      sensInflation: 'Инфляция',
      methodTitle: 'Методология',
      cols: {
        year: 'Год',
        income: 'Доходы/мес',
        expenses: 'Расходы/мес',
        delta: 'Взнос/мес',
        saved: 'Накоплено за год',
        intPrev: '% на прошлый кап.',
        intCur: '% на текущий кап.',
        oneTime: 'Разовые',
        capital: 'Итоговый капитал',
        capitalToday: 'В текущих ценах',
        pd: 'ПД / мес',
        pdToday: 'ПД / мес, тек.',
      },
    }
  : {
      paramsTitle: 'Parameters',
      resultLabel: 'Result',
      reset: 'Reset',
      initial: 'Starting capital',
      income: 'Monthly income',
      expenses: 'Monthly expenses',
      extra: 'Extra monthly contribution',
      incomeGrowth: 'Annual income growth',
      rate: 'Investment rate',
      inflation: 'Inflation',
      tax: 'Tax on income',
      years: 'Horizon',
      yearsUnit: 'yrs',
      events: 'One-time events',
      eventsHint: 'In today\'s prices. − expense, + windfall. Inflation is applied automatically.',
      eventName: 'Label',
      eventNamePlaceholder: 'Apartment, bonus, car…',
      eventAmount: 'Amount',
      eventYear: 'Year',
      addEvent: 'Add event',
      capCaption: 'Capital in',
      capCaptionReal: 'in today\'s prices',
      summaryOther: 'In today\'s prices',
      summaryOtherNominal: 'Nominal',
      summaryPassive: 'Passive income / mo',
      freedom: 'Independence',
      growth: 'Capital growth',
      fireReached: 'Financial independence in',
      fireNot: 'Passive income doesn\'t cover expenses within',
      viewNominal: 'Nominal',
      viewReal: 'Today',
      goalTitle: 'Goal',
      goalIncome: 'Income / mo',
      goalCapital: 'Capital',
      goalReached: 'Goal — year',
      goalProgress: 'to goal',
      chartTitle: 'Projection',
      fireMarker: 'FIRE',
      goalMarker: 'goal',
      scenarios: 'Scenarios',
      scenarioBand: '±4pp rate corridor',
      tableTitle: 'By year',
      savePdf: 'Save PDF',
      share: 'Copy link',
      copied: 'Copied',
      drawTitle: 'Withdrawal phase',
      drawHint: 'How much you could spend monthly from the final capital if you start drawing it down after the horizon.',
      drawRate: 'Withdrawal rate',
      drawIncome: 'Income / mo',
      drawToday: 'in today\'s prices',
      drawSustain: 'Capital is preserved',
      drawLast: 'Lasts',
      sensTitle: 'Sensitivity',
      sensHint: 'How the final capital shifts when a parameter moves by ±2pp.',
      sensRate: 'Rate',
      sensInflation: 'Inflation',
      methodTitle: 'Methodology',
      cols: {
        year: 'Year',
        income: 'Income/mo',
        expenses: 'Expenses/mo',
        delta: 'Contrib./mo',
        saved: 'Saved this year',
        intPrev: '% on prev. cap.',
        intCur: '% on current cap.',
        oneTime: 'One-time',
        capital: 'Total capital',
        capitalToday: 'In today\'s prices',
        pd: 'PI / mo',
        pdToday: 'PI / mo, today',
      },
    },
);

interface SliderField {
  key: 'incomeGrowth' | 'rate' | 'inflation' | 'taxRate' | 'years';
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}

const sliders = computed<SliderField[]>(() => [
  { key: 'incomeGrowth', label: t.value.incomeGrowth, min: 0, max: 50, step: 0.5, unit: '%' },
  { key: 'rate', label: t.value.rate, min: 0, max: 30, step: 0.5, unit: '%' },
  { key: 'inflation', label: t.value.inflation, min: 0, max: 30, step: 0.5, unit: '%' },
  { key: 'taxRate', label: t.value.tax, min: 0, max: 20, step: 1, unit: '%' },
  { key: 'years', label: t.value.years, min: 1, max: 50, step: 1, unit: t.value.yearsUnit },
]);

function sliderProgress(field: SliderField): string {
  const value = inputs[field.key];
  return `${((value - field.min) / (field.max - field.min)) * 100}%`;
}

function axisLabel(value: number): string {
  if (value >= 1_000_000)
    return `${Math.round(value / 1_000_000)} ${isRu.value ? 'млн' : 'M'}`;
  if (value >= 1000)
    return `${Math.round(value / 1000)} ${isRu.value ? 'тыс' : 'K'}`;
  return formatNumber(value);
}

const capCaption = computed(() => view.value === 'nominal'
  ? `${t.value.capCaption} ${inputs.years} ${t.value.yearsUnit}`
  : `${t.value.capCaption} ${inputs.years} ${t.value.yearsUnit} · ${t.value.capCaptionReal}`);

const primaryFigure = computed(() =>
  formatMoney(view.value === 'nominal' ? summary.value.finalCapital : summary.value.finalCapitalToday),
);

const otherFigure = computed(() => view.value === 'nominal'
  ? { label: t.value.summaryOther, value: formatMoney(summary.value.finalCapitalToday) }
  : { label: t.value.summaryOtherNominal, value: formatMoney(summary.value.finalCapital) },
);

const passiveValue = computed(() =>
  formatMoney(view.value === 'nominal' ? summary.value.passiveIncomeMonth : summary.value.passiveIncomeMonthToday),
);

const freedomCell = computed(() => fire.value.reached
  ? `${fire.value.year} ${t.value.yearsUnit}`
  : `> ${inputs.years}`,
);

const lastCell = computed(() => {
  if (goalResult.value.active) {
    return {
      label: goalResult.value.reachedYear ? t.value.goalReached : t.value.goalProgress,
      value: goalResult.value.reachedYear
        ? `${goalResult.value.reachedYear} ${t.value.yearsUnit}`
        : `${Math.round(goalResult.value.progress * 100)} %`,
    };
  }
  const base = Math.max(1, inputs.initial);
  return { label: t.value.growth, value: `×${(summary.value.finalCapital / base).toFixed(1)}` };
});

function flipKind(event: OneTimeExpense): void {
  event.kind = event.kind === 'out' ? 'in' : 'out';
}

function pct(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${Math.abs(Math.round(value * 100))} %`;
}

const drawProgress = computed(() => `${((withdrawalRate.value - 2) / (8 - 2)) * 100}%`);

const methodItems = computed(() => isRu.value
  ? [
      {
        title: 'Инфляция',
        text: 'Каждый год увеличивает расходы на свой размер: при расходах 50 000 ₽ и инфляции 5% в следующем году они станут 52 500 ₽.',
      },
      {
        title: 'Как можно уйти в минус',
        text: 'Если доходы не растут, а расходы растут из-за инфляции, в какой-то год расходы превысят доходы — ежемесячный взнос станет отрицательным.',
      },
      {
        title: 'Будущие и текущие цены',
        text: 'Будущие — номинальные суммы через N лет. Текущие — те же суммы, приведённые к покупательной способности сегодня с учётом заданной инфляции: сколько «сегодняшних рублей» будет стоить капитал и доход.',
      },
      {
        title: 'Проедание капитала',
        text: 'Как тратить капитал после срока расчёта — отдельная задача. Базовый сценарий по ставке снятия показан в блоке «Фаза снятия»; он не учитывает снижение расходов с возрастом и остаточные активные доходы.',
      },
    ]
  : [
      {
        title: 'Inflation',
        text: 'Each year raises expenses by its own rate: with 50 000 ₽ of expenses and 5% inflation, next year they become 52 500 ₽.',
      },
      {
        title: 'How you can go negative',
        text: 'If income stays flat while expenses keep rising with inflation, at some point expenses exceed income — the monthly contribution turns negative.',
      },
      {
        title: 'Future vs today\'s prices',
        text: 'Future values are nominal sums in N years. Today\'s values are the same sums brought to current purchasing power at your inflation rate — what the capital and income are worth in today\'s money.',
      },
      {
        title: 'Drawing down capital',
        text: 'How to spend capital after the horizon is a separate problem. A base scenario by withdrawal rate is shown in "Withdrawal phase"; it ignores lower spending with age and residual active income.',
      },
    ],
);

function esc(value: string): string {
  return value.replace(/[&<>"]/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string
  ));
}

function exportPdf(): void {
  const c = t.value;
  const win = window.open('', '_blank', 'width=1200,height=900');
  if (!win) {
    // eslint-disable-next-line no-alert
    window.alert(isRu.value ? 'Разрешите всплывающие окна, чтобы сохранить PDF.' : 'Allow pop-ups to save the PDF.');
    return;
  }

  const params: [string, string][] = [
    [c.initial, formatMoney(inputs.initial)],
    [c.income, formatMoney(inputs.income)],
    [c.expenses, formatMoney(inputs.expenses)],
    [c.extra, formatMoney(inputs.extraContribution)],
    [c.incomeGrowth, `${inputs.incomeGrowth} %`],
    [c.rate, `${inputs.rate} %`],
    [c.inflation, `${inputs.inflation} %`],
    [c.tax, `${inputs.taxRate} %`],
    [c.years, `${inputs.years} ${c.yearsUnit}`],
  ];
  const paramsRows = params
    .map(([label, value]) => `<tr><td><strong>${esc(label)}</strong></td><td>${esc(value)}</td></tr>`)
    .join('');

  const readouts: [string, string][] = [
    [capCaption.value, formatMoney(summary.value.finalCapital)],
    [c.summaryOther, formatMoney(summary.value.finalCapitalToday)],
    [c.summaryPassive, formatMoney(summary.value.passiveIncomeMonth)],
    [c.freedom, fire.value.reached ? `${fire.value.year} ${c.yearsUnit}` : '—'],
  ];
  const summaryCardsHtml = readouts
    .map(([label, value]) => `<div class="card"><h4>${esc(label)}</h4><div class="value">${esc(value)}</div></div>`)
    .join('');

  const headerCells = Object.values(c.cols).map(col => `<th>${esc(col)}</th>`).join('');
  const bodyRows = rows.value.map((r) => {
    const main = `<tr>${[
      r.year,
      formatMoney(r.income),
      formatMoney(r.expenses),
      formatMoney(r.monthlyDelta),
      formatMoney(r.annualSavings),
      formatMoney(r.interestOnPrevCapital),
      formatMoney(r.interestOnCurrentSavings),
      r.oneTime !== 0 ? formatMoney(r.oneTime) : '—',
      formatMoney(r.newCapital),
      formatMoney(r.capitalInTodayPrices),
      formatMoney(r.passiveIncomeMonth),
      formatMoney(r.passiveIncomeMonthToday),
    ].map(v => `<td>${esc(String(v))}</td>`).join('')}</tr>`;
    const detail = r.oneTimeDetails
      ? `<tr><td colspan="12" style="text-align:left;color:#7a7a7a;font-size:11px;">${esc(r.oneTimeDetails)}</td></tr>`
      : '';
    return main + detail;
  }).join('');

  const docTitle = isRu.value ? 'Расчёт капитала' : 'Capital projection';

  win.document.write(`<!DOCTYPE html><html lang="${isRu.value ? 'ru' : 'en'}"><head>
<meta charset="UTF-8"><title>${esc(docTitle)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; padding: 28px; color: #1a1a1a; max-width: 1120px; margin: 0 auto; }
  h1 { font-size: 20px; margin-bottom: 4px; letter-spacing: -0.01em; }
  .sub { color: #7a7a7a; font-size: 12px; margin-bottom: 24px; }
  h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #7a7a7a; border-bottom: 1px solid #1a1a1a; padding-bottom: 6px; margin: 24px 0 12px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { border-bottom: 1px solid #e2e2e2; padding: 6px 8px; text-align: right; }
  th { font-weight: 600; text-align: right; color: #555; border-bottom: 1px solid #1a1a1a; }
  .params td { text-align: left; border: none; padding: 4px 8px; }
  .summary { display: flex; flex-wrap: wrap; gap: 0; border: 1px solid #1a1a1a; }
  .card { flex: 1 1 200px; padding: 12px 14px; border-right: 1px solid #e2e2e2; }
  .card:last-child { border-right: none; }
  .card h4 { font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; color: #7a7a7a; margin-bottom: 6px; font-weight: 600; }
  .card .value { font-size: 17px; font-weight: 700; color: #fe0000; }
  @media print { @page { size: A4 landscape; margin: 10mm; } body { padding: 0; } }
</style></head><body>
  <h1>${esc(docTitle)}</h1>
  <p class="sub">pilarsen — capital.calc</p>
  <h3>${esc(c.paramsTitle)}</h3>
  <table class="params">${paramsRows}</table>
  <h3>${esc(c.resultLabel)}</h3>
  <div class="summary">${summaryCardsHtml}</div>
  <h3>${esc(c.tableTitle)}</h3>
  <table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>
  <script>window.onload = function () { setTimeout(function () { window.print(); }, 400); };<\/script>
</body></html>`);
  win.document.close();
}
</script>

<template>
  <div class="cap instrument">
    <div class="cap__frame">
      <!-- ===== Controls ===== -->
      <form class="ctl" @submit.prevent>
        <header class="ctl__head">
          <span class="sec"><b>01</b>{{ t.paramsTitle }}</span>
          <button type="button" class="linkbtn" @click="reset">
            {{ t.reset }}
          </button>
        </header>

        <div class="presets">
          <button
            v-for="preset in presets"
            :key="preset.id"
            type="button"
            class="presets__chip"
            :class="{ 'is-active': activePresetId() === preset.id }"
            @click="applyPreset(preset)"
          >
            {{ isRu ? preset.label.ru : preset.label.en }}
          </button>
        </div>

        <div class="field">
          <label class="field__label" for="cap-initial">{{ t.initial }}</label>
          <MoneyInput id="cap-initial" v-model="inputs.initial" :aria-label="t.initial" />
        </div>

        <div class="field-row">
          <div class="field">
            <label class="field__label" for="cap-income">{{ t.income }}</label>
            <MoneyInput id="cap-income" v-model="inputs.income" :aria-label="t.income" />
          </div>
          <div class="field">
            <label class="field__label" for="cap-expenses">{{ t.expenses }}</label>
            <MoneyInput id="cap-expenses" v-model="inputs.expenses" :aria-label="t.expenses" />
          </div>
        </div>

        <div class="field">
          <label class="field__label" for="cap-extra">{{ t.extra }}</label>
          <MoneyInput id="cap-extra" v-model="inputs.extraContribution" :aria-label="t.extra" />
        </div>

        <div class="sliders">
          <div v-for="field in sliders" :key="field.key" class="slider">
            <div class="slider__head">
              <span class="slider__label">{{ field.label }}</span>
              <span class="slider__value">{{ inputs[field.key] }}<i>{{ field.unit }}</i></span>
            </div>
            <input
              v-model.number="inputs[field.key]"
              type="range"
              class="slider__input"
              :min="field.min"
              :max="field.max"
              :step="field.step"
              :aria-label="field.label"
              :style="{ '--progress': sliderProgress(field) }"
            >
          </div>
        </div>

        <div class="exp">
          <header class="exp__head">
            <span class="sec sec--sub">{{ t.events }}</span>
          </header>
          <p class="exp__hint">
            {{ t.eventsHint }}
          </p>

          <TransitionGroup name="exp" tag="div" class="exp__list">
            <div v-for="event in oneTimeExpenses" :key="event.id" class="event">
              <div class="event__top">
                <button
                  type="button"
                  class="event__dir"
                  :class="event.kind === 'in' ? 'is-in' : 'is-out'"
                  :aria-label="event.kind === 'out' ? 'expense' : 'income'"
                  @click="flipKind(event)"
                >
                  {{ event.kind === 'out' ? '−' : '+' }}
                </button>
                <input
                  v-model="event.name"
                  type="text"
                  class="event__name"
                  :placeholder="t.eventNamePlaceholder"
                  :aria-label="t.eventName"
                >
                <button
                  type="button"
                  class="event__remove"
                  aria-label="remove"
                  @click="removeEvent(event.id)"
                >
                  ✕
                </button>
              </div>
              <div class="event__bot">
                <MoneyInput v-model="event.amount" :aria-label="t.eventAmount" />
                <input
                  v-model.number="event.year"
                  type="number"
                  class="event__year"
                  min="1"
                  :max="inputs.years"
                  :aria-label="t.eventYear"
                >
              </div>
            </div>
          </TransitionGroup>

          <button type="button" class="exp__add" @click="addEvent('out')">
            + {{ t.addEvent }}
          </button>
        </div>
      </form>

      <!-- ===== Output ===== -->
      <div class="out">
        <section class="readout">
          <header class="readout__head">
            <span class="sec"><b>02</b>{{ t.resultLabel }}</span>
            <div class="seg seg--view">
              <button
                type="button"
                :class="{ 'is-active': view === 'nominal' }"
                @click="setView('nominal')"
              >
                {{ t.viewNominal }}
              </button>
              <button
                type="button"
                :class="{ 'is-active': view === 'real' }"
                @click="setView('real')"
              >
                {{ t.viewReal }}
              </button>
            </div>
          </header>

          <div class="readout__primary">
            <span class="readout__cap">{{ capCaption }}</span>
            <p class="readout__figure">
              {{ primaryFigure }}
            </p>
            <p class="readout__today">
              {{ otherFigure.label }} — <b>{{ otherFigure.value }}</b>
            </p>
          </div>

          <p class="fire" :class="{ 'fire--off': !fire.reached }">
            <span class="fire__dot" aria-hidden="true" />
            <template v-if="fire.reached">
              {{ t.fireReached }} <b>{{ fire.year }} {{ t.yearsUnit }}</b>
            </template>
            <template v-else>
              {{ t.fireNot }} {{ inputs.years }} {{ t.yearsUnit }}
            </template>
          </p>

          <dl class="readout__strip">
            <div class="readout__cell">
              <dt>{{ t.summaryPassive }}</dt>
              <dd>{{ passiveValue }}</dd>
            </div>
            <div class="readout__cell">
              <dt>{{ t.freedom }}</dt>
              <dd>{{ freedomCell }}</dd>
            </div>
            <div class="readout__cell">
              <dt>{{ lastCell.label }}</dt>
              <dd>{{ lastCell.value }}</dd>
            </div>
          </dl>

          <div class="goal">
            <div class="seg seg--goal">
              <button
                type="button"
                :class="{ 'is-active': goal.type === 'income' }"
                @click="goal.type = 'income'"
              >
                {{ t.goalIncome }}
              </button>
              <button
                type="button"
                :class="{ 'is-active': goal.type === 'capital' }"
                @click="goal.type = 'capital'"
              >
                {{ t.goalCapital }}
              </button>
            </div>
            <label class="goal__label">{{ t.goalTitle }}</label>
            <div class="goal__input">
              <MoneyInput v-model="goal.amount" :aria-label="t.goalTitle" />
            </div>
          </div>
        </section>

        <section class="screen">
          <header class="screen__head">
            <span class="sec"><b>03</b>{{ t.chartTitle }}</span>
            <div class="screen__controls">
              <button
                type="button"
                class="chip-toggle"
                :class="{ 'is-active': scenariosOn }"
                @click="scenariosOn = !scenariosOn"
              >
                {{ t.scenarios }}
              </button>
              <div class="legend">
                <span v-for="(s, i) in chartSeries" :key="i" class="legend__item">
                  <span class="legend__mark" :style="{ background: s.color }" />
                  {{ s.name }}
                </span>
                <span v-if="scenariosOn" class="legend__item">
                  <span class="legend__mark legend__mark--band" />
                  {{ t.scenarioBand }}
                </span>
              </div>
            </div>
          </header>
          <CapitalChart
            :labels="chartLabels"
            :series="chartSeries"
            :band="scenarioBand"
            :format-value="formatMoney"
            :axis-label="axisLabel"
            :year-suffix="t.yearsUnit"
            :marker-year="fire.reached ? fire.year : null"
            :marker-label="t.fireMarker"
            :goal-value="goalLine"
            :goal-label="t.goalMarker"
          />
        </section>
      </div>
    </div>

    <!-- ===== Table ===== -->
    <section class="ledger">
      <header class="ledger__head">
        <span class="sec"><b>04</b>{{ t.tableTitle }}</span>
        <div class="ledger__tools">
          <button type="button" class="ledger__btn" :class="{ 'is-copied': copied }" @click="copyShareLink">
            ⎘ {{ copied ? t.copied : t.share }}
          </button>
          <button type="button" class="ledger__btn" @click="exportPdf">
            ↓ {{ t.savePdf }}
          </button>
        </div>
      </header>
      <div class="ledger__scroll">
        <table class="ledger__table">
          <thead>
            <tr>
              <th>{{ t.cols.year }}</th>
              <th>{{ t.cols.income }}</th>
              <th>{{ t.cols.expenses }}</th>
              <th>{{ t.cols.delta }}</th>
              <th>{{ t.cols.saved }}</th>
              <th>{{ t.cols.intPrev }}</th>
              <th>{{ t.cols.intCur }}</th>
              <th>{{ t.cols.oneTime }}</th>
              <th>{{ t.cols.capital }}</th>
              <th>{{ t.cols.capitalToday }}</th>
              <th>{{ t.cols.pd }}</th>
              <th>{{ t.cols.pdToday }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="row in rows" :key="row.year">
              <tr :class="{ 'is-event': row.oneTime !== 0 }">
                <td class="col-year">
                  {{ row.year }}
                </td>
                <td>{{ formatMoney(row.income) }}</td>
                <td>{{ formatMoney(row.expenses) }}</td>
                <td :class="row.monthlyDelta >= 0 ? '' : 'is-neg'">
                  {{ formatMoney(row.monthlyDelta) }}
                </td>
                <td>{{ formatMoney(row.annualSavings) }}</td>
                <td>{{ formatMoney(row.interestOnPrevCapital) }}</td>
                <td>{{ formatMoney(row.interestOnCurrentSavings) }}</td>
                <td :class="{ 'is-neg': row.oneTime < 0, 'is-pos': row.oneTime > 0 }">
                  {{ row.oneTime !== 0 ? `${row.oneTime > 0 ? '+' : '−'}${formatMoney(Math.abs(row.oneTime))}` : '—' }}
                </td>
                <td class="col-capital">
                  {{ formatMoney(row.newCapital) }}
                </td>
                <td>{{ formatMoney(row.capitalInTodayPrices) }}</td>
                <td>{{ formatMoney(row.passiveIncomeMonth) }}</td>
                <td>{{ formatMoney(row.passiveIncomeMonthToday) }}</td>
              </tr>
              <tr v-if="row.oneTimeDetails" class="row-detail">
                <td colspan="12">
                  {{ row.oneTimeDetails }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ===== Analysis ===== -->
    <div class="analysis">
      <section class="apanel">
        <header class="apanel__head">
          <span class="sec"><b>05</b>{{ t.drawTitle }}</span>
        </header>
        <p class="apanel__hint">
          {{ t.drawHint }}
        </p>
        <div class="slider">
          <div class="slider__head">
            <span class="slider__label">{{ t.drawRate }}</span>
            <span class="slider__value">{{ withdrawalRate }}<i>%</i></span>
          </div>
          <input
            v-model.number="withdrawalRate"
            type="range"
            class="slider__input"
            min="2"
            max="8"
            step="0.5"
            :aria-label="t.drawRate"
            :style="{ '--progress': drawProgress }"
          >
        </div>
        <dl class="draw">
          <div class="draw__cell">
            <dt>{{ t.drawIncome }}</dt>
            <dd>{{ formatMoney(drawdown.monthlyNominal) }}</dd>
            <span class="draw__sub">{{ t.drawToday }} — {{ formatMoney(drawdown.monthlyToday) }}</span>
          </div>
          <div class="draw__verdict" :class="drawdown.sustainable ? 'is-ok' : 'is-warn'">
            <span class="draw__dot" aria-hidden="true" />
            <span>
              <template v-if="drawdown.sustainable">
                {{ t.drawSustain }} · <b>≥ {{ drawdown.maxYears }} {{ t.yearsUnit }}</b>
              </template>
              <template v-else>
                {{ t.drawLast }} <b>{{ drawdown.yearsLast }} {{ t.yearsUnit }}</b>
              </template>
            </span>
          </div>
        </dl>
      </section>

      <section class="apanel">
        <header class="apanel__head">
          <span class="sec"><b>06</b>{{ t.sensTitle }}</span>
        </header>
        <p class="apanel__hint">
          {{ t.sensHint }}
        </p>
        <table class="sens">
          <thead>
            <tr>
              <th />
              <th>{{ isRu ? '−2 п.п.' : '−2pp' }}</th>
              <th>{{ isRu ? '+2 п.п.' : '+2pp' }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="sens__factor">
                {{ t.sensRate }}
              </td>
              <td :class="sensitivity.rate.minusPct >= 0 ? 'is-pos' : 'is-neg'">
                {{ pct(sensitivity.rate.minusPct) }}
              </td>
              <td :class="sensitivity.rate.plusPct >= 0 ? 'is-pos' : 'is-neg'">
                {{ pct(sensitivity.rate.plusPct) }}
              </td>
            </tr>
            <tr>
              <td class="sens__factor">
                {{ t.sensInflation }}
              </td>
              <td :class="sensitivity.inflation.minusPct >= 0 ? 'is-pos' : 'is-neg'">
                {{ pct(sensitivity.inflation.minusPct) }}
              </td>
              <td :class="sensitivity.inflation.plusPct >= 0 ? 'is-pos' : 'is-neg'">
                {{ pct(sensitivity.inflation.plusPct) }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>

    <!-- ===== Methodology ===== -->
    <section class="method">
      <header class="method__head">
        <span class="sec"><b>07</b>{{ t.methodTitle }}</span>
      </header>
      <div class="method__grid">
        <div v-for="(item, i) in methodItems" :key="i" class="note">
          <h4 class="note__title">
            {{ item.title }}
          </h4>
          <p class="note__text">
            {{ item.text }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/helpers/functions';
@use '@/assets/styles/helpers/media';

.cap {
  font-family: var(--cap-sans);
  color: var(--cap-ink);

  &__frame {
    display: grid;
    grid-template-columns: minmax(0, 366px) minmax(0, 1fr);
    border: 1px solid var(--cap-rule-strong);
    border-radius: 3px;
    background: var(--cap-paper);
    overflow: hidden;

    @include media.lg-down {
      grid-template-columns: 1fr;
    }
  }
}

// ---- shared atoms ----
.sec {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--cap-mono);
  font-size: functions.rem(11);
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cap-ink-2);

  b {
    color: var(--cap-red);
    font-weight: 600;
  }

  &--sub {
    color: var(--cap-ink-3);
  }
}

.linkbtn {
  font-family: var(--cap-mono);
  font-size: functions.rem(11);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cap-ink-3);
  background: none;
  border: none;
  padding: 4px 2px;
  cursor: pointer;
  transition: color 0.16s ease;

  &:hover {
    color: var(--cap-red);
  }
}

// segmented control
.seg {
  display: inline-flex;
  border: 1px solid var(--cap-rule-strong);
  border-radius: 2px;
  overflow: hidden;

  button {
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cap-ink-3);
    background: var(--cap-paper);
    border: none;
    padding: 7px 12px;
    cursor: pointer;
    transition: color 0.16s ease, background 0.16s ease;

    & + button {
      border-left: 1px solid var(--cap-rule-strong);
    }

    &.is-active {
      color: var(--cap-paper);
      background: var(--cap-red);
    }

    &:not(.is-active):hover {
      color: var(--cap-ink);
    }
  }
}

// ---- controls ----
.ctl {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border-right: 1px solid var(--cap-rule);

  @include media.lg-down {
    border-right: none;
    border-bottom: 1px solid var(--cap-rule);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--cap-rule);
  }
}

.presets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  &__chip {
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--cap-ink-2);
    background: var(--cap-paper);
    border: 1px solid var(--cap-rule-strong);
    border-radius: 2px;
    padding: 7px 11px;
    cursor: pointer;
    transition: color 0.16s ease, border-color 0.16s ease, background 0.16s ease;

    &:hover {
      color: var(--cap-ink);
      border-color: var(--cap-ink-3);
    }

    &.is-active {
      color: var(--cap-red);
      border-color: var(--cap-red);
      background: color-mix(in oklch, var(--cap-red) 6%, transparent);
    }
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;

  &__label {
    font-size: functions.rem(12.5);
    color: var(--cap-ink-2);
  }
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @include media.xs-down {
    grid-template-columns: 1fr;
  }
}

// ---- sliders ----
.sliders {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.slider {
  display: flex;
  flex-direction: column;
  gap: 9px;

  &__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  &__label {
    font-size: functions.rem(12.5);
    color: var(--cap-ink-2);
  }

  &__value {
    font-family: var(--cap-mono);
    font-size: functions.rem(13);
    font-weight: 600;
    font-feature-settings: 'tnum' 1;
    color: var(--cap-ink);

    i {
      margin-left: 3px;
      font-style: normal;
      color: var(--cap-ink-3);
      font-weight: 400;
    }
  }

  &__input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      to right,
      var(--cap-red) var(--progress, 0%),
      var(--cap-rule-strong) var(--progress, 0%)
    );
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 13px;
      height: 13px;
      background: var(--cap-red);
      box-shadow: 0 0 0 2px var(--cap-paper), 0 0 0 3px var(--cap-ink);
      transition: transform 0.14s ease;
    }

    &::-webkit-slider-thumb:hover {
      transform: scale(1.18);
    }

    &::-moz-range-thumb {
      width: 13px;
      height: 13px;
      border: none;
      border-radius: 0;
      background: var(--cap-red);
      box-shadow: 0 0 0 2px var(--cap-paper), 0 0 0 3px var(--cap-ink);
      cursor: pointer;
    }
  }
}

// ---- one-time events ----
.exp {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid var(--cap-rule);

  &__hint {
    font-size: functions.rem(12);
    line-height: 1.45;
    color: var(--cap-ink-3);
    margin: 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__add {
    font-family: var(--cap-mono);
    font-size: functions.rem(12);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cap-ink-2);
    background: none;
    border: 1px dashed var(--cap-rule-strong);
    border-radius: 2px;
    padding: 11px;
    cursor: pointer;
    transition: color 0.16s ease, border-color 0.16s ease;

    &:hover {
      color: var(--cap-red);
      border-color: var(--cap-red);
    }
  }
}

.event {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px;
  border: 1px solid var(--cap-rule);
  border-radius: 2px;

  &__top {
    display: flex;
    gap: 6px;
  }

  &__dir {
    flex-shrink: 0;
    width: 30px;
    font-family: var(--cap-mono);
    font-size: functions.rem(16);
    line-height: 1;
    background: var(--cap-paper);
    border: 1px solid var(--cap-rule-strong);
    border-radius: 2px;
    cursor: pointer;
    transition: color 0.16s ease, border-color 0.16s ease, background 0.16s ease;

    &.is-out {
      color: var(--cap-red);
    }

    &.is-in {
      color: var(--cap-paper);
      background: var(--cap-ink);
      border-color: var(--cap-ink);
    }
  }

  &__name {
    flex: 1;
    min-width: 0;
    padding: 9px 10px;
    font-family: var(--cap-sans);
    font-size: functions.rem(13);
    color: var(--cap-ink);
    background: var(--cap-paper);
    border: 1px solid var(--cap-rule-strong);
    border-radius: 2px;
    outline: none;

    &::placeholder {
      color: var(--cap-ink-3);
    }

    &:focus {
      border-color: var(--cap-red);
    }
  }

  &__remove {
    flex-shrink: 0;
    width: 30px;
    font-size: functions.rem(12);
    color: var(--cap-ink-3);
    background: var(--cap-paper);
    border: 1px solid var(--cap-rule-strong);
    border-radius: 2px;
    cursor: pointer;
    transition: color 0.16s ease, border-color 0.16s ease;

    &:hover {
      color: var(--cap-red);
      border-color: var(--cap-red);
    }
  }

  &__bot {
    display: grid;
    grid-template-columns: 1fr 64px;
    gap: 6px;
  }

  &__year {
    width: 100%;
    padding: 9px;
    font-family: var(--cap-mono);
    font-size: functions.rem(13);
    text-align: center;
    color: var(--cap-ink);
    background: var(--cap-paper);
    border: 1px solid var(--cap-rule-strong);
    border-radius: 2px;
    outline: none;

    &:focus {
      border-color: var(--cap-red);
    }
  }
}

// ---- output ----
.out {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  min-width: 0;
}

.readout {
  display: flex;
  flex-direction: column;
  gap: 18px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  &__primary {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__cap {
    font-family: var(--cap-mono);
    font-size: functions.rem(11.5);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cap-ink-3);
  }

  &__figure {
    font-family: var(--cap-display);
    font-weight: 600;
    font-size: clamp(38px, 6.2vw, 64px);
    line-height: 0.96;
    letter-spacing: -0.02em;
    font-feature-settings: 'tnum' 1;
    color: var(--cap-red);
    margin: 0;
  }

  &__today {
    font-size: functions.rem(14);
    color: var(--cap-ink-2);
    margin: 0;

    b {
      font-family: var(--cap-mono);
      font-weight: 600;
      font-feature-settings: 'tnum' 1;
      color: var(--cap-ink);
    }
  }

  &__strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--cap-rule);
    border-radius: 3px;
    margin: 0;

    @include media.xs-down {
      grid-template-columns: 1fr;
    }
  }

  &__cell {
    padding: 14px 16px;

    & + & {
      border-left: 1px solid var(--cap-rule);

      @include media.xs-down {
        border-left: none;
        border-top: 1px solid var(--cap-rule);
      }
    }

    dt {
      font-family: var(--cap-mono);
      font-size: functions.rem(10.5);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--cap-ink-3);
      margin-bottom: 9px;
    }

    dd {
      margin: 0;
      font-family: var(--cap-display);
      font-weight: 600;
      font-size: clamp(17px, 2.3vw, 22px);
      font-feature-settings: 'tnum' 1;
      color: var(--cap-ink);
    }
  }
}

.fire {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: functions.rem(13.5);
  color: var(--cap-ink-2);
  margin: 0;

  b {
    color: var(--cap-red);
    font-weight: 600;
  }

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cap-red);
    flex-shrink: 0;
  }

  &--off {
    color: var(--cap-ink-3);

    .fire__dot {
      background: var(--cap-rule-strong);
    }
  }
}

.goal {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px 14px;
  padding-top: 18px;
  border-top: 1px solid var(--cap-rule);

  &__label {
    grid-row: 2;
    grid-column: 1;
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--cap-ink-3);
  }

  .seg--goal {
    grid-row: 1;
    grid-column: 1 / -1;
    justify-self: start;
  }

  &__input {
    grid-row: 2;
    grid-column: 2;
    min-width: 0;
  }
}

// ---- chart screen ----
.screen {
  border: 1px solid var(--cap-rule);
  border-radius: 3px;
  padding: 16px 16px 6px;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 8px;
  }
}

.legend {
  display: flex;
  gap: 16px;

  &__item {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--cap-mono);
    font-size: functions.rem(10.5);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cap-ink-2);
  }

  &__mark {
    width: 14px;
    height: 3px;
  }
}

// ---- ledger / table ----
.ledger {
  margin-top: 24px;
  border: 1px solid var(--cap-rule-strong);
  border-radius: 3px;
  background: var(--cap-paper);

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--cap-rule);
  }

  &__tools {
    display: flex;
    gap: 8px;
  }

  &__btn {
    font-family: var(--cap-mono);
    font-size: functions.rem(11);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cap-ink-2);
    background: none;
    border: 1px solid var(--cap-rule-strong);
    border-radius: 2px;
    padding: 8px 14px;
    cursor: pointer;
    transition: color 0.16s ease, border-color 0.16s ease;

    &:hover {
      color: var(--cap-red);
      border-color: var(--cap-red);
    }

    &.is-copied {
      color: var(--cap-red);
      border-color: var(--cap-red);
    }
  }

  &__scroll {
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--cap-mono);
    font-size: functions.rem(12);
    font-feature-settings: 'tnum' 1;
    white-space: nowrap;

    th,
    td {
      padding: 9px 14px;
      text-align: right;
      border-bottom: 1px solid var(--cap-rule);
    }

    th {
      font-family: var(--cap-mono);
      font-weight: 500;
      font-size: functions.rem(10);
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--cap-ink-3);
      white-space: normal;
      min-width: functions.rem(74);
      border-bottom: 1px solid var(--cap-rule-strong);
      vertical-align: bottom;
    }

    th:first-child,
    td:first-child {
      text-align: center;
      min-width: functions.rem(40);
    }

    td {
      color: var(--cap-ink-2);
    }

    tbody tr:hover {
      background: var(--cap-panel);
    }

    .col-year {
      color: var(--cap-ink-3);
    }

    .col-capital {
      font-weight: 600;
      color: var(--cap-ink);
    }

    .is-neg {
      color: var(--cap-red-deep);
    }

    .is-pos {
      color: var(--cap-ink);
      font-weight: 600;
    }

    .is-event {
      background: var(--cap-panel-sunk);

      .col-year {
        color: var(--cap-red);
        font-weight: 600;
      }
    }

    .row-detail td {
      text-align: left;
      font-size: functions.rem(11);
      color: var(--cap-ink-3);
      background: var(--cap-panel-sunk);
      white-space: normal;
    }
  }
}

// ---- chart scenario toggle ----
.screen__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.chip-toggle {
  font-family: var(--cap-mono);
  font-size: functions.rem(10.5);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cap-ink-3);
  background: var(--cap-paper);
  border: 1px solid var(--cap-rule-strong);
  border-radius: 2px;
  padding: 5px 10px;
  cursor: pointer;
  transition: color 0.16s ease, border-color 0.16s ease, background 0.16s ease;

  &:hover {
    color: var(--cap-ink);
  }

  &.is-active {
    color: var(--cap-red);
    border-color: var(--cap-red);
    background: color-mix(in oklch, var(--cap-red) 6%, transparent);
  }
}

.legend__mark--band {
  height: 9px;
  background: color-mix(in oklch, var(--cap-red) 18%, var(--cap-paper));
  border: 1px solid color-mix(in oklch, var(--cap-red) 30%, transparent);
}

// ---- analysis (drawdown + sensitivity) ----
.analysis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;

  @include media.md-down {
    grid-template-columns: 1fr;
  }
}

.apanel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px;
  border: 1px solid var(--cap-rule-strong);
  border-radius: 3px;
  background: var(--cap-paper);

  &__head {
    padding-bottom: 14px;
    border-bottom: 1px solid var(--cap-rule);
  }

  &__hint {
    font-size: functions.rem(12.5);
    line-height: 1.5;
    color: var(--cap-ink-3);
    margin: 0;
  }
}

.draw {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;

  &__cell {
    dt {
      font-family: var(--cap-mono);
      font-size: functions.rem(10.5);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--cap-ink-3);
      margin-bottom: 8px;
    }

    dd {
      margin: 0 0 4px;
      font-family: var(--cap-display);
      font-weight: 600;
      font-size: clamp(20px, 2.6vw, 28px);
      font-feature-settings: 'tnum' 1;
      color: var(--cap-ink);
    }
  }

  &__sub {
    font-size: functions.rem(12.5);
    color: var(--cap-ink-3);

    b {
      color: var(--cap-ink-2);
    }
  }

  &__verdict {
    display: flex;
    align-items: center;
    gap: 9px;
    padding-top: 14px;
    border-top: 1px solid var(--cap-rule);
    font-size: functions.rem(13);
    color: var(--cap-ink-2);

    b {
      font-weight: 600;
    }

    &.is-ok b {
      color: var(--cap-ink);
    }

    &.is-warn b {
      color: var(--cap-red);
    }
  }

  &__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    background: var(--cap-ink);
  }

  .is-warn &__dot {
    background: var(--cap-red);
  }
}

.sens {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--cap-mono);
  font-feature-settings: 'tnum' 1;

  th,
  td {
    padding: 10px 12px;
    text-align: right;
    border-bottom: 1px solid var(--cap-rule);
  }

  th {
    font-size: functions.rem(10);
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--cap-ink-3);
    border-bottom: 1px solid var(--cap-rule-strong);
  }

  td {
    font-size: functions.rem(14);
    font-weight: 600;
    color: var(--cap-ink-2);

    &.sens__factor {
      text-align: left;
      font-family: var(--cap-sans);
      font-weight: 400;
      color: var(--cap-ink-2);
    }

    &.is-pos {
      color: var(--cap-ink);
    }

    &.is-neg {
      color: var(--cap-red-deep);
    }
  }
}

// ---- methodology ----
.method {
  margin-top: 24px;
  padding: 24px;
  border: 1px solid var(--cap-rule);
  border-radius: 3px;

  &__head {
    padding-bottom: 18px;
    border-bottom: 1px solid var(--cap-rule);
    margin-bottom: 20px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 40px;

    @include media.md-down {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
}

.note {
  max-width: 62ch;

  &__title {
    font-family: var(--cap-mono);
    font-size: functions.rem(11.5);
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--cap-red);
    margin: 0 0 8px;
  }

  &__text {
    font-size: functions.rem(13.5);
    line-height: 1.6;
    color: var(--cap-ink-2);
    margin: 0;
  }
}

// ---- transitions ----
.exp-enter-active,
.exp-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.exp-enter-from,
.exp-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
