import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="surface-card flex flex-col items-center rounded-[2rem] px-6 py-12 text-center sm:px-10 sm:py-16">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
        <Icon size={28} />
      </div>
      {eyebrow ? <p className="section-kicker mb-3">{eyebrow}</p> : null}
      <h2 className="max-w-xl text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-[var(--muted)] sm:text-base">
        {description}
      </p>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
