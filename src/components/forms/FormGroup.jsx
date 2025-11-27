import { cn } from "@/utils/cn";

export function FormGroup({ label, hint, error, children, className }) {
  return (
    <label
      className={cn(
        "flex flex-col gap-2 text-sm font-medium text-slate-700",
        className
      )}
    >
      <span>
        {label}
        {hint && (
          <span className="ml-2 text-xs font-normal text-slate-400">
            {hint}
          </span>
        )}
      </span>
      {children}
      {error && (
        <span className="text-xs font-semibold text-red-500">{error}</span>
      )}
    </label>
  );
}
