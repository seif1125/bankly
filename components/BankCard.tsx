import { cn, getCurrencyAbbr } from '@/lib/utils';
import { BankCardProps } from '@/types';
import React from 'react';

const BankCard: React.FC<BankCardProps> = ({ bank, index, zIndex, styled = false }) => {
  return (
    <div
      className={` ${!styled ?'bank-card':'bank-card-styled'} w-full sm:w-[300px]`}
      style={
        styled
          ? {
              top: `${index * 10}px`,
              left: `${index * 20}px`,
              zIndex: zIndex,
            }
          : undefined
      }
    >
      <div className="bank-card-content">
        <div className="bank-info">
          <h2>{bank.accountName}</h2>
          <h4>
            {'$'} {bank.availableBalance}
          </h4>
        </div>
        <div className={cn("flex flex-col   ml-3 text-xs text-white font-medium",styled?'mt-[1.5rem] self-center':'mt-16 self-start')}>
          <p>{bank.expiryDate}</p>
          <p className="uppercase">seif amr</p>
        </div>
        <div className={cn("flex flex-col  mb-2 text-xs font-bold text-[#C0C0C0] tracking-widest drop-shadow-md",styled?'ml-[80px] self-center':'ml-[15px] self-start')}>
          <p>•••• •••• •••• {bank.cardNumber?.slice(-4)}</p>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
