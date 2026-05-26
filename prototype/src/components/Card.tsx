import { LIFE_STAGES, CATEGORIES } from "@/lib/mock-data";
import type { LifeStage, Category } from "@/lib/mock-data";

export function StatCard({
  label, value, sub, color = "#2D6A4F",
}: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="card p-5">
      <div className="text-xs font-semibold text-ink-mid">{label}</div>
      <div className="mt-2 text-3xl font-bold" style={{ color }}>{value}</div>
      {sub && <div className="mt-1 text-xs text-ink-mid">{sub}</div>}
    </div>
  );
}

export function LifeBadge({ stage }: { stage: LifeStage }) {
  const s = LIFE_STAGES[stage];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${s.color}22`, color: s.color }}>
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
      {s.age} {s.label}
    </span>
  );
}

export function CategoryChip({ category, withText = true }: { category: Category; withText?: boolean }) {
  const c = CATEGORIES[category];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${c.color}18`, color: c.color }}>
      <span>{c.emoji}</span>
      {withText && <span>{c.label}</span>}
    </span>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
      <div>
        <h1 className="section-title">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-mid">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
