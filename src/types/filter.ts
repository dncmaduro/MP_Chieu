export type FilterType = "text" | "select" | "date";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;

  options?: FilterOption[];
}