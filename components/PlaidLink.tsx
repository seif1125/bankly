'use client';
import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';

import {
  generatePlaidLinkToken,
  exchangePlaidToken,
  getLoggedInUser,
  savePlaidTokenToUser,
  saveBankAccountsToAppwrite,
  fetchPlaidAccounts,
} from '@/lib/actions/users.actions';
import { Button } from './ui/button';
import Image from 'next/image';

const PlaidLink = ({variant='primary'}:{variant?:'navbar'|'primary'|'rside'}) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [existingPlaidToken, setExistingPlaidToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndLinkToken = async () => {
      try {
        const loggedInUser = await getLoggedInUser();
        console.log('Logged in user:', loggedInUser);

        if (loggedInUser && loggedInUser.id) {
          setUserId(loggedInUser.id);

          // Check if a plaidToken already exists
          if (loggedInUser.plaidToken&& loggedInUser.plaidToken !== '') {
            console.log('Plaid token already exists:', loggedInUser.plaidToken); 
            setExistingPlaidToken(loggedInUser.plaidToken);
          }

          // Still generate link token to show Plaid interface
          console.log('Generating Plaid link token...');
          const token = await generatePlaidLinkToken(loggedInUser.id);
          console.log('Plaid link token:', token);
          setLinkToken(token);
          console.log(linkToken);
        } else {
          console.error('No logged-in user found');
        }
      } catch (error) {
        console.error('Error fetching user and Plaid link token:', error);
      }
    };

    fetchUserAndLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (publicToken, metadata) => {
      try {
        if (!userId) throw new Error('User ID not available');

        let accessToken = existingPlaidToken;

        // Only exchange public token if no access token is saved
        if (!existingPlaidToken) {
         
          accessToken = await exchangePlaidToken(publicToken,userId);
          await savePlaidTokenToUser(userId, accessToken);
        }

        // Fetch and store bank accounts
        const plaidAccounts = await fetchPlaidAccounts(userId,accessToken);
        await saveBankAccountsToAppwrite(plaidAccounts);
         
        router.push('/');
      } catch (error) {
        console.error('Error linking account:', error);
        alert('Failed to link bank account');
      }
    },
    onExit: (error) => {
      if (error) {
        console.error('Plaid exit error:', error);
        alert('Exited Plaid Link flow');
      }
    },
  });
  return (
    <>
      {variant === 'navbar' ? (
        <Button onClick={() => open()} className=" w-full !bg-transparent shadow-none sidebar-link hover:bg-bank-gradient-hover-effect group h-[54px] !p-3">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={30}
            height={30}
          />
          <p className='sidebar-label'>Connect bank</p>
        </Button>
      ) : variant === 'rside' ? (
        <Button onClick={() => open()} variant="ghost" className="plaidlink-rside">
          <Image src='/icons/plus.svg' alt='add bank' width={20} height={20}/>
          <h2 className='font-semibold text-14 text-gray-600 capitalize'>Add bank</h2>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-primary">
          Connect your bank
        </Button>
      )}
    </>
  );
};

export default PlaidLink;