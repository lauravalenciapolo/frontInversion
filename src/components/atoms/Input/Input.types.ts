export type InputSize = 'sm' | 'md' | 'lg';
  export type InputVariant = 'default' | 'outline' | 'filled' | 'ghost';
  
  export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: string;
    placeholder?: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputSize: InputSize,
    neumorph: boolean,
    className?: string,
    variant: InputVariant,
  }
  


