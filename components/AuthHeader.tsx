import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const AuthHeader = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 mb-4">
    <Image src="/icons/logo.svg" alt="bankly logo" width={34} height={34} />
    <h1 className="sidebar-logo">Bankly</h1>
  </Link> 
  )
}

export default AuthHeader