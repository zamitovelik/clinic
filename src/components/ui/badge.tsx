import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "light";

const TONES: Record<Tone, string> = {
  neutral: "border-line bg-milk text-ink-2",
  accent: "border-accent-line bg-accent-soft text-accent",
  light: "border-white/15 bg-white/10 text-white",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1",
        "text-[12px] font-medium whitespace-nowrap",
        TONES[tone],
        className,
      )}
      {...props}
    />
  );
}
