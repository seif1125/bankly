import React from 'react'
import {TabsList, TabsTrigger } from "@/components/ui/tabs";
const AccountsTabs = ({accounts}) => {
  return (
      <TabsList className="flex flex-row items-center justify-center w-full bg-opacity-0 recent-transactions-tablist">
              {accounts.map((account) => (
                <TabsTrigger className="data-[state=active]:bg-bankGradient p-4 data-[state=active]:text-white" key={account.accountId} value={account.accountId}>
                  {account.accountName}
                </TabsTrigger>
              ))}
            </TabsList>
  )
}

export default AccountsTabs