import React, { useEffect, useState } from 'react';
import { HomeIcon,MessagesIcon,UserIcon,SearchIcon } from '../../Icons';
import userPicture from '../../../../assets/user.jpg';
import { NavLink} from "react-router-dom";
import { ControllerIcon } from '../../Icons';
import { getUserData } from '../../../../Helpers';

export default function NavigationPhone() {
    const [data,setData] = useState<any>({});
    useEffect(()=>{
        getUserData((res:any)=>{
          setData(res);
        })
      },[])
      let fill = {username: data?.nickname,picture:data.pictureLink,status:data.status, friend:"none"};
  return (
    <React.Fragment>
    <section className='fixed bottom-0 w-full px-3 pb-3 lg:hidden bg-body phone-nav'>
        <nav className='bg-shape p-2 rounded-lg'>
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
                    <NavLink to="/Profile" state={{data:fill}} className='phone-nav-item'>
                        <UserIcon/>
                        <span>Profile</span>
                    </NavLink>
                </li>
                <li>
                    <a href="/Home" className='phone-nav-item'>
                        <SearchIcon/>
                        <span>Search</span>
                    </a>
                </li>
                <li>
                    <a href="/Home" className='flex flex-col justify-center items-center gap-1.5'>
                        <img className='w-11 h-11 rounded-3xl' src={userPicture} alt="User profile" />
                    </a>
                </li>
            </ul>
        </nav>
    </section>
    <button className='fixed bg-primary bottom-24 right-3 flex justify-center items-center  w-14 h-14 rounded-full lg:hidden phone-nav'>
        <ControllerIcon edit='w-8' />
    </button>
    </React.Fragment>
  )
}
