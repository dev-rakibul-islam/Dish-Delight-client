import { cn } from "@/utils/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-sm uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
