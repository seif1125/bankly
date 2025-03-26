

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: User;
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
 name:string
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

interface AuthField<T> {
  name: keyof T
  label: string
  type?: 'text' | 'email' | 'password' | 'select' | 'date'|'mobile'
  placeholder?: string
  fullWidth?: boolean
  options?: { label: string; value: string; icon?: React.ReactNode }[]
}


export interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  fields: AuthField<T>[];
  submitText: string;
  onSubmit: (values: T) => void;
  defaultValues: T;
  type?: 'email' | 'password' | 'text' | 'date' | 'select'|'mobile';
}

interface CustomInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<T>;
  fullWidth?: boolean;
}


interface Country {
  label: string
  value: string
  dialCode: string
}

interface CustomMobileInputProps {
  name: string
  control: Control<any>
  label: string
}

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: Option[];
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;        
  mobile: string;        
  dateOfBirth: Date;      
}

export interface loginData {
  email: string;
  password: string;
}
