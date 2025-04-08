import { InputProps, InputVariant } from "./Input.types";

export class InputBuilder {
  private props: Partial<InputProps> = {};

  setLabel(label: string) {
    this.props.label = label;
    return this;
  }

  setType(type: string) {
    this.props.type = type;
    return this;
  }

  setPlaceholder(placeholder: string) {
    this.props.placeholder = placeholder;
    return this;
  }

  setValue(value: string | number) {
    this.props.value = value;
    return this;
  }

  setOnChange(onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
    this.props.onChange = onChange;
    return this;
  }

  setInputSize(size: "sm" | "md" | "lg") {
    this.props.inputSize = size;
    return this;
  }

  setNeumorph(neumorph: boolean) {
    this.props.neumorph = neumorph;
    return this;
  }

  setVariant(variant: InputVariant) {
    this.props.variant = variant;
    return this;
  }

  setDisabled(disabled: boolean) {
    this.props.disabled = disabled;
    return this;
  }

  setClassName(className: string) {
    this.props.className = className;
    return this;
  }

  build(): InputProps {
    return this.props as InputProps;
  }
}
