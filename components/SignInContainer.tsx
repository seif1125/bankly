'use client'
import React, { useState }  from 'react'
import SignInForm from './SignInForm'

const SignInContainer = () => {
    const [user,setUser]=useState(null)
  return (
    <>
<div className='mb-12'>
    <h1 className='header-2'>{user?'Link Account': 'Log In' }</h1>
    <p className='header-2 !text-xs'>{user?'Link Account': 'Enter your details to sign in'}</p>
</div>
<SignInForm/>

</>
  )
}

export default SignInContainer