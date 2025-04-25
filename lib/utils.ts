
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CATEGORY_STYLES } from "@/constants/categoryStyles";
import { CategoryStyle } from "@/constants/categoryStyles";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export default function getTotalBalance(accounts:Account[]):string{
  let total=0
  const totalBalance = accounts.reduce((total, account) => {
    const balance = account?.availableBalance || 0;  
    return total + balance;
  }, 0);
  return totalBalance.toFixed(2);
}
export function getCurrencyAbbr(): string {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return getCurrencyFromTimeZone(timeZone);
}

function getCurrencyFromTimeZone(timeZone: string | undefined): string {
  const currencyMap: Record<string, string> = {
    "Africa/Cairo": "EGP",   
    "Asia/Dubai": "AED",     
    "America/New_York": "USD",
    "Europe/London": "GBP",
    "Europe/Paris": "EUR",
    "Asia/Tokyo": "JPY",
    "Asia/Shanghai": "CNY",
    "Asia/Kolkata": "INR",
  };

  return timeZone && currencyMap[timeZone] ? currencyMap[timeZone] : "USD";  
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

  const cardType = Math.random() < 0.5 ? 'visa' : 'mastercard';  
  const prefix = prefixes[cardType][Math.floor(Math.random() * prefixes[cardType].length)];
  const length = 16;

   
  if (mask.length !== 4 || !/^\d{4}$/.test(mask)) {
    throw new Error('Invalid mask. The mask must be exactly 4 digits.');
  }

   
  let cardNumber = prefix;
  while (cardNumber.length < length - 4) {
    cardNumber += Math.floor(Math.random() * 10).toString();
  }

   
  cardNumber += mask;

   
  const digits = cardNumber.split('').map(Number).reverse();
  const checksum = digits.reduce((sum, digit, idx) => {
    if (idx % 2 === 0) {
      const dbl = digit * 2;
      return sum + (dbl > 9 ? dbl - 9 : dbl);
    }
    return sum + digit;
  }, 0);

  const finalDigit = (10 - (checksum % 10)) % 10;
  cardNumber = cardNumber.slice(0, -1) + finalDigit;  

   
  const now = new Date();
  const futureYear = now.getFullYear() + Math.floor(Math.random() * 5 + 1);
  const futureMonth = Math.floor(Math.random() * 12 + 1);

  const expiryMonth = futureMonth.toString().padStart(2, '0');
  const expiryYear = futureYear.toString().slice(-2);  

  const cvv = Math.floor(Math.random() * 900 + 100).toString();  

  return {
    cardNumber,
    expiry: `${expiryMonth}/${expiryYear}`,
    cvv,
    cardType,
  };
}

 
import { HelpCircle } from "lucide-react";
import { Account } from "@/types";

export function getCategoryAttributes(category: string) {
  const normalized = category || "Uncategorized";
  const style = CATEGORY_STYLES[normalized] || CATEGORY_STYLES["Uncategorized"];

  return {
    ...style,
    icon: style.icon || HelpCircle,
  };
}

export function formatDate(dateString: string): string { 

    const date = new Date(dateString);
    const options = {
      weekday: 'short',  
      day: '2-digit',    
      month: 'short',    
      year: 'numeric',   
      hour: '2-digit',   
      minute: '2-digit', 
      hour12: false,     
    };
  const formattedDate= new Intl.DateTimeFormat('en-GB', options).format(date);
   
  if (date.getHours() === 0 && date.getMinutes() === 0) {
    return `${formattedDate.split(',')[0]}, ${formattedDate.split(',')[1]} ${formattedDate.split(',')[2]} ${formattedDate.split(',')[3]}`;
  } else {
    return `${formattedDate}`;
  }
};

export function generateBanklyAddress(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
   
  let address = '';

  for (let i = 0; i < 10; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${address}@bankly.com`;
}


export function showMaskedName(firstName:string,lastName:string): string {
  const maskedFirstName = firstName.charAt(0) + '*'.repeat(firstName.length - 1);
  const maskedLastName = lastName.charAt(0) + '*'.repeat(lastName.length - 1);
  return `${maskedFirstName} ${maskedLastName}`;
}

export function maskCardNumber(cardNumber: string): string {
  const lastFourDigits = cardNumber.slice(-4);
  const maskedPart = '*'.repeat(cardNumber.length - 4);
  return `${maskedPart}${lastFourDigits}`;
}