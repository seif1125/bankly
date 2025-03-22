import { div } from 'framer-motion/client'
import Image from 'next/image'
import Link from 'next/link'
import BankCard from './BankCard'
import React from 'react'

const RightSideBar :React.FC<RightSidebarProps>= ({user,transactions,banks}) => {
  return (
    <aside className='right-sidebar'>
      <section className='flex flex-col pb-8'>
         <div className='profile-banner' />
         <div className="profile">

         <div className="profile-img">
            <span className='text-5xl font-bold text-blue-500'>
                {user.firstName[0].toUpperCase()+user.lastName[0].toUpperCase()}
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
           <div className='flex  w-full justify-between'>
            <h2 className='header-2 capitalize'>my banks</h2>
           <Link className='cursor-poiner flex gap-2' href='/'>
           <Image src='/icons/plus.svg' alt='add bank' width={20} height={20}/>
           <h2 className='font-semibold text-14 text-gray-600 capitalize'> add bank</h2>
           </Link>
           </div>
           {banks.length > 0 && (
  <div className="flex relative flex-1 items-center justify-center gap-5">
    {banks.map((bank, index) => (
      <BankCard
        bank={bank}
        key={bank.id}
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