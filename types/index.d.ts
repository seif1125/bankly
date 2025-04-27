

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: User|undefined;
}

declare interface TotalBalanceBoxProps {
  accounts?:Account[];
  totalBanks: number;
  currentBalance: string | number;
  
}

declare interface DoughnutChartProps {
  accounts:Account[];
}


  export interface User {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    dateOfBirth: string;  
    password: string;
    mobile: string;
    id: string;  
    dwollaUrl: string;
    plaidToken: string;
    defaultAccountId: string;
  
}

interface Transaction {
  senderAccountId: string;
  name: string;
  account_id: string;
  senderUserId: string;
  user_id: string;
  receiverAccountId: string;
  transaction_id: string;
  category: string[];
  pending: boolean;
  logo_url: string;
  merchantName: string;
  amount: number;
  type: string;
  authorizedDate: string;
  authorized_date: string;
  merchant_entity_id?: string;
  banklyTransfer?: boolean;
}


interface Bank {
  id: string;
  name: string;
  branch: string;
}

interface Account {
  $id: string;
  accountId: string;
  accountName: string;
  accountOfficialName: string;
  availableBalance: number;
  cardNumber: string;
  expiryDate: string;
  type: string;
  subtype: string;
  banklyAddress: string;
  dwollaFundingsource?: string;
} 
interface Card {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
}

interface BankCardProps {
  bank: Partial<Account>;
  index: number;
  zIndex: number;
  styled?: boolean;
}


interface SideBarFooterProps {
  type?: 'desktop' | 'mobile';
  user:User
}

declare interface RightSidebarProps {
  user: User ;
 
  banks: Account[];
}

interface AuthField<T> {
  name: keyof T
  label: string
  type?: 'text' |'textAddress' |'email' | 'password' | 'select' | 'date'|'mobile'|'accountSelect'|'number'
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
  type?: 'email' | 'password' | 'text' | 'date' | 'select'|'mobile'|'sign-in'|'sign-up'|'accountSelect'|'textAddress'|'number';
 
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
  dateOfBirth: string; 
   
}

export interface loginData {
  email: string;
  password: string;
}
interface BankCardActionsProps {
  initialAccount: Account;
  initialUser: User;
  onUserUpdate: () => Promise<void>;
}
interface TransactionTableProps {

  account: Account;
  transactions: Transaction[];
  isMainPage?: boolean;
};

interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
}
 
interface AccountTabsProps {
  accounts: Account[];
  setSelectedAccount: (accountId: string) => void;
}

export type ReceiverInfo = {
  firstName: string;
  lastName: string;
  accountId: string;
  cardNumber: string;
  userId: string;
};

export type SenderInfo = {
  firstName: string
  lastName: string
  userId: string
  accountId: string
  amount: number
}

export type TransactionData = {
  senderAccountId: string;
  receiverAccountId: string;
  senderUserId: string;
  receiverUserId: string;
  amount: number;
}

export interface paramsProps {
  params?: { account_id: string }|null  
}