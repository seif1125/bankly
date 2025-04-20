'use client'
import Link from "next/link";
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import AccountsTabs from "./AccountsTabs";
import TransactionsTable from "./TransactionsTable"; // <- Imported here
import { RecentTransactionsProps} from "@/types";

const RecentTransactions = ({
  accounts = [],
  transactions = [],
}: RecentTransactionsProps) => {

  const [selectedAccountId, setSelectedAccount] = React.useState<string>(
    accounts[0]?.accountId 
  );
  
  return (
    <section className="recent-transactions">
      <div className="flex justify-between items-center">
        <h2 className="recent-transactions-label capitalize">
          recent transactions
        </h2> 
        <Link href={`/transactions-history/${selectedAccountId}`} className="view-all-btn">
          view all
        </Link> 
      </div>

      <Tabs
        defaultValue={accounts[0]?.accountId || "no-account"}
        className="w-full "
      >
        <AccountsTabs setSelectedAccount={(account:string)=>setSelectedAccount(account)}  accounts={accounts} />
        {accounts.map((account) =>(
          <TransactionsTable
            key={account.accountId}
            account={account}
            transactions={transactions}
          />
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
