import React from 'react'
import {TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountTabsProps } from '@/types';
const AccountsTabs:React.FC<AccountTabsProps> = ({accounts,setSelectedAccount}) => {
  return (
    
      <TabsList className="recent-transactions-tablist">
              {accounts.map((account) => (
                <TabsTrigger onClick={()=>setSelectedAccount(account.accountId)} className="  px-4 border-b-2 border-transparent" key={account.accountId} value={account.accountId}>
                  {account.accountName}
                </TabsTrigger>
              ))}
            </TabsList>
  )
}

export default AccountsTabs