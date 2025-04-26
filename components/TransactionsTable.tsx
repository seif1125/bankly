"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { cn, formatDate, getCategoryAttributes } from "@/lib/utils";
import { TransactionTableProps } from "@/types";



const TransactionsTable = ({ account, transactions , isMainPage}: TransactionTableProps) => {

  const limit=isMainPage?1000:15;
  const filteredTransactions = transactions.filter(
    (tx,index) =>{ 
      return  (tx.senderAccountId === account.accountId || tx.receiverAccountId === account.accountId)&&index<=limit}
  )

  return (
  
  !isMainPage?
  <>
 
    <TabsContent className="min-h-[300px] w-full" value={account.accountId}>
    <div className="flex flex-col gap-4 mt-4 w-full bg-bankGradient bg-opacity-25 p-4 rounded-md  ">
             <div className="flex items-center justify-between">
                <h1 className="text-black-1">{account.accountName}</h1>
                <h1 className="p-2 rounded-full bg-gray-200 text-14 font-inter text-[#344054]">{account.type}</h1>
             </div>
             <div>
               <span className="text-bankGradient">$ {account.availableBalance.toFixed(2)}</span>
             </div>
           </div>
      {filteredTransactions.length === 0 ? (
        <div className="py-4 text-center text-sm text-gray-500">
          No transactions found for this account.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="text-xs text-[#475467] font-medium">
              <TableHead className="w-[125px]">Name</TableHead>
              <TableHead className="px-2 min-w-[80px]">Amount</TableHead>
              <TableHead className="px-2 min-w-[120px]">Status</TableHead>
              <TableHead className="px-2 hidden lg:flex items-center  align-middle  h-10 text-left  min-w-[120px]">Date</TableHead>
              <TableHead className="px-2 w-[90px]">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => {
              const category = tx.category?.[0] || "Uncategorized";
              const { color, borderColor, icon: Icon } = getCategoryAttributes(category);

              return (
                
                <TableRow className={tx.pending?'bg-pink-25':'bg-success-25'+' my-4 '} key={tx.transaction_id}>
                  <TableCell className="font-medium ">
                    
                    <div className="flex items-center gap-3 w-28">
                      <img src={tx.logo_url?tx.logo_url:'/icons/logo.svg'} alt={tx.merchantName} width={25} height={25} className="rounded-[24px]" />
                    <h1 className="text-xs font-inter text-[#344054] truncate font-semibold">
                    {tx.merchantName.replaceAll('*', "").replaceAll('//', "")}
                    </h1>
                    </div>
                    </TableCell>
                    <TableCell className={cn(
  (tx.banklyTransfer 
    ? (tx.senderAccountId === account.accountId ? 'text-red-600' : 'text-success-600') 
    : (tx.amount < 0 ? 'text-red-600' : 'text-success-600')
  ),
  'font-inter text-sm font-semibold'
)}>
  {tx.banklyTransfer ? (
    tx.senderAccountId === account.accountId
      ? `-$ ${Math.abs(tx.amount).toFixed(2)}`
      : `+$ ${tx.amount.toFixed(2)}`
  ) : (
    tx.amount < 0
      ? `-$ ${Math.abs(tx.amount).toFixed(2)}`
      : `+$ ${tx.amount.toFixed(2)}`
  )}
</TableCell>
                  <TableCell className='font-inter text-xs font-semibold flex items-center mt-2'>
                    <span className={cn(tx.pending?'text-red-600 border border-red-600':'text-success-600 border border-success-600','py-1 px-2 rounded-full')}>
                    {tx.pending ? "• declined" : "• successful"}
                    </span>
                    </TableCell>
                  <TableCell className="max-lg:hidden text-[#475467] text-xs ">{formatDate(tx.authorizedDate)}</TableCell>
                  <TableCell className="text-left w-[90px]">
                    <span className={`hidden lg:inline-flex gap-2 py-1 px-3 rounded-full text-xs truncate font-medium border-2 ${color} ${borderColor}`}>
                      {Icon && <Icon className="w-4 h-4" />}
                      {category.indexOf(" ")<0?category:(category.slice(0, category.indexOf(" "))+'...')}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TabsContent>
  </>:<>
  <div className="flex flex-col gap-4 mt-4 w-full bg-bankGradient bg-opacity-25 p-4 rounded-md  ">
  <div className="flex items-center justify-between">
     <h1 className="text-black-1">{account.accountName}</h1>
     <h1 className="p-2 rounded-full bg-gray-200 text-14 font-inter text-[#344054]">{account.type}</h1>
  </div>
  <div>
    <span className="text-bankGradient">$ {account.availableBalance.toFixed(2)}</span>
  </div>
</div>
   <Table>
          <TableHeader>
            <TableRow className="text-xs text-[#475467] font-medium">
              <TableHead className="w-[175px]">Name</TableHead>
              <TableHead className="px-2 min-w-[80px]">Amount</TableHead>
              <TableHead className="px-2 min-w-[120px]">Status</TableHead>
              <TableHead className="px-2 hidden lg:flex items-center  align-middle  h-10 text-left  min-w-[120px]">Date</TableHead>
              <TableHead className="px-2 w-[90px]">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => {
              const category = tx.category?.[0] || "Uncategorized";
              const { color, borderColor, icon: Icon } = getCategoryAttributes(category);

              return (
                
                <TableRow className={tx.pending?'bg-pink-25':'bg-success-25'+' my-4 '} key={tx.transaction_id}>
                  <TableCell className="font-medium ">
                    
                    <div className="flex items-center gap-3 w-[175px]">
                      <img src={tx.logo_url?tx.logo_url:'/icons/logo.svg'} alt={tx.merchantName} width={25} height={25} className="rounded-[24px]" />
                    <h1 className="text-xs font-inter text-[#344054] font-semibold">
                    {tx.merchantName.replaceAll('*', "").replaceAll('//', "")}
                    </h1>
                    </div>
                    </TableCell>
                    <TableCell className={cn(
  (tx.banklyTransfer 
    ? (tx.senderAccountId === account.accountId ? 'text-red-600' : 'text-success-600') 
    : (tx.amount < 0 ? 'text-red-600' : 'text-success-600')
  ),
  'font-inter text-sm font-semibold'
)}>
  {tx.banklyTransfer ? (
    tx.senderAccountId === account.accountId
      ? `-$ ${Math.abs(tx.amount).toFixed(2)}`
      : `+$ ${tx.amount.toFixed(2)}`
  ) : (
    tx.amount < 0
      ? `-$ ${Math.abs(tx.amount).toFixed(2)}`
      : `+$ ${tx.amount.toFixed(2)}`
  )}
</TableCell>
                  <TableCell className='font-inter text-xs font-semibold flex items-center mt-2'>
                    <span className={cn(tx.pending?'text-red-600 border border-red-600':'text-success-600 border border-success-600','py-1 px-2 rounded-full')}>
                    {tx.pending ? "• declined" : "• successful"}
                    </span>
                    </TableCell>
                  <TableCell className="max-lg:hidden text-[#475467] text-xs ">{formatDate(tx.authorizedDate)}</TableCell>
                  <TableCell className="text-left w-[90px]">
                    <span className={`hidden lg:inline-flex gap-2 py-1 px-3 rounded-full text-xs truncate font-medium border-2 ${color} ${borderColor}`}>
                      {Icon && <Icon className="w-4 h-4" />}
                      {category}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
  </Table></>
  
      )
  
  
};

export default TransactionsTable;
