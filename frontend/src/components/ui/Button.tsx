"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "lg";
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
  href?: string;
  target?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  icon: Icon,
  iconPosition = "start",
  href,
  target,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 cursor-pointer select-none whitespace-nowrap";

  const variants = {
    primary:
      "bg-earth-brown text-white hover:bg-earth-brown-dark hover:shadow-lg hover:shadow-earth-brown/20 hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-transparent text-earth-brown border-2 border-earth-brown hover:bg-earth-brown hover:text-white hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent text-concrete-gray hover:text-earth-brown hover:bg-sand-secondary/30",
  };

  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      {Icon && iconPosition === "start" && <Icon size={size === "lg" ? 20 : 18} />}
      {children}
      {Icon && iconPosition === "end" && <Icon size={size === "lg" ? 20 : 18} />}
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
