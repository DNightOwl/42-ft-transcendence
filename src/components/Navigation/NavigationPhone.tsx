import React from 'react'
import HomeIcon from '../icons/Home';
import MessagesIcon from '../icons/Messages';
import UserIcon from '../icons/User';
import SearchIcon from '../icons/Search';
import userPicture from '../../assets/user.jpg';

export default function NavigationPhone() {
  return (
    <div className='fixed bottom-0 w-full p-3'>
        <nav className='bg-shape p-2 rounded-lg'>
            <ul className='flex justify-between items-center'>
                <li>
                    <a href="/" className='flex flex-col justify-center items-center gap-1.5 active'>
                        <HomeIcon/>
                        <span className='text-secondaryText text-xs'>Home</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='flex flex-col justify-center items-center gap-1.5'>
                        <MessagesIcon/>
                        <span className='text-secondaryText text-xs'>Messages</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='flex flex-col justify-center items-center gap-1.5'>
                        <UserIcon/>
                        <span className='text-secondaryText text-xs'>Profile</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='flex flex-col justify-center items-center gap-1.5'>
                        <SearchIcon/>
                        <span className='text-secondaryText text-xs'>Search</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='flex flex-col justify-center items-center gap-1.5'>
                        <img className='w-11 h-11 rounded-3xl' src={userPicture} alt="User profile" />
                    </a>
                </li>
            </ul>
        </nav>
    </div>
  )
}
