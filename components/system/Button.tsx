import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders to the right of the label; inherits currentColor. */
  trailing?: ReactNode;
  disabled?: boolean;
  "aria-label"?: string;
};

const VARIANTS: Record<Variant, string> = {
  // 12.4:1 contrast. The only filled-signal element on any screen.
  primary:
    "bg-signal text-ink font-semibold hover:bg-white active:bg-signal-deep border border-signal hover:border-white",
  ghost:
    "bg-transparent text-paper border border-steel-hi hover:border-signal hover:text-signal",
  quiet:
    "bg-transparent text-mist border border-transparent hover:text-paper underline-offset-4 hover:underline px-0",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className,
  trailing,
  disabled,
  ...rest
}: Props) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2.5 select-none",
    "font-mono uppercase tracking-[0.14em] whitespace-nowrap",
    "transition-colors duration-200 ease-out rounded-none",
    VARIANTS[variant],
    variant !== "quiet" && SIZES[size],
    disabled && "opacity-40 pointer-events-none",
    className
  );

  const inner = (
    <>
      {children}
      {trailing ? (
        <span className="transition-transform duration-200 ease-out group-hover:translate-x-1">
          {trailing}
        </span>
      ) : null}
    </>
  );

  if (href) {
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...rest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {inner}
    </button>
  );
}
