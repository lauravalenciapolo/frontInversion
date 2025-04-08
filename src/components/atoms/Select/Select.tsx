import React from "react";
import { cn } from "@utils/cn";
import { SelectProps, SelectSize } from "./Select.types";

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  selectSize = "md",
  neumorph = false,
  className = "",
  ...props
}) => {
  const baseStyles = "w-full flex-grow p-3 rounded-l-lg focus:outline-none";

  const sizeStyles: Record<SelectSize, string> = {
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
      <select
        value={value}
        onChange={onChange}
        className={cn(baseStyles, sizeStyles[selectSize], neumorphStyles, className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;