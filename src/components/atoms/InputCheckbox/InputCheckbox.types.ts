export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'primary' | 'secondary' ;
export type InputType = 'checkbox' | 'radio' | 'switch';

  export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: InputType;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    className?: string;
    neumorph?: boolean;
    checkboxSize?: CheckboxSize;
    variant?: CheckboxVariant;
    disabled?: boolean;
  }


