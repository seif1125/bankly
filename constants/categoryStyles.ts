 

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
    Pizza,
  } from 'lucide-react';
  
  export interface CategoryStyle {
    label: string;
    color: string;
    borderColor: string;
    icon?: string ;
  }
  
  export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
    "Food and Drink": {
      label: "Food",
      color: "text-orange-600",
      borderColor: "border-orange-200",
      icon:'/icons/pizza.svg'
      
    },
    "Shops": {
      label: "Shopping",
      color: "text-pink-600",
      borderColor: "border-pink-200",
      icon:'/icons/shopping-bag.svg'
      
    },
    "Travel": {
      label: "Travel",
      color: "text-blue-600",
      borderColor: "border-blue-200",
      icon:'/icons/plane.svg'
      
    },
    "Healthcare": {
      label: "Health",
      color: "text-red-600",
      borderColor: "border-red-200",
      icon:'/icons/heart-pulse.svg'      
    },
  
    "Service": {
      label: "Services",
      color: "text-yellow-700",
      borderColor: "border-yellow-200",
      icon:'/icons/service.svg'
    },
    "Transfer": {
      label: "Transfer",
      color: "text-gray-600",
      borderColor: "border-gray-200",
      icon:'/icons/transfer.svg'
      
    },
    "Bank Fees": {
      label: "Bank Fee",
      color: "text-red-700",
      borderColor: "border-red-300",
      icon:'/icons/dollar-sign.svg'
      
    },
    "Interest": {
      label: "Interest",
      color: "text-green-600",
      borderColor: "border-green-200",
      icon:'/icons/intrest.svg'
    },
    "Income": {
      label: "Income",
      color: "text-green-700",
      borderColor: "border-green-300",
      icon:'/icons/wallet.svg'
    },
    "Payment": {
      label: "Payment",
      color: "text-indigo-600",
      borderColor: "border-indigo-200",
      icon:'/icons/banknote.svg'
    },
 
 
    "Uncategorized": {
      label: "Other",
      color: "text-gray-400",
      borderColor: "border-gray-300",
      icon:'/icons/help-circle.svg'
      
    },
  };
  