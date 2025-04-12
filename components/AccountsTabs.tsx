import React from 'react'
import {TabsList, TabsTrigger } from "@/components/ui/tabs";
const AccountsTabs = ({accounts}) => {
  return (
    
      <TabsList className="recent-transactions-tablist">
              {accounts.map((account) => (
                <TabsTrigger className="  px-4 border-b-2 border-transparent" key={account.accountId} value={account.accountId}>
                  {account.accountName}
                </TabsTrigger>
              ))}
            </TabsList>
  )
}

export default AccountsTabs