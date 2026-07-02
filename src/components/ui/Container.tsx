import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full max-w-[1280px] mx-auto px-6 md:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </Component>
  );
}
