
import AuthHeader from '@/components/AuthHeader'
import SignInContainer from '@/components/SignInContainer'
import React from 'react'






const signIn = () => {
 
  return (
    
    <section className='mx-4 md:mx-0 w-[50%] flex justify-center ' >
         <header className='flex flex-col w-full  auth-header '>
          <AuthHeader/>
          <SignInContainer/>
          </header>
         
    </section>

  )
}

export default signIn