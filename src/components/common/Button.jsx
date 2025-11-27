import Link from "next/link";
import { cn } from "@/utils/cn";

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-offset-4";

const variants = {
  primary:
    "bg-gradient-to-r from-primary to-secondary text-white shadow-[0_20px_60px_rgba(255,122,24,0.25)] hover:from-primary/90 hover:to-secondary/90 focus-visible:outline-primary active:from-primary/80 active:to-secondary/80",
  secondary:
    "bg-white/80 text-black ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-white backdrop-blur-sm active:bg-white/30",
  ghost: "text-white/80 hover:text-white active:text-white",
  success:
    "bg-green-600 text-white shadow-lg hover:bg-green-700 focus-visible:outline-green-600 active:bg-green-800",
  danger:
    "bg-red-600 text-white shadow-lg hover:bg-red-700 focus-visible:outline-red-600 active:bg-red-800",
  warning:
    "bg-yellow-600 text-white shadow-lg hover:bg-yellow-700 focus-visible:outline-yellow-600 active:bg-yellow-800",
  info: "bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus-visible:outline-blue-600 active:bg-blue-800",
};

export function Button({
  className,
  variant = "secondary",
  as = "button",
  href,
  children,
  disabled,
  ...props
}) {
  const classes = cn(
    baseStyles,
    variants[variant],
    disabled && "cursor-not-allowed opacity-60",
    className
  );

  if (as === "link" && href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
