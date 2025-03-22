
import SignInContainer from '@/components/SignInContainer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'





const signIn = () => {
 
  return (
    
    <section className='mx-4 md:mx-0' >
         <header className='flex flex-col  signin-header ml-0 md:ml-40 '>
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Image src="/icons/logo.svg" alt="bankly logo" width={34} height={34} />
            <h1 className="sidebar-logo">Bankly</h1>
          </Link> 
          <SignInContainer/>
          </header>
         
    </section>

  )
}

export default signIn