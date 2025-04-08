import React from "react";
import { cn } from "@utils/cn";
import { CheckboxProps, CheckboxSize } from "./InputCheckbox.types";

export const InputCheckbox: React.FC<CheckboxProps> = ({
  checked,
  type = "checkbox",
  onChange,
  label,
  className = "",
  neumorph = false,
  checkboxSize = "md",
  variant = "default",
  disabled = false,
  ...props
}) => {
  const isSwitch = type === "switch";

  const baseStyles = "p-3 rounded focus:outline-none";

  const sizeStyles: Record<CheckboxSize, string> = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const variantStyles: Record<string, string> = {
    default: "bg-white dark:bg-gray-800",
    primary: "border border-gray-300 focus:ring-primary-500",
    secondary: "bg-gray-100 dark:bg-gray-700",
  };

  const neumorphStyles = neumorph
    ? "input-neumorph"
    : "border border-[#e2e8f0] dark:border-[#334155] dark:bg-[#0f172a] dark:text-white";

  const switchTrackStyle = () => {
    if (disabled) return "opacity-50 cursor-not-allowed";

    const base = "w-10 h-6 rounded-full relative transition-colors duration-300";

    if (variant === "primary") {
      return cn(base, checked ? "bg-purple-500" : "bg-gray-300");
    }
    if (variant === "secondary") {
      return cn(base, checked ? "bg-gray-700" : "bg-gray-300");
    }

    // default
    return cn(base, checked ? "bg-blue-500" : "bg-gray-300");
  };

  return (
    <label className={cn("inline-flex items-center cursor-pointer", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          "peer",
          isSwitch && "sr-only",
          !isSwitch &&
            cn(
              baseStyles,
              sizeStyles[checkboxSize],
              variantStyles[variant],
              neumorphStyles,
              className
            )
        )}
        {...props}
      />

      {isSwitch ? (
        <div className={cn(switchTrackStyle(), neumorph && "shadow-neumorph")}>
          <div
            className={cn(
              "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
              checked ? "translate-x-4" : "translate-x-0"
            )}
          />
        </div>
      ) : null}

      {label && <span className="ml-3 text-sm">{label}</span>}
    </label>
  );
};
