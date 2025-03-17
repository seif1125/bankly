import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
const dashboard = () => {
  const user= {'firstname':'seif'}
  return (
    <section className='home'> <div className='home-content '>
    <HeaderBox 
    title='welcome'
    type='greeting' 
    subtext='Access  , manage
     your accounts and transaction effeciently'
     user={user?.firstname}
     />
     <TotalBalanceBox
     totalBanks={1}
     currentBalance={1234.35}

     />
    </div></section>
   
  )
}

export default dashboard