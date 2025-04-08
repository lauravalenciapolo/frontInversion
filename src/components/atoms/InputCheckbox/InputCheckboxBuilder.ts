import { CheckboxProps, CheckboxSize, CheckboxVariant, InputType } from "./InputCheckbox.types";

export class InputCheckboxBuilder {
  private props: Partial<CheckboxProps> = {};

  setLabel(label: string) {
    this.props.label = label;
    return this;
  }

  setChecked(checked: boolean) {
    this.props.checked = checked;
    return this;
  }

  setType(type: InputType) {
    this.props.type = type;
    return this;
  }

  setOnChange(onChange: (e: React.ChangeEvent<HTMLInputElement>) => void) {
    this.props.onChange = onChange;
    return this;
  }

  setCheckboxSize(size: CheckboxSize) {
    this.props.checkboxSize = size;
    return this;
  }

  setNeumorph(neumorph: boolean) {
    this.props.neumorph = neumorph;
    return this;
  }

  setVariant(variant: CheckboxVariant) {
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

  build(): CheckboxProps {
    return this.props as CheckboxProps;
  }
}
