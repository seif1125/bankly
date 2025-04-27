'use client'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import {  cn } from '@/lib/utils'
import React from 'react'
import { usePathname } from 'next/navigation'
import SideBarFooter from './SideBarFooter'
import { User } from '@/types'
import PlaidLink from './PlaidLink'

interface SideBarProps {
  user: User;
}
const SideBar = ({user}:SideBarProps) => {
const pathname=usePathname();

  return (
    <section className="sidebar md:flex hidden"> 
    <nav>
      <Link href="/" className="flex items-center space-x-2 mb-12">
        <Image src="/icons/logo.svg" alt="bankly logo" width={50} height={50} />
        <h1 className="sidebar-logo">Bankly </h1>
      </Link>
  
      {sidebarLinks.map((item) => {
      const isActive = (item.label==='Home'&&pathname===item.route)||(pathname.startsWith(item.route)&&item.label!=='Home');
        return (
          <Link
            href={item.route}
            key={item.route}
            className={cn(
              "sidebar-link hover:bg-bank-gradient-hover-effect group",
              { "bg-bank-gradient": isActive }
            )}
          >
            <Image
              src={item.imgURL}
              className={cn(
                "transition-all duration-300",  
                { "brightness-[3] invert-0": isActive },
                "group-hover:brightness-[3] group-hover:invert-0"  
              )}
              alt={item.label}
              width={30}
              height={30}
            />
            <p className={cn("sidebar-label", { "!text-white": isActive })}>{item.label}</p>
          </Link>
        );
      })}
      <PlaidLink variant='navbar'/>
    </nav>
    <SideBarFooter user={user} type='desktop'/>
  </section>
  
  )
}

export default SideBar