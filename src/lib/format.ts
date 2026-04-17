const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function formatCurrency(value: number) {
  return currencyFormatter.format(value);
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
