export type TextareaSize = "sm" | "md" | "lg";

export type TextareaVariant = "default" | "outline" | "filled" | "ghost";

export interface Option {
  value: string | number;
  label: string;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  textareaSize?: TextareaSize;
  variant?: TextareaVariant;
  label?: string;
  options: Option[];
  error?: string;
  fullWidth?: boolean;
  className?: string;
  neumorph: boolean;
}
