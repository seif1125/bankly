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
import { getCategoryAttributes } from "@/lib/utils";

type Props = {
  accountId: string;
  transactions: any[];
};

const TransactionsTable = ({ accountId, transactions }: Props) => {
  const filteredTransactions = transactions.filter(
    (tx) => tx.account_id === accountId
  );

  return (
    <TabsContent className="min-h-[300px] w-full" value={accountId}>
      {filteredTransactions.length === 0 ? (
        <div className="py-4 text-center text-sm text-gray-500">
          No transactions found for this account.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="px-2">Amount</TableHead>
              <TableHead className="px-2">Status</TableHead>
              <TableHead className="px-2 max-md:hidden">Date</TableHead>
              <TableHead className="px-2 max-md:hidden">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => {
              const category = tx.category?.[0] || "Uncategorized";
              const { color, borderColor, icon: Icon } = getCategoryAttributes(category);

              return (
                <TableRow className={tx.amount<0?'bg-[#F4E4E4] hover:bg-[#F4E4E4]':'bg-[#D9EAE5] hover:bg-[#D9EAE5]'+' my-4 '} key={tx.transaction_id}>
                  <TableCell className="font-medium">
                    
                    <div className="flex items-center gap-3">
                    <h1 className="text-14 text-[#344054] truncate font-semibold">
                    {tx.name.replaceAll('*', "")}
                    </h1>
                    </div>
                    </TableCell>
                  <TableCell>{tx.amount} USD</TableCell>
                  <TableCell>{tx.pending ? "pending" : "successful"}</TableCell>
                  <TableCell className="max-md:hidden">{tx.date}</TableCell>
                  <TableCell className="text-left">
                    <span className={`hidden md:inline-flex gap-2 py-1 px-3 rounded-full text-sm font-medium border-2 ${color} ${borderColor}`}>
                      {Icon && <Icon className="w-4 h-4" />}
                      {category}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </TabsContent>
  );
};

export default TransactionsTable;
