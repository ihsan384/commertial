/**
 * Formats a price value to Indian Rupee (INR) currency format
 * @param {number} value - The price value to format
 * @returns {string} Formatted price string (e.g., "₹1,999")
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0, // No decimal places for INR
  }).format(value);
}