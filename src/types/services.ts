/**
 * Services Types
 * Types for the services section and its apps (capital calculator, etc.)
 */

import type { LocalizedText } from './portfolio';

// ============================================
// Capital Calculator
// ============================================

/** Direction of a one-time cash event: money out (expense) or in (windfall) */
export type CashEventKind = 'out' | 'in';

export interface OneTimeExpense {
  id: number;
  name: string;
  /** Amount in today's prices (₽) */
  amount: number;
  /** Year (1-based) when the event happens */
  year: number;
  /** Whether the event subtracts (expense) or adds (windfall) to capital */
  kind: CashEventKind;
}

export interface CalculatorInputs {
  /** Starting capital (₽) */
  initial: number;
  /** Current monthly income (₽) */
  income: number;
  /** Current monthly expenses (₽) */
  expenses: number;
  /** Extra fixed monthly contribution on top of income − expenses (₽) */
  extraContribution: number;
  /** Annual income growth (%) */
  incomeGrowth: number;
  /** Investment rate (% per year) */
  rate: number;
  /** Inflation (% per year) */
  inflation: number;
  /** Tax on investment income (%) — 0 disables it */
  taxRate: number;
  /** Calculation horizon (years) */
  years: number;
}

export interface YearRow {
  year: number;
  income: number;
  expenses: number;
  monthlyDelta: number;
  annualSavings: number;
  interestOnPrevCapital: number;
  interestOnCurrentSavings: number;
  /** Signed net of one-time events this year (in − out), nominal */
  oneTime: number;
  oneTimeDetails: string;
  newCapital: number;
  capitalInTodayPrices: number;
  passiveIncomeMonth: number;
  passiveIncomeMonthToday: number;
}

export interface CalculatorSummary {
  finalCapital: number;
  finalCapitalToday: number;
  passiveIncomeMonth: number;
  passiveIncomeMonthToday: number;
}

export interface ChartSeries {
  name: string;
  color: string;
  data: number[];
}

// ---- Planning layer ----

export type CapitalView = 'nominal' | 'real';

export type GoalType = 'income' | 'capital';

export interface Goal {
  type: GoalType;
  /** Target monthly passive income OR target capital, in today's prices (₽) */
  amount: number;
}

export interface FireResult {
  reached: boolean;
  /** Year passive income (today's prices) first covers current monthly expenses */
  year: number | null;
}

export interface GoalResult {
  active: boolean;
  /** Required capital in today's prices (₽) */
  requiredCapital: number;
  reachedYear: number | null;
  /** 0..1 progress at the end of the horizon */
  progress: number;
}

export interface Preset {
  id: string;
  label: LocalizedText;
  rate: number;
  incomeGrowth: number;
  inflation: number;
}

// ============================================
// Services catalog (apps shown in the section)
// ============================================

export type ServiceAppStatus = 'live' | 'soon';

export interface ServiceApp {
  slug: string;
  icon: string;
  title: LocalizedText;
  description: LocalizedText;
  status: ServiceAppStatus;
  /** Route for live apps; omitted for upcoming ones */
  to?: string;
  /** Short tag shown on the card (e.g. "Финансы") */
  tag?: LocalizedText;
}
