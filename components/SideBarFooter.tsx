import { getLoggedInUser, logOutUser } from '@/lib/actions/users.actions';
import { getInitials } from '@/lib/utils';
import { SideBarFooterProps } from '@/types';
import Image from 'next/image';



const SideBarFooter = ({user, type = 'desktop' }: SideBarFooterProps) => {
 

    const handleLogout= async  ()=> {
        
        await logOutUser()
    }

  return (
    <footer className='footer'>
      <div className={type === 'desktop' ? 'footer_name' : 'footer_name-mobile'}>
        <p className='font-bold text-xl text-gray-700'>{getInitials(user.firstName)}</p>
      </div>
      <div  className={type === 'desktop' ? 'footer_email' : 'footer_email-mobile'}>
     <h1 className='text-[14px] truncate font-semibold capitalize text-gray-600'>{user.firstName}</h1>
     <p className='text-[14px] text-gray-600 font-normal'>{user.email}</p>
      </div>
      <div className='footer_image' onClick={handleLogout}>
       <Image src='icons/logout.svg'   alt='logout' width={50} height={50}/>
      </div>
    </footer>
  );
};

export default SideBarFooter;
