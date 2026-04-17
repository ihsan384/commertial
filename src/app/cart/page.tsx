'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';
import { useCartStore } from '@/store/cartStore';
import { formatCurrency } from '@/lib/format';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber] = useState(() => `#LW-${Math.floor(Math.random() * 90000 + 10000)}`);

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 12000 ? 0 : 999;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const handleCheckout = () => {
    setShowSuccess(true);
    clearCart();
  };

  if (showSuccess) {
    return (
      <div className="brand-container py-14 lg:py-20">
        <EmptyState
          icon={CheckCircle2}
          eyebrow="Order Confirmed"
          title="Your order is confirmed and being prepared."
          description="A confirmation email is on the way. We will send tracking as soon as your order ships."
          action={
            <div className="space-y-6">
              <div className="surface-card mx-auto max-w-md rounded-[2rem] p-5 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">Order number</span>
                  <span className="font-semibold text-[var(--foreground)]">{orderNumber}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">Estimated delivery</span>
                  <span className="font-semibold text-[var(--foreground)]">3-5 business days</span>
                </div>
              </div>

              <Link href="/products" className="button-primary">
                Continue Shopping
              </Link>
            </div>
          }
        />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="brand-container py-14 lg:py-20">
        <EmptyState
          icon={ShoppingBag}
          eyebrow="Cart"
          title="Your cart is still empty."
          description="Build your wardrobe with premium essentials, outerwear, and refined everyday staples."
          action={
            <Link href="/products" className="button-primary">
              <ArrowLeft size={14} />
              Start Shopping
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="brand-container py-10 lg:py-14">
      <section className="surface-card rounded-[2.5rem] p-8 sm:p-10 lg:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-kicker">Cart</p>
            <h1 className="section-title mt-4">Review your edit before checkout.</h1>
            <p className="section-copy mt-4 max-w-2xl text-base">
              A cleaner checkout experience with clear pricing, quicker edits, and a
              premium summary of everything you are about to order.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
              <p className="text-sm text-[var(--muted)]">Items</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {totalItems}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-5">
              <p className="text-sm text-[var(--muted)]">Estimated total</p>
              <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                {formatCurrency(total)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={`${item.id}-${item.size}-${item.color}`}
              className="surface-card rounded-[2rem] p-4 sm:p-5"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[var(--background-strong)] sm:w-32 sm:shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                        {item.name}
                      </h2>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-[var(--muted)]">
                        <span>Color: {item.color}</span>
                        <span>Size: {item.size}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id, item.size, item.color)}
                      className="button-secondary !self-start !px-4 !py-2"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>

                  <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex h-12 items-center justify-between rounded-full border border-[var(--border)] bg-white px-2 sm:w-[156px]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                        }
                        className="icon-button h-9 w-9 border-none bg-transparent shadow-none"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold text-[var(--foreground)]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                        }
                        className="icon-button h-9 w-9 border-none bg-transparent shadow-none"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 ? (
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {formatCurrency(item.price)} each
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {subtotal < 150 ? (
            <div className="surface-card rounded-[2rem] p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                    <Truck size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      Add {formatCurrency(12000 - subtotal)} more for free shipping
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      You are close to complimentary delivery.
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--background-strong)]">
                <div
                  className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / 150) * 100, 100)}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <aside className="surface-card h-fit rounded-[2rem] p-6 xl:sticky xl:top-[calc(var(--announcement-height)+var(--nav-height)+24px)]">
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
            Order Summary
          </h2>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Subtotal</span>
              <span className="font-medium text-[var(--foreground)]">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Shipping</span>
              <span className="font-medium text-[var(--foreground)]">
                {shipping === 0 ? 'Free' : formatCurrency(shipping)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--muted)]">Tax</span>
              <span className="font-medium text-[var(--foreground)]">
                {formatCurrency(tax)}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5">
            <span className="text-base font-semibold text-[var(--foreground)]">Total</span>
            <span className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
              {formatCurrency(total)}
            </span>
          </div>

          <div className="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              className="min-w-0 flex-1 rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            />
            <button type="button" className="button-secondary">
              Apply
            </button>
          </div>

          <button type="button" onClick={handleCheckout} className="button-primary mt-5 !w-full !justify-center">
            Proceed to Checkout
          </button>

          <div className="mt-5 rounded-[1.5rem] border border-[var(--border)] bg-white/75 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Secure checkout
                </p>
                <p className="text-sm text-[var(--muted)]">
                  Protected with SSL encryption.
                </p>
              </div>
            </div>
          </div>

          <Link href="/products" className="button-tertiary mt-5">
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
