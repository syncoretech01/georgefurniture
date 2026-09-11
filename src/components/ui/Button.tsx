import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "dark" | "paper" | "ghost" | "ghost-light";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-label font-semibold uppercase tracking-[0.12em] whitespace-nowrap transition-[transform,background-color,color,box-shadow] duration-300 ease-out-expo active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-yellow text-graphite hover:bg-yellow-deep shadow-yellow",
  dark: "bg-graphite text-paper hover:bg-graphite-3",
  paper: "bg-paper text-graphite hover:bg-white",
  ghost: "border-2 border-graphite/20 text-graphite hover:border-graphite hover:bg-graphite hover:text-paper",
  "ghost-light": "border-2 border-paper/25 text-paper hover:border-yellow hover:text-yellow",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-[0.875rem]",
  lg: "h-14 px-8 text-[0.9375rem]",
};

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function buttonClass({ variant = "primary", size = "md", className = "" }: Partial<ButtonProps>) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

function Inner({ children, arrow, icon }: Pick<ButtonProps, "children" | "arrow" | "icon">) {
  return (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          className="size-[1.1em] transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          strokeWidth={2.5}
          aria-hidden
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  icon,
  className,
  children,
  ...rest
}: ButtonProps & Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={buttonClass({ variant, size, className })} {...rest}>
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow,
  icon,
  className,
  children,
  ...rest
}: ButtonProps & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </button>
  );
}
