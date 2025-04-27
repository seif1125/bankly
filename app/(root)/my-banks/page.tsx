'use client'
import React, { useEffect, useState } from 'react';


import BankCard from '@/components/BankCard';
import Image from 'next/image';
import { getLoggedInUser, getUserBankAccounts } from '@/lib/actions/users.actions';
import { redirect } from 'next/dist/server/api-utils';
import BankCardActions from '@/components/BankCardActions';
import HeaderBox from '@/components/HeaderBox';
import { Account, User } from '@/types';

const BankPage = () => {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [user, setUser] = useState<User| null>(null);
  const fetchAccounts = async () => {

    const user= await getLoggedInUser()
    if (!user) return;
    setUser(user as User);
    const accounts=await getUserBankAccounts(user.$id);
    setAccounts(accounts.documents as any);

    }
  useEffect(() => {
 
  fetchAccounts()


},[])
 






  return (
    <div className="p-4">
   <HeaderBox title='Manage your accounts' type='title' subtext='Access, manage your accounts ' user={user as User}/>
   <h1 className="text-2xl font-bold mt-6 ">Bank Accounts</h1>
   <div className="flex flex-wrap gap-6 mt-4">
      {accounts.map((account) => (
        <div key={account.$id} className="flex flex-col items-center w-full sm:w-[300px]">  
         <BankCard bank={account} index={0} zIndex={0} />
         <BankCardActions initialAccount={account} initialUser={user as User} onUserUpdate={fetchAccounts}/>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default BankPage;