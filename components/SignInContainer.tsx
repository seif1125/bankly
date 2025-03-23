'use client'
import React, { useState }  from 'react'
import SignInForm from './SignInForm'
import Link from 'next/link' 

const SignInContainer = () => {
    const [user,setUser]=useState(null)
  return (
    <>
<div className=''>
    <h1 className='header-2'>{user?'Link Account': 'Log In' }</h1>
    <p className='header-2 !text-xs'>{user?'Link Account': 'Enter your details to sign in'}</p>
</div>
<SignInForm/>
<footer className='flex justify-center items-center '>
    <p className='text-14 text-gray-600 font-normal'>Don't have an account? </p>
    <Link href='/sign-up' className='text-primary form-link'>&nbsp;Sign Up</Link>
</footer>

</>
  )
}

export default SignInContainer