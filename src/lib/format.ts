import { formatPrice } from './formatPrice';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function formatCurrency(value: number) {
  return formatPrice(value);
}

export function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function formatCollectionLabel(category: string) {
  if (category === 'men') return "Men's Collection";
  if (category === 'women') return "Women's Collection";
  if (category === 'new-arrivals') return 'New Arrivals';
  if (category === 'sale') return 'Sale Selection';

  return 'All Products';
}
