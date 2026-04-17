'use client';

import { use, useMemo, useState, useTransition } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import { ProductCard, type Product } from '@/components/ui/ProductCard';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/format';
import productsData from '@/data/products.json';

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

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isRouting, startTransition] = useTransition();
  const product = (productsData as Product[]).find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const relatedProducts = (productsData as Product[])
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  const discount = useMemo(() => {
    if (!product.originalPrice) return null;

    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }, [product.originalPrice, product.price]);

  const addCurrentSelection = () => {
    if (!selectedSize) {
      setSizeError(true);
      window.setTimeout(() => setSizeError(false), 1800);
      return false;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    setAddedToCart(true);
    window.setTimeout(() => setAddedToCart(false), 2200);
    return true;
  };

  const handleBuyNow = () => {
    if (!addCurrentSelection()) return;

    startTransition(() => {
      router.push('/cart');
    });
  };

  return (
    <div className="brand-container py-10 lg:py-14">
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
        <Link href="/" className="transition-colors hover:text-[var(--foreground)]">
          Home
        </Link>
        <ChevronRight size={14} />
        <Link href="/products" className="transition-colors hover:text-[var(--foreground)]">
          Products
        </Link>
        <ChevronRight size={14} />
        <span className="font-medium text-[var(--foreground)]">{product.name}</span>
      </div>

      <section className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
        <div className="surface-card rounded-[2.5rem] p-4 sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[92px_1fr]">
            <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
              {product.images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-square min-w-20 overflow-hidden rounded-[1.25rem] border-2 transition ${
                    activeImage === index
                      ? 'border-[var(--foreground)]'
                      : 'border-transparent hover:border-[rgba(183,136,84,0.35)]'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="order-1 relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[var(--background-strong)] lg:order-2">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                preload
                sizes="(max-width: 1279px) 100vw, 52vw"
                className="object-cover"
              />
              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                {product.badge ? (
                  <span className="rounded-full bg-[var(--foreground)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    {product.badge}
                  </span>
                ) : null}
                {discount ? (
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
                    Save {discount}%
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setWishlisted((current) => !current)}
                className={`icon-button absolute right-5 top-5 ${
                  wishlisted ? 'bg-[var(--foreground)] text-white' : ''
                }`}
                aria-label="Save product"
              >
                <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:sticky xl:top-[calc(var(--announcement-height)+var(--nav-height)+24px)]">
          <div className="surface-card rounded-[2.5rem] p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                {product.category}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--foreground)]">
                <Star size={14} className="fill-[var(--accent)] text-[var(--accent)]" />
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-[var(--muted)]">{product.reviews} reviews</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice ? (
                <span className="text-lg text-[var(--muted)] line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              ) : null}
            </div>

            <p className="section-copy mt-6 text-base">{product.description}</p>

            <div className="mt-8 rounded-[1.75rem] border border-[var(--border)] bg-white/70 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                    Color
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)] capitalize">{selectedColor}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      title={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-10 w-10 rounded-full border-2 transition ${
                        selectedColor === color
                          ? 'scale-105 border-[var(--foreground)]'
                          : 'border-white/80 hover:border-[var(--accent-strong)]'
                      }`}
                      style={{ backgroundColor: colorMap[color] ?? '#d1d5db' }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]">
                    Size
                  </p>
                  {sizeError ? (
                    <span className="text-xs font-medium text-[var(--danger)]">
                      Please select a size
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(false);
                      }}
                      className={`min-w-12 rounded-full border px-4 py-3 text-sm font-semibold transition ${
                        selectedSize === size
                          ? 'border-[var(--foreground)] bg-[var(--foreground)] text-white'
                          : 'border-[var(--border)] bg-white text-[var(--foreground)] hover:border-[var(--foreground)]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex h-14 items-center justify-between rounded-full border border-[var(--border)] bg-white px-3 sm:w-[168px]">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  className="icon-button h-9 w-9 border-none bg-transparent shadow-none"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-semibold text-[var(--foreground)]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  className="icon-button h-9 w-9 border-none bg-transparent shadow-none"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                onClick={addCurrentSelection}
                className={`button-primary flex-1 !justify-center ${
                  addedToCart ? '!bg-[var(--success)]' : ''
                }`}
              >
                <ShoppingBag size={16} />
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              disabled={isRouting}
              className="button-secondary mt-3 !w-full !justify-center"
            >
              {isRouting ? 'Opening Cart...' : 'Buy Now'}
            </button>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: Truck,
                  title: 'Fast delivery',
                  description: 'Free shipping over $150.',
                },
                {
                  icon: RotateCcw,
                  title: 'Easy returns',
                  description: '30-day return policy.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Secure payment',
                  description: 'Protected checkout flow.',
                },
              ].map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-4"
                >
                  <Icon size={18} className="text-[var(--accent-strong)]" />
                  <p className="mt-3 text-sm font-semibold text-[var(--foreground)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]"
                >
                  {tag.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          <Link href="/products" className="button-tertiary">
            <ArrowLeft size={14} />
            Back to products
          </Link>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="mt-16 lg:mt-20">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker">Related Products</p>
              <h2 className="section-title mt-4">Complete the wardrobe.</h2>
            </div>
            <Link href="/products" className="button-tertiary">
              View all products <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
