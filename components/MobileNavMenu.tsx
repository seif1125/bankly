'use client'
import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import {  cn } from '@/lib/utils'
import React from 'react'
import { usePathname } from 'next/navigation'
import {
    Sheet,
    SheetClose,
    SheetContent,
 
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import SideBarFooter from './SideBarFooter'
import { User } from '@/types'
  
const MobileNavMenu = ({user}:User) => {
    const pathname=usePathname();
  return (
    <section className="md:hidden "> 
    <Sheet >
  <SheetTrigger>
    <Image src="/icons/hamburger.svg" alt="notification bell" width={30} height={30} />
  </SheetTrigger>
  <SheetContent className='flex flex-col justify-between md:hidden' side={'left'}>
    
  <nav>
      <SheetClose asChild>
<Link href="/" className="flex items-center space-x-2 mb-12">
        <Image src="/icons/logo.svg" alt="bankly logo" width={50} height={50} />
        <h1 className="sidebar-logo">Bankly </h1>
      </Link>
    </SheetClose>
  
      {sidebarLinks.map((item) => {
        const isActive = pathname === item.route || pathname.startsWith(item.route);
        return (
            <SheetClose asChild key={item.route}>
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
          </SheetClose>
        );
      })}
    </nav>
    <SideBarFooter user={user} type='mobile' />
  </SheetContent>
  
</Sheet>

    </section>
  )
}

export default MobileNavMenu