import { SelectProps } from "./Select.types";

export class SelectBuilder {
  private props: Partial<SelectProps> = {};

  setLabel(label: string) {
    this.props.label = label;
    return this;
  }

  setOptions(options: { value: string; label: string }[]) {
    this.props.options = options;
    return this;
  }

  setValue(value: string) {
    this.props.value = value;
    return this;
  }

  setOnChange(onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void) {
    this.props.onChange = onChange;
    return this;
  }

  setSelectSize(size: "sm" | "md" | "lg") {
    this.props.selectSize = size;
    return this;
  }

  setNeumorph(neumorph: boolean) {
    this.props.neumorph = neumorph;
    return this;
  }

  build(): SelectProps {
    return this.props as SelectProps;
  }
}
