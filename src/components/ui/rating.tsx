import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function Rating({
  value,
  size = 14,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Оценка ${value} из 5`}
    >
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          size={size}
          strokeWidth={1.5}
          className={index <= Math.round(value) ? "text-star" : "text-line-strong"}
          fill={index <= Math.round(value) ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}
