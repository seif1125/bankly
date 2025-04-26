 

import {
    Banknote,
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
    icon?: LucideIcon;
  }
  
  export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
    "Food and Drink": {
      label: "Food",
      color: "text-orange-600",
      borderColor: "border-orange-200",
      
    },
    "Shops": {
      label: "Shopping",
      color: "text-pink-600",
      borderColor: "border-pink-200",
      
    },
    "Travel": {
      label: "Travel",
      color: "text-blue-600",
      borderColor: "border-blue-200",
      
    },
    "Healthcare": {
      label: "Health",
      color: "text-red-600",
      borderColor: "border-red-200",
      
    },
    "Recreation": {
      label: "Recreation",
      color: "text-purple-600",
      borderColor: "border-purple-200",
    
    },
    "Service": {
      label: "Services",
      color: "text-yellow-700",
      borderColor: "border-yellow-200",
    
    },
    "Transfer": {
      label: "Transfer",
      color: "text-gray-600",
      borderColor: "border-gray-200",
      
    },
    "Bank Fees": {
      label: "Bank Fee",
      color: "text-red-700",
      borderColor: "border-red-300",
      
    },
    "Interest": {
      label: "Interest",
      color: "text-green-600",
      borderColor: "border-green-200",
      
    },
    "Income": {
      label: "Income",
      color: "text-green-700",
      borderColor: "border-green-300",
    
    },
    "Payment": {
      label: "Payment",
      color: "text-indigo-600",
      borderColor: "border-indigo-200",
      
    },
    "Reimbursement": {
      label: "Reimbursement",
      color: "text-lime-600",
      borderColor: "border-lime-200",
      
    },
    "Rent and Utilities": {
      label: "Utilities",
      color: "text-sky-600",
      borderColor: "border-sky-200",
    
    },
    "Education": {
      label: "Education",
      color: "text-cyan-600",
      borderColor: "border-cyan-200",
      
    },
    "Taxes": {
      label: "Taxes",
      color: "text-amber-600",
      borderColor: "border-amber-200",
      
    },
    "Uncategorized": {
      label: "Other",
      color: "text-gray-400",
      borderColor: "border-gray-300",
      
    },
  };
  