export type SelectSize = "sm" | "md" | "lg";

export type SelectVariant = "default" | "outline" | "filled" | "ghost";

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  selectSize?: SelectSize;
  variant?: SelectVariant;
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
  className?: string;
  neumorph: boolean;
}
