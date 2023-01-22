import React from 'react';
import logo from '../../assets/logo.svg';
import friendPicture from '../../assets/friend.jpg'
import { HomeIcon,MessagesIcon,UserIcon, SearchIcon, ControllerIcon, ArrowDownIcon} from '../Icons';

export default function SideNav() {
  return (
    <section className=' hidden lg:flex flex-col py-7 left-0 fixed gap-12  bg-sideBackground w-60 h-full'>
        <a href="/home" className='flex items-center justify-center'>
            <img src={logo} alt="Pong logo" className='w-44' />
        </a>
        <nav>
          <ul className='flex flex-col gap-10'>
            <li>
              <a href="/" className='desktop-nav-item active'>
                <HomeIcon />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/" className='desktop-nav-item'>
                <MessagesIcon />
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a href="/" className='desktop-nav-item'>
                <UserIcon />
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className='flex flex-col gap-6'>
          <div className=' px-2 flex items-center justify-between'>
            <span className='text-primaryText text-sm'>Friends</span>
            <span className='bg-shape text-secondaryText text-xs p-2 rounded-full h-5 w-5 flex justify-center items-center font-bold'>3</span>
          </div>
          <div className='flex flex-col gap-7 overflow-auto max-h-56'>





          <a href="#" className='flex items-center justify-between hover:bg-shape p-2'>
              <div className='flex items-center gap-2'>
                <img src={friendPicture} alt="Friend" className='w-10 h-10 rounded-full' />
                <div className='flex flex-col gap-1'>
                  <span className='text-primaryText text-sm'>Username</span>
                  <span className='text-secondaryText font-light text-xs'>Online</span>
                </div>
              </div>
              <span className='w-1.5 h-1.5 bg-online rounded-full'></span>
            </a>
            <a href="#" className='flex items-center justify-between hover:bg-shape p-2'>
              <div className='flex items-center gap-2'>
                <img src={friendPicture} alt="Friend" className='w-10 h-10 rounded-full' />
                <div className='flex flex-col gap-1'>
                  <span className='text-primaryText text-sm'>Username</span>
                  <span className='text-secondaryText font-light text-xs'>Online</span>
                </div>
              </div>
              <span className='w-1.5 h-1.5 bg-online rounded-full'></span>
            </a>
            <a href="#" className='flex items-center justify-between hover:bg-shape p-2'>
              <div className='flex items-center gap-2'>
                <img src={friendPicture} alt="Friend" className='w-10 h-10 rounded-full' />
                <div className='flex flex-col gap-1'>
                  <span className='text-primaryText text-sm'>Username</span>
                  <span className='text-secondaryText font-light text-xs'>Online</span>
                </div>
              </div>
              <span className='w-1.5 h-1.5 bg-online rounded-full'></span>
            </a>
            


          </div>
        </div>
    </section>
  )
}
