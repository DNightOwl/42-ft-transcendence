import React from 'react'
import logo from '../../../../assets/logo.svg';
import CardUser from '../../CardUser';
import { NavLink,Link } from "react-router-dom";
import { HomeIcon,MessagesIcon,UserIcon} from '../../Icons';

export default function SideNav() {
  return (
    <section className=' hidden lg:flex flex-col py-7 left-0 fixed gap-12  bg-sideBackground w-60 h-full'>
    <Link to="/" className='flex items-center justify-center'>
        <img src={logo} alt="Pong logo" className='w-44' />
    </Link>
    <nav>
      <ul className='flex flex-col gap-10'>
        <li>
          <NavLink to="/" className='desktop-nav-item'>
            <HomeIcon />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Messages" className='desktop-nav-item'>
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
    <div className='flex flex-col gap-6'>
      <div className=' px-2 flex items-center justify-between'>
        <span className='text-primaryText text-sm'>Friends</span>
        <span className='bg-shape text-secondaryText text-xs p-2 rounded-full h-5 w-5 flex justify-center items-center font-bold'>3</span>
      </div>
      <div className='flex flex-col gap-7 overflow-auto max-h-56'>
        <CardUser/>
        <CardUser/>
        <CardUser/>
      </div>
    </div>
</section>
  )
}
