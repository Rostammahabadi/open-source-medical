/**
 * Formats a number as USD currency
 */
export const formatCurrency = (amount: number | number[] | string): string => {
  // Handle array of costs
  if (Array.isArray(amount)) {
    // Sum up all costs if it's an array
    amount = amount.reduce((sum, cost) => sum + cost, 0);
  } else if (typeof amount === 'string') {
    // Try to parse string to number
    amount = parseFloat(amount) || 0;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Formats a date string into a localized date format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
