'use client'
import React, { useState,useEffect }  from 'react'
import SignInForm from './SignInForm'
import Link from 'next/link' 
import { getLoggedInUser, logoutUser } from '@/lib/appwrite'
const SignInContainer =  () => {
    
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const loggedUser = await getLoggedInUser();
          if (loggedUser) {
            setUser(loggedUser);
            console.log("Logged in user:", loggedUser);
            await logoutUser();
            
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
  
      fetchUser();
    }, []);
  return (
    <>
<div className=''>
    <h1 className='header-2'>{ 'Log In' }</h1>
    <p className='header-2 !text-xs'>{ 'Enter your details to sign in'}</p>
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