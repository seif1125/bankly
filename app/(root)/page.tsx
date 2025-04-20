import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'
import { fetchAndLogPlaidTransactions, getLoggedInUser, getUserBankAccounts } from '@/lib/actions/users.actions'
import { Account, Transaction, User } from '@/types'
import RecentTransactions from '@/components/RecentTransactions'
import getTotalBalance from '@/lib/utils'

const  dashboard = async() => {

  const user = await getLoggedInUser();
  if (!user) return null;

  const accountsRes = await getUserBankAccounts(user.$id);
  const transactions: Transaction[] = await fetchAndLogPlaidTransactions(user.id) as unknown as Transaction[];
  console.log('transss',transactions.length);
  if (!accountsRes) return null;
  const accounts: Account[] = accountsRes.documents as unknown as Account[];


  return (
    <section className='home'> 
    
    <div className='home-content '>
      
    <HeaderBox 
    title='welcome'
    type='greeting' 
    subtext='Access  , manage
     your accounts and transaction effeciently'
     user={user as User}
     />
     <TotalBalanceBox 
     accounts={accounts}
     currentBalance={getTotalBalance(accounts)}
     totalBanks={accounts.length}
     />
  <RecentTransactions accounts={accounts} transactions={transactions}/>


    </div>
    <RightSideBar 
     user={user as User}
    banks={accounts}
      
      
     
     />
    </section>
   
  )
}

export default dashboard