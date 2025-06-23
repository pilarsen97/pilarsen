declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<object, object, any>;
  export default component;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

export interface APIResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  status: number;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface NavigationItem {
  label: string;
  href?: string;
  to?: string | object;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  to?: string | object;
  disabled?: boolean;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  permissions?: string[];
}

export interface Theme {
  name: string;
  colors: Record<string, string>;
  isDark: boolean;
}

export type ComponentSize = 'sm' | 'md' | 'lg';
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ButtonVariant = 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary' | 'ghost' | 'link';
