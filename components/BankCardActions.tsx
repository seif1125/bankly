'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  deleteUserBankAccount,
  updateUserBankAddress,
} from '@/lib/actions/users.actions';
import { BankCardActionsProps } from '@/types';

const BankCardActions = ({ initialAccount, initialUser,onUserUpdate}:BankCardActionsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAddress, setEditedAddress] = useState(initialAccount.banklyAddress);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialUser);

  const [isDefault,setIsDefault] = useState(user?.defaultAccountId === initialAccount.accountId);



  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        setLoading(true);
        await updateUserBankAddress({
          accountId: initialAccount.$id,
          newAddress: editedAddress,
        });
        await onUserUpdate()
        console.log('Address updated!');// 👈 Refresh after update
      } catch (err) {
        console.error('Error updating address:', err);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleDelete = async (accountId: string) => {
    try {
      await deleteUserBankAccount(accountId);
      await onUserUpdate()
      console.log('Account deleted!');
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  const handleSendMoney = (accountId: string) => {
    console.log('Send money to:', accountId);
  };

 

  return (
    <div className="flex items-center justify-between mt-2 px-2 text-sm w-full">
      <div className="text-black-2 w-full max-w-[150px]">
        {isEditing ? (
          <input
            type="text"
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
            disabled={loading}
          />
        ) : (
          <span>{editedAddress}</span>
        )}
      </div>

      <div className="flex gap-2 ml-2">
        <button onClick={handleEditToggle} title={isEditing ? 'Save' : 'Edit'} disabled={loading}>
          <Image
            src={isEditing ? '/icons/save.svg' : '/icons/edit.svg'}
            alt={isEditing ? 'Save' : 'Edit'}
            width={20}
            height={20}
            className="hover:scale-110 transition"
          />
        </button>

        <button onClick={() => handleDelete(initialAccount.$id)} title="Delete">
          <Image
            src="/icons/delete.svg"
            alt="Delete"
            width={20}
            height={20}
            className="hover:scale-110 transition"
          />
        </button>

        <button onClick={() => handleSendMoney(initialAccount.accountId)} title="Send Money">
          <Image
            src="/icons/money-send.svg"
            alt="Send Money"
            width={20}
            height={20}
            className="hover:scale-110 transition"
          />
        </button>

       
      </div>
    </div>
  );
};

export default BankCardActions;
