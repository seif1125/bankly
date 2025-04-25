 

import {
    Banknote,
    Pizza,
    ShoppingBag,
    Plane,
    HeartPulse,
    Film,
    CreditCard,
    Repeat,
    TrendingUp,
    School,
    Home,
    DollarSign,
    AlertTriangle,
    HelpCircle,
    LucideIcon,
  } from 'lucide-react';
  
  export interface CategoryStyle {
    label: string;
    color: string;
    borderColor: string;
    icon: LucideIcon;
  }
  
  export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
    "Food and Drink": {
      label: "Food",
      color: "text-orange-600",
      borderColor: "border-orange-200",
      icon: Pizza,
    },
    "Shops": {
      label: "Shopping",
      color: "text-pink-600",
      borderColor: "border-pink-200",
      icon: ShoppingBag,
    },
    "Travel": {
      label: "Travel",
      color: "text-blue-600",
      borderColor: "border-blue-200",
      icon: Plane,
    },
    "Healthcare": {
      label: "Health",
      color: "text-red-600",
      borderColor: "border-red-200",
      icon: HeartPulse,
    },
    "Recreation": {
      label: "Recreation",
      color: "text-purple-600",
      borderColor: "border-purple-200",
      icon: Film,
    },
    "Service": {
      label: "Services",
      color: "text-yellow-700",
      borderColor: "border-yellow-200",
      icon: CreditCard,
    },
    "Transfer": {
      label: "Transfer",
      color: "text-gray-600",
      borderColor: "border-gray-200",
      icon: Repeat,
    },
    "Bank Fees": {
      label: "Bank Fee",
      color: "text-red-700",
      borderColor: "border-red-300",
      icon: AlertTriangle,
    },
    "Interest": {
      label: "Interest",
      color: "text-green-600",
      borderColor: "border-green-200",
      icon: TrendingUp,
    },
    "Income": {
      label: "Income",
      color: "text-green-700",
      borderColor: "border-green-300",
      icon: DollarSign,
    },
    "Payment": {
      label: "Payment",
      color: "text-indigo-600",
      borderColor: "border-indigo-200",
      icon: CreditCard,
    },
    "Reimbursement": {
      label: "Reimbursement",
      color: "text-lime-600",
      borderColor: "border-lime-200",
      icon: Banknote,
    },
    "Rent and Utilities": {
      label: "Utilities",
      color: "text-sky-600",
      borderColor: "border-sky-200",
      icon: Home,
    },
    "Education": {
      label: "Education",
      color: "text-cyan-600",
      borderColor: "border-cyan-200",
      icon: School,
    },
    "Taxes": {
      label: "Taxes",
      color: "text-amber-600",
      borderColor: "border-amber-200",
      icon: DollarSign,
    },
    "Uncategorized": {
      label: "Other",
      color: "text-gray-400",
      borderColor: "border-gray-300",
      icon: HelpCircle,
    },
  };
  