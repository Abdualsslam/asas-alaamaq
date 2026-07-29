import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "right" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "right",
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Engineering line decoration */}
      <div
        className={cn(
          "engineering-line mb-6",
          align === "center" && "mx-auto"
        )}
      />

      <h2
        className={cn(
          "font-bold leading-tight",
          light ? "text-white" : "text-charcoal"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg max-w-2xl leading-relaxed",
            light ? "text-white/70" : "text-concrete-gray",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
