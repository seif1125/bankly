'use client'

import React, { useEffect, useState } from 'react'
import AuthForm from '@/components/AuthForm'
import { PaymentTransferSchema } from '@/constants/formschemas'
import { z } from 'zod'
import { Account, AuthField, paramsProps, ReceiverInfo, SenderInfo, TransactionData } from '@/types'
import { applyTransaction, findUserByBanklyAddress, getLoggedInUser, getUserBankAccounts } from '@/lib/actions/users.actions'
import { getInitials, maskCardNumber, showMaskedName } from '@/lib/utils'
import { notFound } from 'next/navigation'



type FormSchema = z.infer<typeof PaymentTransferSchema>

const TransferPaymentsForm = ({params}:paramsProps ) => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [senderInfo, setSenderInfo] = useState<Partial<SenderInfo> | null>(null)
  const [receiverInfo, setReceiverInfo] = useState<ReceiverInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const fetchAccounts = async () => {
        try {
          const user = await getLoggedInUser()
          if (user && user.$id) {
            setSenderInfo({
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user.$id,
            })
            const userAccounts = await (await getUserBankAccounts(user.$id)).documents as unknown as Account[]
      
            setAccounts(userAccounts)
              const selectedAccountId = params?.account_id || accounts[0]?.accountId
              const selectedAccount = accounts.find((account: Account) => account.accountId === selectedAccountId)
              if (!selectedAccount) return notFound();
          }
        } catch (error) {
          console.error('Error loading accounts:', error)
        } finally {
          setIsLoading(false)
        }
      }
  
      fetchAccounts()
    }, [])
  
    const fields: AuthField<FormSchema>[] = [
      {
        name: 'senderAccountId',
        type: 'accountSelect',
        label: 'From Account',
        fullWidth: true,
        options: accounts.map(account => ({
          label: `${account.accountName} ($${account.availableBalance})`,
          value: account.accountId,
        })),
      },
      {
        name: 'banklyAddress',
        type: 'textAddress',
        label: 'To Bankly Address',
        placeholder: 'Enter address (max 15 characters)',
        fullWidth: true,
      },
      {
        name: 'amount',
        type: 'number',
        label: 'Amount',
        placeholder: 'Enter amount to send',
      fullWidth: false,
      },
    ]
  
    const defaultValues: Partial<FormSchema> = {
      senderAccountId: '',
      banklyAddress: '',
      amount: undefined,
    }
  
    const handleSubmit = async (data: FormSchema) => {
      setReceiverInfo(null);
      setSenderInfo((prev) => ({
        ...prev,
        accountId: data.senderAccountId,
        amount: data.amount,
    }))
      const  {
        firstName,
        lastName,
        accountId,
        cardNumber,
        userId,
      } =await    findUserByBanklyAddress(data.banklyAddress)
      
        setReceiverInfo({
            firstName,
            lastName,
            accountId,
            cardNumber,
            userId,
        })
    }
    const handleConfirm = async () => {

      if (!senderInfo?.accountId || !senderInfo?.userId || !receiverInfo?.accountId || !receiverInfo?.userId || senderInfo.amount === undefined) {
        alert('Missing sender or receiver information.');
        return;
      }
      applyTransaction({senderAccountId:senderInfo?.accountId, receiverAccountId:receiverInfo?.accountId, senderUserId:senderInfo?.userId, receiverUserId:receiverInfo?.userId, amount:senderInfo?.amount} as TransactionData)
    }


    if (isLoading) return <p>Loading accounts...</p>
    if (accounts.length === 0) return <p>No accounts available</p>
    return (
     <div className="space-y-4 flex flex-col w-full lg:w-1/2  ">
          <AuthForm<FormSchema>
            schema={PaymentTransferSchema}
            fields={fields}
            submitText="proceed"
            onSubmit={handleSubmit}
            defaultValues={defaultValues as FormSchema}
          />


          
    
          {receiverInfo && (<>
            <hr className='w-full'></hr>
            <div className="p-4 border flex flex-col gap-6  rounded-md bg-muted">
                <h1 className='text-[14px] text-gray-600 font-normal'>Receiver Info</h1>
                <div className='flex items-center justify-between space-x-4'>
                    <div className='flex items-center space-x-4'>
                        <div className='footer_name' >
            <p className='font-bold text-xl text-gray-700'>{getInitials(receiverInfo.firstName+' '+receiverInfo.lastName)}</p>
                        </div> 
                        <div>
                            <h1 className='text-[14px] truncate font-semibold capitalize text-gray-600'>{showMaskedName(receiverInfo.firstName,receiverInfo.lastName)}</h1>
                            <p className='text-[14px] text-gray-600 font-normal'>{maskCardNumber(receiverInfo.cardNumber)}</p>
                        </div>
                    </div>
                    <div>
                        <h1>Amount</h1>
                         <p className='text-[14px] text-gray-600 font-normal'>$ {senderInfo?.amount}</p>
                    </div>
                </div>



            <div className='flex justify-end'>
              <button onClick={handleConfirm} className=' text-white bg-slate-950 px-4 py-2 rounded-md '>Confirm Transfer</button>
            </div>
            

            </div>
            </>
          )}
        </div>
        )
    
}

export default TransferPaymentsForm