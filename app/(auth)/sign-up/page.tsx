
'use client'
import AuthHeader from '@/components/AuthHeader'
import SignUpContainer from '@/components/SignUpContainer'
import React from 'react'
const signUp = () => {
  return (
    <section className='mx-4 md:mx-0 w-full md:w-[60%] lg:w-[50%] flex justify-center ' >
         <header className='flex flex-col w-full  auth-header '>
     <AuthHeader/>
     <SignUpContainer/>
     </header>
    
</section>
  )
}

export default signUp