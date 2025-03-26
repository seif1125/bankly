import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencyAbbr(): string {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return getCurrencyFromTimeZone(timeZone);
}

function getCurrencyFromTimeZone(timeZone: string | undefined): string {
  const currencyMap: Record<string, string> = {
    "Africa/Cairo": "EGP",  // Egypt
    "Asia/Dubai": "AED",    // UAE
    "America/New_York": "USD",
    "Europe/London": "GBP",
    "Europe/Paris": "EUR",
    "Asia/Tokyo": "JPY",
    "Asia/Shanghai": "CNY",
    "Asia/Kolkata": "INR",
  };

  return timeZone && currencyMap[timeZone] ? currencyMap[timeZone] : "USD"; // Default to USD
}
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export function getInitials(fullName: string): string {
  const names = fullName?.trim().split(' ');
  if (names?.length === 0) return '';

  const firstInitial = names?names[0]?.[0] || '':'';
  const lastInitial = names?.length > 1 ? names?names[names?.length - 1][0] : '':'';

  return (firstInitial + lastInitial).toUpperCase();
}