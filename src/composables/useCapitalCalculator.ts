/**
 * useCapitalCalculator Composable
 * Capital-creation & passive-income projection + a planning layer
 * (goal solving, FIRE point, presets, nominal/real view, shareable state).
 *
 * Core model mirrors finance1.club/calc: income grows by `incomeGrowth`,
 * expenses by `inflation`, interest on the year's own contributions counts at
 * half the rate, one-time events are entered in today's prices and inflated to
 * the year they occur. Tax (default 0) keeps full parity with the reference.
 */

import type {
  CalculatorInputs,
  CalculatorSummary,
  CapitalView,
  ChartSeries,
  FireResult,
  Goal,
  GoalResult,
  OneTimeExpense,
  Preset,
  YearRow,
} from '@/types/services';
import { computed, onMounted, reactive, ref } from 'vue';
import { useLanguage } from './useLanguage';

const DEFAULT_INPUTS: CalculatorInputs = {
  initial: 1_000_000,
  income: 200_000,
  expenses: 140_000,
  extraContribution: 0,
  incomeGrowth: 10,
  rate: 15,
  inflation: 10,
  taxRate: 0,
  years: 25,
};

export const PRESETS: Preset[] = [
  { id: 'conservative', label: { ru: 'Консервативный', en: 'Conservative' }, rate: 8, incomeGrowth: 7, inflation: 8 },
  { id: 'balanced', label: { ru: 'Базовый', en: 'Balanced' }, rate: 12, incomeGrowth: 10, inflation: 8 },
  { id: 'aggressive', label: { ru: 'Агрессивный', en: 'Aggressive' }, rate: 18, incomeGrowth: 12, inflation: 8 },
];

/**
 * Pure projection — no Vue, fully testable.
 */
export function computeProjection(
  inputs: CalculatorInputs,
  events: OneTimeExpense[],
  formatMoney: (n: number) => string,
): YearRow[] {
  const incomeGrowth = inputs.incomeGrowth / 100;
  const rate = inputs.rate / 100;
  const inflation = inputs.inflation / 100;
  const tax = Math.min(1, Math.max(0, (inputs.taxRate ?? 0) / 100));
  const netRate = rate * (1 - tax);
  const years = Math.max(1, Math.floor(inputs.years));

  const rows: YearRow[] = [];
  let capital = inputs.initial;

  for (let year = 1; year <= years; year++) {
    const income = year === 1 ? inputs.income : inputs.income * (1 + incomeGrowth) ** (year - 1);
    const expenses = year === 1 ? inputs.expenses : inputs.expenses * (1 + inflation) ** (year - 1);
    const extra = (inputs.extraContribution || 0) * (1 + inflation) ** (year - 1);
    const monthlyDelta = income - expenses + extra;
    const annualSavings = monthlyDelta * 12;
    const interestOnPrevCapital = capital * netRate;
    const interestOnCurrentSavings = annualSavings * netRate * 0.5;

    let oneTimeIn = 0;
    let oneTimeOut = 0;
    const details: string[] = [];
    for (const e of events) {
      if (e.year === year && e.amount > 0) {
        const futureValue = e.amount * (1 + inflation) ** year;
        if (e.kind === 'in') {
          oneTimeIn += futureValue;
          details.push(`+${e.name || '—'}: ${formatMoney(futureValue)}`);
        }
        else {
          oneTimeOut += futureValue;
          details.push(`−${e.name || '—'}: ${formatMoney(futureValue)}`);
        }
      }
    }
    const oneTime = oneTimeIn - oneTimeOut;

    const newCapital
      = capital + interestOnPrevCapital + annualSavings + interestOnCurrentSavings + oneTime;
    const inflationFactor = (1 + inflation) ** year;
    const capitalInTodayPrices = newCapital / inflationFactor;
    const passiveIncomeMonth = (newCapital * netRate) / 12;
    const passiveIncomeMonthToday = passiveIncomeMonth / inflationFactor;

    rows.push({
      year,
      income,
      expenses,
      monthlyDelta,
      annualSavings,
      interestOnPrevCapital,
      interestOnCurrentSavings,
      oneTime,
      oneTimeDetails: details.join(', '),
      newCapital,
      capitalInTodayPrices,
      passiveIncomeMonth,
      passiveIncomeMonthToday,
    });

    capital = newCapital;
  }

  return rows;
}

let expenseUid = 0;

interface ShareState {
  i: CalculatorInputs;
  e: OneTimeExpense[];
  g: Goal;
  v: CapitalView;
}

function decodeState(raw: string): ShareState | null {
  try {
    let b64 = raw.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object' || !parsed.i)
      return null;
    return parsed as ShareState;
  }
  catch {
    return null;
  }
}

