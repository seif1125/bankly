
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CATEGORY_STYLES } from "@/constants/categoryStyles";
import { CategoryStyle } from "@/constants/categoryStyles";

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

export function generateFakeCard(mask:string) {
  const prefixes = {
    visa: ['4'],
    mastercard: ['51', '52', '53', '54', '55'],
  };

  const cardType = Math.random() < 0.5 ? 'visa' : 'mastercard'; // Randomly choose card type
  const prefix = prefixes[cardType][Math.floor(Math.random() * prefixes[cardType].length)];
  const length = 16;

  // Validate the mask length
  if (mask.length !== 4 || !/^\d{4}$/.test(mask)) {
    throw new Error('Invalid mask. The mask must be exactly 4 digits.');
  }

  // Generate the first 12 digits (excluding the last 4, which are the mask)
  let cardNumber = prefix;
  while (cardNumber.length < length - 4) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }

  // Add the mask to the card number
  cardNumber += mask;

  // Calculate Luhn checksum digit
  const digits = cardNumber.split('').map(Number).reverse();
  const checksum = digits.reduce((sum, digit, idx) => {
    if (idx % 2 === 0) {
      const dbl = digit * 2;
      return sum + (dbl > 9 ? dbl - 9 : dbl);
    }
    return sum + digit;
  }, 0);

  const finalDigit = (10 - (checksum % 10)) % 10;
  cardNumber = cardNumber.slice(0, -1) + finalDigit; // Replace the last digit with the calculated checksum

  // Generate realistic expiry date (1 to 5 years in the future)
  const now = new Date();
  const futureYear = now.getFullYear() + Math.floor(Math.random() * 5 + 1);
  const futureMonth = Math.floor(Math.random() * 12 + 1);

  const expiryMonth = futureMonth.toString().padStart(2, '0');
  const expiryYear = futureYear.toString().slice(-2); // Last 2 digits

  const cvv = Math.floor(Math.random() * 900 + 100).toString(); // 3-digit CVV

  return {
    cardNumber,
    expiry: `${expiryMonth}/${expiryYear}`,
    cvv,
    cardType,
  };
}

// utils.ts
import { HelpCircle } from "lucide-react";

export function getCategoryAttributes(category: string) {
  const normalized = category || "Uncategorized";
  const style = CATEGORY_STYLES[normalized] || CATEGORY_STYLES["Uncategorized"];

  return {
    ...style,
    icon: style.icon || HelpCircle,
  };
}
