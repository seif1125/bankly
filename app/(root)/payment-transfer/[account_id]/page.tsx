'use server'
import React from 'react'
import HeaderBox from '@/components/HeaderBox'
import TransferPaymentsForm from '@/components/TransferPaymentsForm'



const PaymentTransfer = () => {
 

  return (
    <div className="p-4 flex flex-col gap-4 items-start w-full"> 
     <HeaderBox type='title' title="Transfer Payments" subtext="Send money to your friends and family" />
    <TransferPaymentsForm />
    </div>
  )

}

export default PaymentTransfer

