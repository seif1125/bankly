'use client';
import React, { useState, useEffect } from 'react';
import SignInForm from './SignInForm';
import Link from 'next/link';
import { getLoggedInUser, logOutUser, isUserLinkedToBankAccount } from '@/lib/actions/users.actions';
import PlaidLink from './PlaidLink'; // Ensure you have this component

const SignInContainer = () => {
  const [user, setUser] = useState<any>(null);
  const [hasBankAccount, setHasBankAccount] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
      
        const loggedUser = await getLoggedInUser();
        console.log('Logged in user:', loggedUser);
        if (loggedUser) {
          setUser(loggedUser);
          

          // **Check if user has a linked bank account**
          const isLinked = await isUserLinkedToBankAccount(loggedUser.id);
          setHasBankAccount(isLinked);

          
        } else {
          setHasBankAccount(false); // If no user, assume no bank account
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className=''>
        <h1 className='header-2'>{'Log In'}</h1>
        <p className='header-2 !text-xs'>{'Enter your details to sign in'}</p>
      </div>

      {hasBankAccount === null ? (
        <p>Loading...</p> // **Show loading state while checking**
      ) : hasBankAccount&&user.firstName ? (
        <>
          <SignInForm />
          <footer className='flex justify-center items-center '>
            <p className='text-14 text-gray-600 font-normal'>Don't have an account? </p>
            <Link href='/sign-up' className='text-primary form-link'>&nbsp;Sign Up</Link>
          </footer>
        </>
      ) : (
        <PlaidLink /> // **Show Plaid Link component if no bank account**
      )}
    </>
  );
};

export default SignInContainer;
