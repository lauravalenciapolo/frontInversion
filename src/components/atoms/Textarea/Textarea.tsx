import React from "react";
import { cn } from "@utils/cn";
import { TextareaProps, TextareaSize } from "./Textarea.types";

export const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  textareaSize = "md",
  neumorph = false,
  className = "",
  rows = 3,
  ...props
}) => {
  const baseStyles = "w-full flex-grow p-3 rounded-l-lg focus:outline-none";

  const sizeStyles: Record<TextareaSize, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const neumorphStyles = neumorph
  ? "input-neumorph"
  : "border border-[#e2e8f0] dark:border-[#334155] dark:bg-[#0f172a] dark:text-white";

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={cn(baseStyles, sizeStyles[textareaSize], neumorphStyles, className)}
        {...props}
      />
    </div>
  );
};

export default Textarea;