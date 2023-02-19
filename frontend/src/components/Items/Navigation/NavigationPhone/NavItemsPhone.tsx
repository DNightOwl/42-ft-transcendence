import React, { useEffect, useState } from 'react';
import { HomeIcon,MessagesIcon,UserIcon,SearchIcon } from '../../Icons';
import { NavLink} from "react-router-dom";
import { getUserData } from '../../../../Helpers';

export default function NavigationPhone() {
    const [data,setData] = useState<any>({});
    useEffect(()=>{
        getUserData((res:any)=>{
          setData(res);
        })
      },[])
      
  return (
    <React.Fragment>
    <section className='fixed bottom-0 w-full px-3 pb-3 lg:hidden bg-body phone-nav'>
        <nav className='bg-shape p-2 px-3 rounded-lg'>
            <ul className='flex justify-between items-center'>
                <li>
                    <NavLink to="/Home" className='phone-nav-item'>
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
                    <a href="/Home" className='flex flex-col justify-center items-center gap-1.5'>
                        <img className='w-11 h-11 rounded-3xl' src={data.pictureLink} alt="User profile" />
                    </a>
                </li>
            </ul>
        </nav>
    </section>
    </React.Fragment>
  )
}
