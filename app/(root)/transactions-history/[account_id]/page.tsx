
import HeaderBox from '@/components/HeaderBox'
import TransactionsTable from '@/components/TransactionsTable'
import { getLoggedInUser, getUserBankAccounts, fetchTransactionsFromAppwrite } from '@/lib/actions/users.actions'
import { Account, paramsProps, Transaction } from '@/types'
import { notFound } from 'next/navigation'




const TransactionHistoryPage = async ({ params }: paramsProps) => {
  const user = await getLoggedInUser() 
  if (!user) return notFound()

  const accounts = (await getUserBankAccounts(user.$id)).documents as unknown as Account[]
  const transactions = (await fetchTransactionsFromAppwrite(user.$id)) as unknown as Transaction[]

  const selectedAccountId = params?.account_id || accounts[0]?.accountId
  const selectedAccount = accounts.find((account: Account) => account.accountId === selectedAccountId)
  if (!selectedAccount) return notFound();

  return (
    <section className="p-6">
        <HeaderBox type='title' title='Account transaction' subtext='manage your account transactions'  />
        <TransactionsTable account={selectedAccount as Account} transactions={transactions} isMainPage={true} />
    </section>
  )
}

export default TransactionHistoryPage