export function useCapitalCalculator() {
  const { currentLang } = useLanguage();
  const isRu = computed(() => currentLang.value === 'ru');

  const inputs = reactive<CalculatorInputs>({ ...DEFAULT_INPUTS });
  const oneTimeExpenses = ref<OneTimeExpense[]>([]);
  const goal = reactive<Goal>({ type: 'income', amount: 0 });
  const view = ref<CapitalView>('nominal');
  const copied = ref(false);
  const scenariosOn = ref(false);
  const withdrawalRate = ref(4);

  const moneyFormatter = computed(() =>
    new Intl.NumberFormat(isRu.value ? 'ru-RU' : 'en-US', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }),
  );

  function formatMoney(value: number): string {
    if (!Number.isFinite(value))
      return '∞';
    return moneyFormatter.value.format(Math.round(value));
  }

  function formatNumber(value: number): string {
    return new Intl.NumberFormat(isRu.value ? 'ru-RU' : 'en-US', {
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  }

  const rows = computed<YearRow[]>(() =>
    computeProjection(inputs, oneTimeExpenses.value, formatMoney),
  );

  const summary = computed<CalculatorSummary>(() => {
    const last = rows.value[rows.value.length - 1];
    return {
      finalCapital: last?.newCapital ?? 0,
      finalCapitalToday: last?.capitalInTodayPrices ?? 0,
      passiveIncomeMonth: last?.passiveIncomeMonth ?? 0,
      passiveIncomeMonthToday: last?.passiveIncomeMonthToday ?? 0,
    };
  });

  /** Year passive income (today's prices) first covers current monthly expenses. */
  const fire = computed<FireResult>(() => {
    const target = inputs.expenses;
    const hit = rows.value.find(r => r.passiveIncomeMonthToday >= target && target > 0);
    return { reached: !!hit, year: hit?.year ?? null };
  });

  const netRate = computed(() => (inputs.rate / 100) * (1 - Math.min(1, Math.max(0, inputs.taxRate / 100))));

  const goalResult = computed<GoalResult>(() => {
    const active = goal.amount > 0;
    if (!active)
      return { active: false, requiredCapital: 0, reachedYear: null, progress: 0 };

    const requiredCapital = goal.type === 'income'
      ? (netRate.value > 0 ? (goal.amount * 12) / netRate.value : Number.POSITIVE_INFINITY)
      : goal.amount;

    const hit = rows.value.find(r => r.capitalInTodayPrices >= requiredCapital);
    const last = rows.value[rows.value.length - 1];
    const progress = requiredCapital > 0 && Number.isFinite(requiredCapital)
      ? Math.min(1, (last?.capitalInTodayPrices ?? 0) / requiredCapital)
      : 0;
    return { active: true, requiredCapital, reachedYear: hit?.year ?? null, progress };
  });

  const chartLabels = computed(() => rows.value.map(r => r.year));

  const seriesNominal = computed<ChartSeries>(() => ({
    name: isRu.value ? 'Номинальный капитал' : 'Nominal capital',
    color: 'var(--cap-red)',
    data: rows.value.map(r => r.newCapital),
  }));

  const seriesReal = computed<ChartSeries>(() => ({
    name: isRu.value ? 'В текущих ценах' : 'In today\'s prices',
    color: 'var(--cap-slate)',
    data: rows.value.map(r => r.capitalInTodayPrices),
  }));

  /**
   * Nominal view shows both curves (the smaller real curve sits below — the
   * inflation gap reads at a glance). Real view focuses on the today's-prices
   * curve alone, so the axis scales to it instead of being dwarfed by nominal.
   */
  const chartSeries = computed<ChartSeries[]>(() => {
    if (view.value === 'real')
      return [{ ...seriesReal.value, color: 'var(--cap-red)' }];
    return [
      { ...seriesNominal.value, color: 'var(--cap-red)' },
      { ...seriesReal.value, color: 'var(--cap-slate)' },
    ];
  });

  /** Horizontal goal line, only meaningful against the real-prices series. */
  const goalLine = computed<number | null>(() => {
    if (!goalResult.value.active || view.value !== 'real')
      return null;
    const v = goalResult.value.requiredCapital;
    return Number.isFinite(v) ? v : null;
  });

  // ---- scenario corridor ----
  const SCENARIO_SPREAD = 4; // percentage points around the base investment rate

  const scenarioBand = computed(() => {
    if (!scenariosOn.value)
      return null;
    const lowRate = Math.max(0, inputs.rate - SCENARIO_SPREAD);
    const highRate = inputs.rate + SCENARIO_SPREAD;
    const low = computeProjection({ ...inputs, rate: lowRate }, oneTimeExpenses.value, formatMoney);
    const high = computeProjection({ ...inputs, rate: highRate }, oneTimeExpenses.value, formatMoney);
    const metric = (r: YearRow) => (view.value === 'nominal' ? r.newCapital : r.capitalInTodayPrices);
    return {
      lower: low.map(metric),
      upper: high.map(metric),
      spread: SCENARIO_SPREAD,
      lowRate,
      highRate,
    };
  });

  // ---- sensitivity (final nominal capital under ±2 п.п. of a factor) ----
  const SENS_DELTA = 2;

  function finalCapitalWith(patch: Partial<CalculatorInputs>): number {
    const r = computeProjection({ ...inputs, ...patch }, oneTimeExpenses.value, formatMoney);
    return r[r.length - 1]?.newCapital ?? 0;
  }

  const sensitivity = computed(() => {
    const base = summary.value.finalCapital;
    const factor = (key: 'rate' | 'inflation') => {
      const minus = finalCapitalWith({ [key]: Math.max(0, inputs[key] - SENS_DELTA) });
      const plus = finalCapitalWith({ [key]: inputs[key] + SENS_DELTA });
      return {
        minus,
        plus,
        minusPct: base ? (minus - base) / base : 0,
        plusPct: base ? (plus - base) / base : 0,
      };
    };
    return { delta: SENS_DELTA, base, rate: factor('rate'), inflation: factor('inflation') };
  });

  // ---- drawdown / withdrawal phase ----
  const DRAWDOWN_MAX = 50;

  const drawdown = computed(() => {
    const startCapital = summary.value.finalCapital;
    const w = withdrawalRate.value / 100;
    const r = netRate.value;
    const infl = inputs.inflation / 100;
    const horizonFactor = (1 + infl) ** inputs.years;

    const firstAnnual = startCapital * w;
    const firstMonth = firstAnnual / 12;

    let cap = startCapital;
    let annual = firstAnnual;
    let yearsLast: number | null = null;
    for (let y = 1; y <= DRAWDOWN_MAX; y++) {
      cap = cap * (1 + r) - annual;
      annual *= (1 + infl);
      if (cap <= 0) {
        yearsLast = y;
        break;
      }
    }

    return {
      rate: withdrawalRate.value,
      monthlyNominal: firstMonth,
      monthlyToday: firstMonth / horizonFactor,
      sustainable: yearsLast === null,
      yearsLast,
      maxYears: DRAWDOWN_MAX,
    };
  });

  function addEvent(kind: 'in' | 'out' = 'out'): void {
    oneTimeExpenses.value.push({
      id: ++expenseUid,
      name: '',
      amount: 0,
      year: Math.min(5, inputs.years),
      kind,
    });
  }

  function removeEvent(id: number): void {
    oneTimeExpenses.value = oneTimeExpenses.value.filter(e => e.id !== id);
  }

  function applyPreset(preset: Preset): void {
    inputs.rate = preset.rate;
    inputs.incomeGrowth = preset.incomeGrowth;
    inputs.inflation = preset.inflation;
  }

  function activePresetId(): string | null {
    const match = PRESETS.find(p =>
      p.rate === inputs.rate && p.incomeGrowth === inputs.incomeGrowth && p.inflation === inputs.inflation,
    );
    return match?.id ?? null;
  }

  function setView(next: CapitalView): void {
    view.value = next;
  }

  function reset(): void {
    Object.assign(inputs, DEFAULT_INPUTS);
    oneTimeExpenses.value = [];
    goal.amount = 0;
    goal.type = 'income';
    view.value = 'nominal';
    scenariosOn.value = false;
    withdrawalRate.value = 4;
  }

  // ---- shareable state ----
  function encodeState(): string {
    const payload: ShareState = {
      i: { ...inputs },
      e: oneTimeExpenses.value,
      g: { ...goal },
      v: view.value,
    };
    const bytes = new TextEncoder().encode(JSON.stringify(payload));
    let binary = '';
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    // URL-safe base64 so the value survives the query string unescaped
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function shareUrl(): string {
    const { origin, pathname } = window.location;
    return `${origin}${pathname}?s=${encodeState()}`;
  }

  async function copyShareLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(shareUrl());
      copied.value = true;
      window.setTimeout(() => (copied.value = false), 2000);
    }
    catch {
      copied.value = false;
    }
  }

  function hydrateFromUrl(): void {
    const raw = new URLSearchParams(window.location.search).get('s');
    if (!raw)
      return;
    const state = decodeState(raw);
    if (!state)
      return;
    Object.assign(inputs, { ...DEFAULT_INPUTS, ...state.i });
    if (Array.isArray(state.e)) {
      oneTimeExpenses.value = state.e.map(e => ({
        id: ++expenseUid,
        name: String(e.name ?? ''),
        amount: Number(e.amount) || 0,
        year: Number(e.year) || 1,
        kind: e.kind === 'in' ? 'in' : 'out',
      }));
    }
    if (state.g) {
      goal.type = state.g.type === 'capital' ? 'capital' : 'income';
      goal.amount = Number(state.g.amount) || 0;
    }
    view.value = state.v === 'real' ? 'real' : 'nominal';
  }

  onMounted(hydrateFromUrl);

  return {
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
    presets: PRESETS,
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
  };
}
