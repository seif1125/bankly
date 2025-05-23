import { HeaderBoxProps, User} from '@/types'
import React from 'react'

const HeaderBox = ({type='title',title,subtext,user}:HeaderBoxProps) => {
  return (
    <header className='home-header'>
        <div className='header-box'>
     <h1 className='header-box-title'>
        {title},
        {user&&type=='greeting' && <span className='text-bankGradient capitalize'>&nbsp;{user?.firstName}</span>}
      </h1>
      <p className='header-box-subtext' > {subtext}</p>
        </div>
    
     </header>
  )
}

export default HeaderBox