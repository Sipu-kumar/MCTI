import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a blockchain address to show only the first and last few characters
 * @param address - The full address to truncate
 * @param startChars - Number of characters to show at the start (default: 6)
 * @param endChars - Number of characters to show at the end (default: 4)
 * @returns Truncated address in format "0x1234...5678"
 */
export function truncateAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  
  const start = address.slice(0, startChars);
  const end = address.slice(-endChars);
  return `${start}...${end}`;
}

/**
 * Formats large numbers into readable format (k, M, B, T)
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string like "1.5k", "2.3M", "1.2B", "5.4T"
 */
export function formatTokenBalance(value: number, decimals: number = 2): string {
  if (value === 0) return "0";
  
  const absValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  
  if (absValue >= 1e12) {
    // Trillions
    return `${sign}${(absValue / 1e12).toFixed(decimals)}T`;
  } else if (absValue >= 1e9) {
    // Billions
    return `${sign}${(absValue / 1e9).toFixed(decimals)}B`;
  } else if (absValue >= 1e6) {
    // Millions
    return `${sign}${(absValue / 1e6).toFixed(decimals)}M`;
  } else if (absValue >= 1e3) {
    // Thousands
    return `${sign}${(absValue / 1e3).toFixed(decimals)}k`;
  } else {
    // Less than 1000 - show with up to 6 decimal places, remove trailing zeros
    return value.toLocaleString(undefined, {
      maximumFractionDigits: 6,
      minimumFractionDigits: 0,
    });
  }
}