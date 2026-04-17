'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Check,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { productBadgeStyles, type Product } from '@/components/ui/ProductCard';
import { formatCurrency } from '@/lib/format';
import productsData from '@/data/products.json';

function AdminProductModal({
  title,
  onClose,
  actionLabel,
  onAction,
  product,
}: {
  title: string;
  onClose: () => void;
  actionLabel: string;
  onAction: () => void;
  product?: Product | null;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
      <div className="surface-card-strong w-full max-w-lg rounded-[2rem] p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-kicker">Catalog</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              {title}
            </h2>
          </div>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {[
            { label: 'Product name', defaultValue: product?.name ?? '', placeholder: 'Classic White Tee' },
            { label: 'Price', defaultValue: product ? String(product.price) : '', placeholder: '149.99' },
            {
              label: 'Original price',
              defaultValue: product?.originalPrice ? String(product.originalPrice) : '',
              placeholder: '199.99',
            },
          ].map((field) => (
            <label key={field.label} className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {field.label}
              </span>
              <input
                type="text"
                defaultValue={field.defaultValue}
                placeholder={field.placeholder}
                className="w-full rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              />
            </label>
          ))}

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
              Description
            </span>
            <textarea
              rows={4}
              defaultValue={product?.description ?? ''}
              className="w-full rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onClose} className="button-secondary !justify-center sm:flex-1">
            Cancel
          </button>
          <button type="button" onClick={onAction} className="button-primary !justify-center sm:flex-1">
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(productsData as Product[]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const deferredSearch = useDeferredValue(search);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(deferredSearch.trim().toLowerCase());
      const matchesCategory =
        categoryFilter === 'All' || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [categoryFilter, deferredSearch, products]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    window.setTimeout(() => setSuccessMessage(''), 2200);
  };

  const handleDelete = (id: string) => {
    setProducts((previous) => previous.filter((product) => product.id !== id));
    setDeleteId(null);
    showSuccess('Product removed from the catalog');
  };

  return (
    <div className="px-4 pb-8 pt-20 sm:px-6 lg:px-8 lg:pt-8">
      {successMessage ? (
        <div className="fixed right-6 top-6 z-50 rounded-full bg-[var(--success)] px-4 py-3 text-sm font-semibold text-white shadow-lg">
          <span className="inline-flex items-center gap-2">
            <Check size={16} />
            {successMessage}
          </span>
        </div>
      ) : null}

      <section className="surface-card rounded-[2.5rem] p-8 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Products</p>
            <h1 className="section-title mt-4">Manage the catalog with calmer controls.</h1>
            <p className="section-copy mt-4 max-w-2xl text-base">
              Review, edit, and curate products in a cleaner workspace built with the
              same premium visual language as the storefront.
            </p>
          </div>
          <button type="button" onClick={() => setShowAddModal(true)} className="button-primary">
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </section>

      <section className="surface-card mt-6 rounded-[2rem] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-[var(--border)] bg-white py-3 pl-11 pr-4 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'men', 'women'].map((category) => {
              const active = categoryFilter === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategoryFilter(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    active
                      ? 'bg-[var(--foreground)] text-white'
                      : 'border border-[var(--border)] bg-white text-[var(--muted-strong)] hover:border-[rgba(183,136,84,0.35)] hover:text-[var(--accent-strong)]'
                  }`}
                >
                  {category === 'men' ? "Men's" : category === 'women' ? "Women's" : category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {filteredProducts.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            icon={Search}
            eyebrow="No Results"
            title="No products match the current search."
            description="Try a broader search term or switch categories to review more items."
          />
        </div>
      ) : (
        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="surface-card overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[4/5] bg-[var(--background-strong)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1535px) 33vw, 25vw"
                  className="object-cover"
                />
                {product.badge ? (
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${productBadgeStyles[product.badge] ?? productBadgeStyles.BESTSELLER}`}
                  >
                    {product.badge}
                  </span>
                ) : null}
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                      {product.name}
                    </p>
                    <p className="mt-2 text-sm text-[var(--muted)] capitalize">{product.category}</p>
                  </div>
                  <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                    {product.reviews} reviews
                  </span>
                </div>

                <div className="mt-4 flex items-end gap-2">
                  <span className="text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice ? (
                    <span className="text-sm text-[var(--muted)] line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditProduct(product)}
                    className="button-secondary !flex-1 !justify-center"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(product.id)}
                    className="button-secondary !justify-center !border-[rgba(161,63,52,0.2)] !text-[var(--danger)] hover:!border-[rgba(161,63,52,0.3)] hover:!text-[var(--danger)]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {showAddModal ? (
        <AdminProductModal
          title="Add new product"
          onClose={() => setShowAddModal(false)}
          actionLabel="Add Product"
          onAction={() => {
            setShowAddModal(false);
            showSuccess('Product added to the catalog');
          }}
        />
      ) : null}

      {editProduct ? (
        <AdminProductModal
          title="Edit product"
          product={editProduct}
          onClose={() => setEditProduct(null)}
          actionLabel="Save Changes"
          onAction={() => {
            setEditProduct(null);
            showSuccess('Product updated successfully');
          }}
        />
      ) : null}

      {deleteId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm">
          <div className="surface-card-strong w-full max-w-md rounded-[2rem] p-6 text-center sm:p-7">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fbe8e5] text-[var(--danger)]">
              <Trash2 size={20} />
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              Delete product?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              This will remove the product from the current admin view.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => setDeleteId(null)} className="button-secondary sm:flex-1">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteId)}
                className="button-primary !bg-[var(--danger)] sm:flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
