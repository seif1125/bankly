import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'
import { fetchAndLogPlaidTransactions, getLoggedInUser, getUserBankAccounts } from '@/lib/actions/users.actions'
import { User } from '@/types'
import RecentTransactions from '@/components/RecentTransactions'
import getTotalBalance from '@/lib/utils'

const  dashboard = async() => {

const user= await getLoggedInUser()
console.log('sdasdas',user);
const accounts=await getUserBankAccounts(user.$id);
const transactions=await fetchAndLogPlaidTransactions(user?.id)


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
     accounts={accounts.documents}
     currentBalance={getTotalBalance(accounts.documents)}
     totalBanks={accounts.documents.length}
     />
  <RecentTransactions accounts={accounts.documents} transactions={transactions}/>


    </div>
    <RightSideBar 
     user={user as User}
      transactions={[{id:'1',amount:1234.35,type:'deposit',date:'2021-09-01'}]} 
      banks={accounts.documents}
      
      
     
     />
    </section>
   
  )
}

export default dashboard