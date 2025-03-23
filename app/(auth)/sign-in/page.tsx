
import AuthHeader from '@/components/AuthHeader'
import SignInContainer from '@/components/SignInContainer'
import React from 'react'






const signIn = () => {
 
  return (
    
    <section className='mx-4 md:mx-0' >
         <header className='flex flex-col  auth-header ml-0 md:ml-40 '>
          <AuthHeader/>
          <SignInContainer/>
          </header>
         
    </section>

  )
}

export default signIn