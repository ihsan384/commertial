'use client';

const messages = [
  'Free shipping on orders over $150',
  'New season essentials have arrived',
  'Easy 30-day returns',
  'Made for a sharper everyday wardrobe',
];

export function AnnouncementBar() {
  const repeated = [...messages, ...messages];

  return (
    <div className="sticky top-0 z-50 h-10 overflow-hidden border-b border-white/10 bg-[var(--foreground)] text-white">
      <div className="animate-marquee h-full items-center whitespace-nowrap px-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
        {repeated.map((message, index) => (
          <span key={`${message}-${index}`} className="mx-6 inline-flex items-center gap-6">
            <span>{message}</span>
            <span className="text-[var(--accent)]">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
