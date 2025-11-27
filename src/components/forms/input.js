import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const baseStyles =
  "w-full rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 placeholder:text-slate-400 focus:border-white/50 focus:outline-none backdrop-blur-sm";

export const TextField = forwardRef(function TextField(
  { className, ...props },
  ref
) {
  return <input ref={ref} className={cn(baseStyles, className)} {...props} />;
});

export const TextAreaField = forwardRef(function TextAreaField(
  { className, rows = 4, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseStyles, className)}
      {...props}
    />
  );
});

export const SelectField = forwardRef(function SelectField(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(baseStyles, "appearance-none", className)}
      {...props}
    >
      {children}
    </select>
  );
});
