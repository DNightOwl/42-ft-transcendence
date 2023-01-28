
import React from 'react';
import logo from '../../../../assets/logo.svg';
import CardFriendOnline from '../../CardFriendOnline';
import { NavLink,Link} from "react-router-dom";
import { HomeIcon,MessagesIcon,UserIcon} from '../../Icons';
import MessagesContainer from '../../MessagesContainer';

interface typeprops{
  messages:boolean;
  setMessages:React.Dispatch<React.SetStateAction<boolean>>
}

export default function SideNav({messages,setMessages}:typeprops) {

  return (
    <section className=' hidden lg:flex flex-col py-7 left-0 2xl:left-auto fixed gap-12  bg-sideBackground w-60 h-full'>
    <Link to="/" className='flex items-center justify-center'>
        <img src={logo} alt="Pong logo" className='w-44' />
    </Link>
    {
      (!messages)?(
      <React.Fragment>
          <nav>
            <ul className='flex flex-col gap-10'>
              <li>
                <NavLink to="/" className='desktop-nav-item'>
                  <HomeIcon />
                  <span>Home</span>
                  </NavLink>
              </li>
            <li>
              <NavLink to="/Messages" className='desktop-nav-item' onClick={()=>{setMessages(true)}}>
                <MessagesIcon />
                <span>Messages</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/Profile" className='desktop-nav-item'>
                <UserIcon />
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='flex flex-col gap-6 h-full overflow-hidden'>
          <div className=' px-2 flex items-center justify-between'>
            <span className='text-primaryText text-sm'>Friends</span>
            <span className='bg-shape text-secondaryText text-xs p-2 rounded-full h-5 w-5 flex justify-center items-center font-bold'>3</span>
          </div>
          <div className='flex flex-col gap-7 h-full overflow-auto overflow-x-hidden'>
            <CardFriendOnline/>
            <CardFriendOnline/>
            <CardFriendOnline/>
          </div>
        </div>
      </React.Fragment>
      ):(
        <MessagesContainer/>
      )
    }
</section>
  )
}
