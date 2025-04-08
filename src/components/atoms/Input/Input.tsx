import React from "react";
import { cn } from "@utils/cn";
import { InputProps, InputSize } from "./Input.types";

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  inputSize = "md",
  neumorph = false,
  className = "",
  variant = "default",
  ...props
}) => {
  const baseStyles = "flex-grow p-3 rounded-l-lg focus:outline-none";

  const sizeStyles: Record<InputSize, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles: Record<string, string> = {
    default: "bg-white dark:bg-gray-800",
    outline: "border border-gray-300 focus:ring-primary-500",
    filled: "bg-gray-100 dark:bg-gray-700",
    ghost: "bg-transparent",
  };
  const neumorphStyles = neumorph
    ? "input-neumorph"
    : "border border-[#e2e8f0] dark:border-[#334155] dark:bg-[#0f172a] dark:text-white";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={props.disabled}
        className={cn(
          baseStyles,
          sizeStyles[inputSize],
          neumorphStyles,
          variantStyles[variant],
          className
        )}
        {...props}
      />
    </div>
  );
};
