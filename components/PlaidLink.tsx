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
  savePlaidTransactionsToAppwrite,
  fetchAndLogPlaidTransactions,
} from '@/lib/actions/users.actions';
import { Button } from './ui/button';
import Image from 'next/image';
import { Transaction } from '@/types';

const PlaidLink = ({variant='primary'}:{variant?:'navbar'|'primary'|'rside'}) => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [userDocId, setUserDocId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [existingPlaidToken, setExistingPlaidToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndLinkToken = async () => {
      try {
        const loggedInUser = await getLoggedInUser();

    
        if (loggedInUser && loggedInUser.$id
          && loggedInUser.id)
         {
          setUserDocId(loggedInUser.$id);
          setUserId(loggedInUser.id);


          
          if (loggedInUser.plaidToken&& loggedInUser.plaidToken !== '') {
            setExistingPlaidToken(loggedInUser.plaidToken);
          }

         

          const token = await generatePlaidLinkToken(loggedInUser.id);
    
          setLinkToken(token);
  
        } else {
          console.error('No logged-in user found');
        }
      } catch (error) {
        console.error('Error fetching user and Plaid link token:', error);
      }
    };

    fetchUserAndLinkToken();
  }, []);

  const { open } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (publicToken) => {
      try {
        if (!userDocId) throw new Error('User ID not available');

        let accessToken:string = existingPlaidToken|| '';

    
        if (!existingPlaidToken) {
        
          accessToken = await exchangePlaidToken(publicToken,userDocId);
          await savePlaidTokenToUser(userDocId, accessToken);
        }

      
        const plaidAccounts = await fetchPlaidAccounts(userDocId as string,accessToken);
       
        await saveBankAccountsToAppwrite(plaidAccounts,userDocId as string);
        const plaidTransactions: Transaction[] = await fetchAndLogPlaidTransactions(userId as string) as unknown as Transaction[];
        await savePlaidTransactionsToAppwrite(plaidTransactions, userDocId as string);

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