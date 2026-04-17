'use client';

import Link from 'next/link';
import { ArrowRight, Globe, Mail, MapPin, Play, Share2 } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'New Arrivals', href: '/products?category=new-arrivals' },
    { label: "Men's Collection", href: '/products?category=men' },
    { label: "Women's Collection", href: '/products?category=women' },
    { label: 'Sale Selection', href: '/products?category=sale' },
  ],
  Support: [
    { label: 'Shipping and Returns', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'Care Guide', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
  Company: [
    { label: 'About LUXE WEAR', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Careers', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[#111111] text-white">
      <div className="brand-container py-14 sm:py-16">
        <div className="surface-card mb-12 rounded-[2.25rem] border-white/10 bg-white/[0.06] p-6 shadow-none sm:p-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div>
            <p className="section-kicker text-[var(--accent)]">Private Access</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Join for early access to new drops, refined edits, and members-only offers.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              A quiet weekly note with just the right amount of product news.
            </p>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:min-w-[420px]"
          >
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.08] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/45 focus:border-[var(--accent)]"
            />
            <button type="submit" className="button-primary !bg-white !text-[var(--foreground)]">
              Subscribe <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-white">
              LUXE WEAR
            </p>
            <p className="mt-5 text-sm leading-7 text-white/65">
              Elevated essentials designed for a cleaner, calmer wardrobe. Premium
              materials, tailored silhouettes, and everyday polish.
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[var(--accent)]" />
                contact@luxewear.in
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-[var(--accent)]" />
                <div>
                  <div>Luxe Wear</div>
                  <div>MG Road, Kochi, Kerala - 682011</div>
                  <div>India</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[var(--accent)] font-semibold">📞</span>
                +91 98765 43210
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {[
                { label: 'Instagram', icon: Globe, href: 'https://instagram.com/luxewear.in' },
                { label: 'Facebook', icon: Play, href: 'https://facebook.com/luxewear.in' },
                { label: 'Twitter', icon: Share2, href: 'https://twitter.com/luxewear_in' },
              ].map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-button border-white/10 bg-white/[0.08] text-white hover:bg-white hover:text-[var(--foreground)]"
                  aria-label={`Follow us on ${label}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                {title}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-white/72">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 LUXE WEAR. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        🚀 Designed & Developed by <span className="font-semibold text-white">Ihsan</span>
      </div>
    </footer>
  );
}
