import Link from "next/link";
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import AccountsTabs from "./AccountsTabs";
import TransactionsTable from "./TransactionsTable"; // <- Imported here

const RecentTransactions = ({
  accounts = [],
  transactions = [],
}: {
  accounts: any[];
  transactions: any[];
}) => {
  return (
    <section className="recent-transactions">
      <div className="flex justify-between items-center">
        <h2 className="recent-transactions-label capitalize">
          recent transactions
        </h2>
        <Link href={`/transactions`} className="view-all-btn">
          view all
        </Link>
      </div>

      <Tabs
        defaultValue={accounts[0]?.accountId || "no-account"}
        className="w-full"
      >
        <AccountsTabs accounts={accounts} />

        {accounts.map((account) => (
          <TransactionsTable
            key={account.accountId}
            accountId={account.accountId}
            transactions={transactions}
          />
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
