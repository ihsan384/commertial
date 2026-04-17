'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ChevronDown,
  Grid,
  LayoutList,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProductCard, ProductListItem, type Product } from '@/components/ui/ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { formatCollectionLabel } from '@/lib/format';
import productsData from '@/data/products.json';

const CATEGORIES = ['All', 'men', 'women', 'new-arrivals', 'sale'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const PRICE_RANGES = [
  { label: 'Under $75', min: 0, max: 75 },
  { label: '$75 - $150', min: 75, max: 150 },
  { label: '$150 - $250', min: 150, max: 250 },
  { label: 'Over $250', min: 250, max: Infinity },
];
const SORT_OPTIONS = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Best Rated'];

function categoryLabel(category: string) {
  if (category === 'men') return "Men's";
  if (category === 'women') return "Women's";
  if (category === 'new-arrivals') return 'New Arrivals';
  if (category === 'sale') return 'Sale';

  return category;
}

function FilterPanel({
  isOpen,
  onClose,
  activeCategory,
  setActiveCategory,
  activeSizes,
  toggleSize,
  activePrice,
  setActivePrice,
  clearSizes,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeSizes: string[];
  toggleSize: (size: string) => void;
  activePrice: number | null;
  setActivePrice: (index: number | null) => void;
  clearSizes: () => void;
}) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close filters"
        />
      ) : null}

      <aside
        className={`surface-card fixed left-0 top-0 z-40 h-full w-[min(88vw,360px)] rounded-none border-y-0 border-l-0 p-6 transition duration-300 lg:sticky lg:top-[calc(var(--announcement-height)+var(--nav-height)+24px)] lg:h-fit lg:w-full lg:max-w-[290px] lg:rounded-[2rem] lg:border lg:bg-white/70 lg:p-6 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="mb-8 flex items-center justify-between lg:mb-6">
          <div>
            <p className="section-kicker">Filters</p>
            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
              Refine the edit
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="icon-button lg:hidden"
            aria-label="Close filters"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const active = activeCategory.toLowerCase() === category.toLowerCase();

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                      active
                        ? 'bg-[var(--foreground)] text-white'
                        : 'border border-[var(--border)] bg-white text-[var(--muted-strong)] hover:border-[rgba(183,136,84,0.35)] hover:text-[var(--accent-strong)]'
                    }`}
                  >
                    {categoryLabel(category)}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Sizes
            </p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => {
                const active = activeSizes.includes(size);

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`h-11 min-w-11 rounded-full border text-xs font-semibold transition ${
                      active
                        ? 'border-[var(--foreground)] bg-[var(--foreground)] text-white'
                        : 'border-[var(--border)] bg-white text-[var(--muted-strong)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Price
            </p>
            <div className="space-y-2">
              {PRICE_RANGES.map((range, index) => {
                const active = activePrice === index;

                return (
                  <button
                    key={range.label}
                    type="button"
                    onClick={() => setActivePrice(active ? null : index)}
                    className={`flex w-full items-center justify-between rounded-[1.25rem] border px-4 py-3 text-sm transition ${
                      active
                        ? 'border-[var(--foreground)] bg-[var(--foreground)] text-white'
                        : 'border-[var(--border)] bg-white text-[var(--muted-strong)] hover:border-[rgba(183,136,84,0.35)] hover:text-[var(--accent-strong)]'
                    }`}
                  >
                    <span>{range.label}</span>
                    {active ? <span>Selected</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('All');
            setActivePrice(null);
            clearSizes();
          }}
          className="button-secondary mt-8 !w-full !justify-center"
        >
          Clear Filters
        </button>
      </aside>
    </>
  );
}

function ProductsContent({ initialCategory }: { initialCategory: string }) {
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activePrice, setActivePrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('Featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleSize = (size: string) => {
    setActiveSizes((previous) =>
      previous.includes(size)
        ? previous.filter((item) => item !== size)
        : [...previous, size]
    );
  };

  const filteredProducts = useMemo(() => {
    return (productsData as Product[])
      .filter((product) => {
        if (activeCategory === 'new-arrivals' && !product.tags.includes('new-arrivals')) {
          return false;
        }

        if (
          activeCategory === 'sale' &&
          !(product.tags.includes('sale') || product.badge === 'SALE')
        ) {
          return false;
        }

        if (
          activeCategory !== 'All' &&
          activeCategory !== 'new-arrivals' &&
          activeCategory !== 'sale' &&
          product.category !== activeCategory.toLowerCase()
        ) {
          return false;
        }

        if (activePrice !== null) {
          const range = PRICE_RANGES[activePrice];
          if (product.price < range.min || product.price > range.max) {
            return false;
          }
        }

        if (activeSizes.length > 0 && !activeSizes.some((size) => product.sizes.includes(size))) {
          return false;
        }

        return true;
      })
      .sort((left, right) => {
        if (sortBy === 'Price: Low to High') return left.price - right.price;
        if (sortBy === 'Price: High to Low') return right.price - left.price;
        if (sortBy === 'Best Rated') return right.rating - left.rating;
        if (sortBy === 'Newest') return Number(right.id) - Number(left.id);
        return 0;
      });
  }, [activeCategory, activePrice, activeSizes, sortBy]);

  const activeFilterCount =
    (activeCategory !== 'All' ? 1 : 0) + activeSizes.length + (activePrice !== null ? 1 : 0);

  return (
    <div className="brand-container py-10 lg:py-14">
      <section className="surface-card rounded-[2.5rem] p-8 sm:p-10 lg:p-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker">Collection</p>
            <h1 className="section-title mt-4">{formatCollectionLabel(activeCategory)}</h1>
            <p className="section-copy mt-4 max-w-2xl text-base">
              Explore a sharper edit of elevated essentials, premium outerwear, and
              modern wardrobe foundations with cleaner structure and calmer spacing.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
              <p className="text-sm text-[var(--muted)]">Products shown</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {filteredProducts.length}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
              <p className="text-sm text-[var(--muted)]">Active filters</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {activeFilterCount}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 flex gap-6 xl:gap-8">
        <FilterPanel
          isOpen={filterOpen}
          onClose={() => setFilterOpen(false)}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeSizes={activeSizes}
          toggleSize={toggleSize}
          activePrice={activePrice}
          setActivePrice={setActivePrice}
          clearSizes={() => setActiveSizes([])}
        />

        <div className="min-w-0 flex-1">
          <div className="surface-card mb-6 flex flex-col gap-4 rounded-[2rem] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setFilterOpen(true)}
                className="button-secondary lg:hidden"
              >
                <SlidersHorizontal size={14} />
                Filters
              </button>

              <p className="text-sm text-[var(--muted)]">
                Showing <span className="font-semibold text-[var(--foreground)]">{filteredProducts.length}</span>{' '}
                refined results
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 self-start rounded-full border border-[var(--border)] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    viewMode === 'grid'
                      ? 'bg-[var(--foreground)] text-white'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Grid size={14} />
                    Grid
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    viewMode === 'list'
                      ? 'bg-[var(--foreground)] text-white'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <LayoutList size={14} />
                    List
                  </span>
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="appearance-none rounded-full border border-[var(--border)] bg-white px-4 py-3 pr-10 text-sm text-[var(--foreground)] outline-none transition hover:border-[rgba(183,136,84,0.35)]"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              icon={SlidersHorizontal}
              eyebrow="No Matches"
              title="No products match your current filters."
              description="Try broadening your size, category, or price selections to bring more pieces back into view."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setActiveSizes([]);
                    setActivePrice(null);
                  }}
                  className="button-primary"
                >
                  Reset Filters
                </button>
              }
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 stagger-children">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category') || 'All';

  return <ProductsContent key={urlCategory} initialCategory={urlCategory} />;
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}
