import React from 'react';
import logo from '../../assets/logo.svg';
import { HomeIcon,MessagesIcon,UserIcon, SearchIcon, ControllerIcon, ArrowDownIcon} from '../Icons';

export default function SideNav() {
  return (
    <section className=' hidden lg:flex flex-col gap-20 py-7 bg-sideBackground w-60 h-full'>
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
        <div>

        </div>
    </section>
  )
}
