import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import RightSideBar from '@/components/RightSideBar'
import { getLoggedInUser } from '@/lib/actions/users.actions'
import { User } from '@/types'

const  dashboard = async() => {

const user= await getLoggedInUser()

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
     totalBanks={1}
     currentBalance={1234.35}

     />

    </div>
    <RightSideBar 
     user={user as User}
      transactions={[{id:'1',amount:1234.35,type:'deposit',date:'2021-09-01'}]} 
      banks={[
        {
          id: '1',
          name: 'AIB',
          branch: 'Lagos',
          accountNumber: '1234567890',
          balance: 1234.35,
          cardHolder: user.name,
          cardNumber: '1234 5678 9012 3456',
          expiryDate: '12/27'
        },
        {
          id: '2',
          name: 'GTBank',
          branch: 'Abuja',
          accountNumber: '0987654321',
          balance: 4321.65,
          cardHolder: 'John Doe',
          cardNumber: '9876 5432 1098 7654',
          expiryDate: '08/26'
        }
      ]}
      
     
     />
    </section>
   
  )
}

export default dashboard