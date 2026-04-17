'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Heart, Star } from 'lucide-react';
import { formatCurrency } from '@/lib/format';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  category: string;
  sizes: string[];
  colors: string[];
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  badge: string | null;
  tags: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const colorMap: Record<string, string> = {
  black: '#111111',
  white: '#f4f4f0',
  gray: '#9ca3af',
  beige: '#d4b896',
  navy: '#1f3556',
  indigo: '#4338ca',
  olive: '#647053',
  khaki: '#b49363',
  cream: '#f4ecdf',
  camel: '#b78658',
  grey: '#9ca3af',
  champagne: '#ebd3aa',
  burgundy: '#7f1d1d',
  sand: '#d7c09b',
  emerald: '#166534',
  blue: '#2563eb',
  pink: '#db2777',
};

export const productBadgeStyles: Record<string, string> = {
  BESTSELLER: 'bg-[var(--foreground)] text-white',
  TRENDING: 'bg-[var(--accent-soft)] text-[var(--accent-strong)]',
  NEW: 'bg-[#e8f2ed] text-[#25634c]',
  HOT: 'bg-[#fbe8e5] text-[#a13f34]',
  SALE: 'bg-[#f4ece0] text-[#8a643d]',
  LUXURY: 'bg-[linear-gradient(135deg,#d5ba8c_0%,#8a643d_100%)] text-white',
};

function DiscountBadge({ product }: { product: Product }) {
  if (!product.originalPrice) return null;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] backdrop-blur-sm">
      Save {discount}%
    </span>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="surface-card group flex h-full flex-col rounded-[2rem] p-3 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_65px_-40px_rgba(17,17,17,0.45)]">
      <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--background-strong)]">
        <Link href={`/products/${product.id}`} className="block h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badge ? (
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${productBadgeStyles[product.badge] ?? productBadgeStyles.BESTSELLER}`}
            >
              {product.badge}
            </span>
          ) : null}
          <DiscountBadge product={product} />
        </div>

        <button
          type="button"
          aria-label={`Save ${product.name}`}
          className="icon-button absolute right-4 top-4 opacity-0 transition duration-300 group-hover:opacity-100"
        >
          <Heart size={16} />
        </button>

        <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/60 bg-white/88 p-3 opacity-0 shadow-[0_20px_45px_-30px_rgba(17,17,17,0.35)] backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Available sizes
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.slice(0, 5).map((size) => (
              <span
                key={size}
                className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground)]"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2">
        <div className="mb-3 flex items-center gap-2 text-xs text-[var(--muted)]">
          <span className="inline-flex items-center gap-1 font-medium text-[var(--foreground)]">
            <Star size={13} className="fill-[var(--accent)] text-[var(--accent)]" />
            {product.rating.toFixed(1)}
          </span>
          <span>{product.reviews} reviews</span>
          <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-strong)]">
            {product.inStock ? 'In Stock' : 'Sold Out'}
          </span>
        </div>

        <Link href={`/products/${product.id}`}>
          <h3 className="min-h-[3rem] text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-strong)]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 min-h-[3rem] text-sm leading-6 text-[var(--muted)] line-clamp-2">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-end gap-2">
            <span className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-sm text-[var(--muted)] line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            ) : null}
          </div>

          <div className="flex items-center -space-x-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color}
                title={color}
                className="h-4 w-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: colorMap[color] ?? '#d1d5db' }}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="button-primary flex-1 !justify-center !px-5 !py-3 text-[11px]"
          >
            View Product
          </Link>
          <Link
            href={`/products/${product.id}`}
            aria-label={`Open ${product.name}`}
            className="icon-button h-11 w-11 shrink-0"
          >
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductListItem({ product }: ProductCardProps) {
  return (
    <article className="surface-card group flex flex-col gap-5 rounded-[2rem] p-4 transition duration-300 hover:shadow-[0_24px_48px_-38px_rgba(17,17,17,0.38)] sm:flex-row sm:p-5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--background-strong)] sm:w-44 sm:shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 639px) 100vw, 176px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
            {product.badge ? (
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${productBadgeStyles[product.badge] ?? productBadgeStyles.BESTSELLER}`}
              >
                {product.badge}
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1 font-medium text-[var(--foreground)]">
              <Star size={13} className="fill-[var(--accent)] text-[var(--accent)]" />
              {product.rating.toFixed(1)}
            </span>
            <span>{product.reviews} reviews</span>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-strong)]">
              {product.name}
            </h3>
          </Link>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {product.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]"
              >
                {tag.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-sm text-[var(--muted)] line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            ) : null}
          </div>

          <div className="flex gap-2">
            <Link
              href={`/products/${product.id}`}
              className="button-secondary !px-5 !py-3 text-[11px]"
            >
              Quick View
            </Link>
            <Link
              href={`/products/${product.id}`}
              className="button-primary !px-5 !py-3 text-[11px]"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
