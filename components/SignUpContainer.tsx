import React from 'react'
import SignUpForm from './SignUpForm'
import Link from 'next/link'

const SignUpContainer = () => {
 
  return (
    <>
    <div className=''>
    <h1 className='header-2'>Sign Up</h1>
    <p className='header-2 !text-xs'>Enter your details to sign up</p>
</div>
<SignUpForm/>
<footer className='flex justify-center items-center '>
    <p className='text-14 text-gray-600 font-normal'>Already have an account? </p>
    <Link href='/sign-in' className='text-primary form-link'>&nbsp;Log In</Link>
</footer>

</>
  )
}

export default SignUpContainer