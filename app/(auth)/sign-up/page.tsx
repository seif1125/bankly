
'use client'
import AuthHeader from '@/components/AuthHeader'
import SignUpContainer from '@/components/SignUpContainer'
import React from 'react'
const signUp = () => {
  return (
    <section className='mx-4 md:mx-0' >
    <header className='flex flex-col  auth-header ml-0 md:ml-40 '>
     <AuthHeader/>
     <SignUpContainer/>
     </header>
    
</section>
  )
}

export default signUp