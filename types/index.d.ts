

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
interface BankCardProps {
  bank: Bank & Account & Card;
  index: number;
  zIndex: number;
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: (Bank & Account&Card)[];
}

export interface AuthField<T> {
  name: keyof T
  label: string
  type?: string
  placeholder?: string
}

export interface AuthFormProps<T extends FieldValues> {
  schema: any // optional: you can type it more strictly
  fields: AuthField<T>[]
  submitText: string
  onSubmit: (values: T) => void
  defaultValues: T
  type: 'sign-in' | 'sign-up'
}