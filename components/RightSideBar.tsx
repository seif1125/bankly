
import BankCard from './BankCard'
import React from 'react'
import { RightSidebarProps } from '@/types'
import { getInitials } from '@/lib/utils'
import PlaidLink  from './PlaidLink'

const RightSideBar :React.FC<RightSidebarProps>= ({user,banks}) => {
  return (
    <aside className='right-sidebar'>
      <section className='flex flex-col pb-8'>
         <div className='profile-banner' />
         <div className="profile">

         <div className="profile-img">
            <span className='text-5xl font-bold text-blue-500'>
               {getInitials(user.firstName+' '+user.lastName)} 
            </span>
            {/* <Image src="/icons/profile.svg" alt="profile" width={50} height={50} /> */}
         </div>
         <div className="profile-details">
            <h1 className="profile-name capitalize">
                {user.firstName} {user.lastName}
            </h1>
            <p className='profile-email'>
              {user.email}
            </p>
         </div>
         </div>

         <div className='banks'>
           <div className='flex items-center  w-full justify-between'>
            <h2 className='header-2 capitalize'>my banks</h2>
           <PlaidLink variant='rside'/>
           </div>
           {banks.length > 0 && (
  <div className="flex relative flex-1 items-center justify-center gap-5">
    {banks.map((bank, index) => (
      <BankCard
        bank={bank}
        key={bank.accountId}
        styled={true}
        index={index}
        zIndex={banks.length - index} // Ensures the last card is on top
      />
       
      
    ))}
  </div>
)}

        
         </div>
         
      </section>
    </aside>
  )
}

export default RightSideBar