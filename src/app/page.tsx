'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { ProductCard, type Product } from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import productsData from '@/data/products.json';

const heroes = [
  {
    image: '/hero-banner.png',
    badge: 'Spring Summer 2026',
    titleLines: ['Designed for', 'the modern', 'uniform'],
    subtitle:
      'A quieter take on luxury with refined layers, precise tailoring, and effortless essentials built to last beyond the season.',
    cta: 'Shop Collection',
    ctaHref: '/products',
    metaLabel: 'Editorial Note',
    metaValue: 'Sharp silhouettes. Cleaner materials. Zero excess.',
  },
  {
    image: '/product-coat.png',
    badge: 'New Arrival',
    titleLines: ['Outerwear with', 'presence, warmth,', 'and restraint'],
    subtitle:
      'Italian wool blends, fluid structure, and premium finishing for the colder months ahead.',
    cta: 'Shop Outerwear',
    ctaHref: '/products?category=women',
    metaLabel: 'Season Focus',
    metaValue: 'Layering pieces with premium weight and a tailored finish.',
  },
];

const categories = [
  {
    title: "Men's",
    description: 'Clean silhouettes, sharp staples, and elevated daily layers.',
    href: '/products?category=men',
    image: '/product-denim.png',
    meta: 'Tailored essentials',
  },
  {
    title: "Women's",
    description: 'Polished drape, confident tailoring, and understated luxury.',
    href: '/products?category=women',
    image: '/product-blazer.png',
    meta: 'Refined wardrobe building',
  },
  {
    title: 'New Arrivals',
    description: 'Just landed pieces with the strongest edit of the season.',
    href: '/products?category=new-arrivals',
    image: '/product-sneakers.png',
    meta: 'Fresh this week',
  },
];

const valueProps = [
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Complimentary delivery on orders over $150.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'A straightforward 30-day return window.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    description: 'Protected payment flow across every transaction.',
  },
  {
    icon: Sparkles,
    title: 'Premium Finish',
    description: 'Materials and trims selected for longevity and feel.',
  },
];

const brandNotes = [
  { label: 'Pieces curated', value: '120+' },
  { label: 'Average rating', value: '4.8/5' },
  { label: 'Repeat customers', value: '68%' },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroes.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const hero = heroes[heroIndex];
  const featuredProducts = productsData.slice(0, 8) as Product[];

  return (
    <div className="pb-6">
      <section className="brand-container py-8 sm:py-10 lg:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="surface-card flex flex-col justify-between rounded-[2.5rem] p-8 sm:p-10 lg:p-12">
            <div>
              <p className="section-kicker">{hero.badge}</p>
              <h1
                key={`hero-title-${heroIndex}`}
                className="display-title mt-6 animate-fade-in-up text-[var(--foreground)]"
              >
                {hero.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p
                key={`hero-copy-${heroIndex}`}
                className="section-copy mt-6 max-w-xl animate-fade-in-up text-base sm:text-lg"
              >
                {hero.subtitle}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={hero.ctaHref} className="button-primary">
                  {hero.cta} <ArrowRight size={14} />
                </Link>
                <Link href="#featured" className="button-secondary">
                  View Featured
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {brandNotes.map((note) => (
                <div
                  key={note.label}
                  className="rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5"
                >
                  <p className="text-2xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                    {note.value}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{note.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card relative min-h-[520px] overflow-hidden rounded-[2.5rem] p-4 sm:p-5">
            {heroes.map((item, index) => (
              <div
                key={item.image}
                className={`absolute inset-4 overflow-hidden rounded-[2rem] transition-opacity duration-700 sm:inset-5 ${
                  index === heroIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.badge}
                  fill
                  preload={index === 0}
                  sizes="(max-width: 1023px) 100vw, 48vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
            ))}

            <div className="absolute inset-x-8 bottom-8 rounded-[2rem] border border-white/15 bg-black/35 p-5 text-white backdrop-blur-md sm:inset-x-10 sm:bottom-10 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
                    {hero.metaLabel}
                  </p>
                  <p className="mt-3 max-w-sm text-lg font-medium tracking-[-0.03em] text-white sm:text-xl">
                    {hero.metaValue}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setHeroIndex((current) => (current - 1 + heroes.length) % heroes.length)
                    }
                    className="icon-button border-white/15 bg-white/10 text-white hover:bg-white hover:text-[var(--foreground)]"
                    aria-label="Previous hero"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroIndex((current) => (current + 1) % heroes.length)}
                    className="icon-button border-white/15 bg-white/10 text-white hover:bg-white hover:text-[var(--foreground)]"
                    aria-label="Next hero"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                {heroes.map((item, index) => (
                  <button
                    key={item.badge}
                    type="button"
                    onClick={() => setHeroIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === heroIndex ? 'w-10 bg-white' : 'w-4 bg-white/35'
                    }`}
                    aria-label={`View ${item.badge}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white/45">
        <div className="brand-container overflow-hidden py-4">
          <div className="animate-marquee text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {Array.from({ length: 8 }).map((_, index) => (
              <span key={index} className="mx-6 inline-flex items-center gap-6">
                <span>Premium quality</span>
                <span className="text-[var(--accent-strong)]">/</span>
                <span>Minimal design</span>
                <span className="text-[var(--accent-strong)]">/</span>
                <span>Thoughtful fit</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-container py-16 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Collections</p>
            <h2 className="section-title mt-4">Shop the strongest edit of the season.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Built around a restrained palette, balanced silhouettes, and premium
            materials for everyday wear with a luxury finish.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 stagger-children">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-[2.25rem]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  {category.meta}
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em]">
                  {category.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
                  {category.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  Explore <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="featured" className="brand-container py-16 lg:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Featured Products</p>
            <h2 className="section-title mt-4">A premium foundation for every wardrobe.</h2>
          </div>
          <Link href="/products" className="button-tertiary">
            View all products <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
        )}
      </section>

      <section className="brand-container py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="surface-card relative overflow-hidden rounded-[2.5rem] p-4 sm:p-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="/product-coat.png"
                alt="Premium tailoring"
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>

          <div className="surface-card rounded-[2.5rem] p-8 sm:p-10 lg:p-12">
            <p className="section-kicker">Our Point of View</p>
            <h2 className="section-title mt-4">
              Modern dressing with fewer, better decisions.
            </h2>
            <p className="section-copy mt-5 text-base">
              LUXE WEAR was built on the idea that premium clothing should feel calm,
              intentional, and endlessly wearable. Every piece is selected for fit,
              finish, and how it moves through real life.
            </p>
            <p className="section-copy mt-4 text-base">
              We prioritize elevated basics, polished tailoring, and outerwear that
              carries weight without feeling heavy. The result is a wardrobe that looks
              edited from every angle.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                  Materials
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Premium cottons, wool blends, and soft-touch technical fabrics.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                  Fit
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Structured where it counts, relaxed where it should feel effortless.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                  Longevity
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  Pieces designed to outlast trend cycles and keep their edge.
                </p>
              </div>
            </div>

            <Link href="/products" className="button-primary mt-8">
              Explore the collection <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--foreground)] py-16 text-white lg:py-20">
        <div className="brand-container">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-kicker text-[var(--accent)]">Why Customers Stay</p>
              <h2 className="section-title mt-4 text-white">
                Elevated basics with service to match.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Premium presentation matters, but the experience has to feel just as
              considered. Every touchpoint is built to be simple, clear, and polished.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {valueProps.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[var(--accent)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
