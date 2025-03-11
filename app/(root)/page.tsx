import React from 'react'
import HeaderBox from '@/components/HeaderBox'
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
    </div></section>
   
  )
}

export default dashboard