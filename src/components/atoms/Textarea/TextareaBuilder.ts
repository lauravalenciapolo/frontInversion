import { TextareaProps } from "./Textarea.types";

export class TextareaBuilder {
  private props: Partial<TextareaProps> = {};

  setLabel(label: string) {
    this.props.label = label;
    return this;
  }

  setPlaceholder(placeholder: string) {
    this.props.placeholder = placeholder;
    return this;
  }

  setValue(value: string) {
    this.props.value = value;
    return this;
  }

  setOnChange(onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) {
    this.props.onChange = onChange;
    return this;
  }

  setSize(size: "sm" | "md" | "lg") {
    this.props.textareaSize = size;
    return this;
  }

  setRows(rows: number) {
    this.props.rows = rows;
    return this;
  }

  setNeumorph(neumorph: boolean) {
    this.props.neumorph = neumorph;
    return this;
  }

  build(): TextareaProps {
    return this.props as TextareaProps;
  }
}
