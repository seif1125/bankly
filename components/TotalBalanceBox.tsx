'use client'
import React from 'react'
import {  getCurrencyAbbr } from '@/lib/utils'
import CountUp from 'react-countup'
import DoughnutChart from './DoughnutChart';
import { TotalBalanceBoxProps } from '@/types';



const TotalBalanceBox: React.FC<TotalBalanceBoxProps> = ({ totalBanks, currentBalance,accounts=[] }) => {
  return (
    <section className='total-balance'>
        
            <div className='total-balance-chart'>
            <DoughnutChart accounts={accounts}/>
            </div>
            <div className='flex flex-row md:items-start md:flex-col gap-4'>
                <h2 className='header-2'>
                    Bank Accounts: {totalBanks}
                </h2>
             
           
                <div className='flex flex-col '>
                    <p className='total-balance-label'> total balance</p>
                   <CountUp 
                className='total-balance-amount' 
                duration={.25}
                separator=","
                decimals={2}
                end={currentBalance as number}
                prefix={getCurrencyAbbr()+' '}
                />
                </div>
            </div> 
    

    </section>
  )
}

export default TotalBalanceBox