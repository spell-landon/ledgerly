import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency with commas and 2 decimal places
 * @param amount - The number to format
 * @returns Formatted currency string (e.g., "7,500.00")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a category string to start-case (e.g., "equipment" -> "Equipment")
 * @param category - The category string to format
 * @returns Formatted category string
 */
export function formatCategory(category: string | null): string {
  if (!category) return 'Other';

  // Split on underscores and capitalize each word
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Parse a date string (YYYY-MM-DD) as a local date, avoiding timezone issues
 * @param dateString - ISO date string (e.g., "2025-11-06")
 * @returns Date object representing the local date
 */
export function parseLocalDate(dateString: string): Date {
  // Parse the date string as local time by adding T00:00:00
  // This prevents timezone conversion issues where UTC dates become previous day
  return new Date(dateString + 'T00:00:00');
}

/**
 * Format a date string for display
 * @param dateString - ISO date string (e.g., "2025-11-06")
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = parseLocalDate(dateString);
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options || defaultOptions);
}
