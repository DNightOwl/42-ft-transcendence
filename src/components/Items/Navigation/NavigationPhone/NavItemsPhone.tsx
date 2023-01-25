import React from 'react';
import { HomeIcon,MessagesIcon,UserIcon,SearchIcon } from '../../Icons';
import userPicture from '../../../../assets/user.jpg';
import { NavLink} from "react-router-dom";
import { ControllerIcon } from '../../Icons';

export default function NavigationPhone() {
  return (
    <React.Fragment>
    <section className='fixed bottom-0 w-full px-3 pb-3 lg:hidden bg-body'>
        <nav className='bg-shape p-2 rounded-lg'>
            <ul className='flex justify-between items-center'>
                <li>
                    <NavLink to="/" className='phone-nav-item'>
                        <HomeIcon/>
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Messages" className='phone-nav-item'>
                        <MessagesIcon/>
                        <span>Messages</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/Profile" className='phone-nav-item'>
                        <UserIcon/>
                        <span>Profile</span>
                    </NavLink>
                </li>
                <li>
                    <a href="/" className='phone-nav-item'>
                        <SearchIcon/>
                        <span>Search</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='flex flex-col justify-center items-center gap-1.5'>
                        <img className='w-11 h-11 rounded-3xl' src={userPicture} alt="User profile" />
                    </a>
                </li>
            </ul>
        </nav>
    </section>
    <button className='fixed bg-primary bottom-24 right-3 flex justify-center items-center  w-14 h-14 rounded-full lg:hidden'>
        <ControllerIcon edit='w-8' />
    </button>
    </React.Fragment>
  )
}
