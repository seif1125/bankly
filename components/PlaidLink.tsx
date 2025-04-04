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

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  // Fetch user and token
  useEffect(() => {
    const fetchUserAndLinkToken = async () => {
      try {
        const loggedInUser = await getLoggedInUser();
        console.log('Logged in user:', loggedInUser);

        if (loggedInUser && loggedInUser.id) {
          setUserId(loggedInUser.id);
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

  const { open, ready } = usePlaidLink({
    token: linkToken || '',
    onSuccess: async (publicToken, metadata) => {
      try {
        const accessToken = await exchangePlaidToken(publicToken);

        if (!userId) throw new Error('User ID not available');

        // Step 1: Save access token to user's record
        await savePlaidTokenToUser(userId, accessToken);

        // Step 2: Fetch Plaid accounts
        const plaidAccounts = await fetchPlaidAccounts(accessToken,userId);

        // Step 3: Save Plaid accounts to Appwrite
        await saveBankAccountsToAppwrite(userId, plaidAccounts);

        // Step 4: Redirect to dashboard
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
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Link Your Bank Account</h2>
      <button
        onClick={() => open()}
        disabled={!ready || !userId}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Connect Bank Account
      </button>
    </div>
  );
};

export default PlaidLink;
