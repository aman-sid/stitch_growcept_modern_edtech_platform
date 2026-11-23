import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-on-surface-variant">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "w-full rounded-xl bg-surface-container-lowest/80 text-on-surface font-sans text-sm placeholder:text-on-surface-variant/60",
            "border border-white/10 hover:border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25",
            "py-3 transition-all duration-200 backdrop-blur-md shadow-inner",
            icon ? "pl-11" : "pl-4",
            rightElement ? "pr-24" : "pr-4",
            className
          )}
          ref={ref}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
