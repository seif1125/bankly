import {  getCurrencyAbbr } from '@/lib/utils'
import React from 'react'

const BankCard:React.FC<BankCardProps>= ({bank,index,zIndex}) => {
  return (
    <div className="bank-card"  style={{
        top: `${index * 10}px`, // Each card shifts 10px lower than the previous
        left: `${index * 20}px`, // Each card shifts 10px to the right
        zIndex: zIndex, // Ensures the last card is on top
      }}>
         <div   className="bank-card-content "
              >
                <div className='bank-info'>  
                 <h2>{bank.name}</h2>
                 <h4>{getCurrencyAbbr()+' '}{bank.balance}</h4>
                </div>
                <div className=' flex flex-col self-center mt-6 text-xs text-white font-medium'>
                 <p>{bank.expiryDate}</p>
                 <p className='uppercase'>{bank.cardHolder}</p>
                </div>
                <div className='flex flex-col self-center mb-2  text-xs font-bold text-[#C0C0C0] tracking-widest drop-shadow-md ml-[60px]'>
                <p>•••• •••• •••• {bank.cardNumber.slice(-4)}</p>
                </div>
                       
                </div>
    </div>
  )
}

export default BankCard