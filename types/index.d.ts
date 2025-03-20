

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface TotalBalanceBoxProps {
  accounts?:string[];
  totalBanks: number;
  currentBalance: number;
}

declare interface DoughnutChartProps {
  accounts:string[];
}


interface User {
  // id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: "deposit" | "withdrawal";
  date: string;
}

interface Bank {
  id: string;
  name: string;
  branch: string;
}

interface Account {
  accountNumber: string;
  balance: number;
} 
interface Card {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
}


declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: (Bank & Account&Card)[];
}
