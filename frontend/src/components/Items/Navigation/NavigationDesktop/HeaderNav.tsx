import React, { useEffect } from 'react';
import {SearchIcon, ControllerIcon, ArrowDownIcon,ArrowUpIcon,SettingsNavIcon,LogoutIcon} from '../../Icons';
import UserPicture from '../../../../assets/user.jpg';
import {useState} from 'react'
import { getProfile } from '../../../../Helpers';

interface typeProps{
    messages:boolean,
    chatState:any,
    settings?:React.Dispatch<React.SetStateAction<boolean>>
}
export default function HeaderNav({messages,chatState,settings}:typeProps) {
    const [dropDown,setDropDown] = useState<boolean>(false)
    const [mouse,setMouse] = useState<boolean>(false)
    const [data,setData] = useState<any>({});

    useEffect(()=>{
        function getRes(res:any){
            setData(res)
        }
        getProfile(getRes)
    },[])
  return (
    (!messages)?(
        <section className='hidden lg:flex justify-between items-start mr-4 ml-64 pt-7 gap-5'>
            <div className='flex-1'>
                <div className='flex items-center bg-shape pr-4 rounded-md'>
                    <input type="text" placeholder='Search for user' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText'/>
                    <SearchIcon edit="w-4"/>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <button className='bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3'>
                    <ControllerIcon edit="w-7"/>
                    <span>Play now</span>
                </button>
                <div className='relative text-primaryText text-sm'>
                <button className='flex items-center gap-2' onClick={()=>{(!dropDown)?setDropDown(true):setDropDown(false)}} onBlur={()=>{if(!mouse)setDropDown(false)}}>
                    <div className='flex items-center gap-2'>
                        <img src={UserPicture} alt="User" className='w-10 h-10 rounded-full' />
                        <span className='username'>{(data.nickname)?data.nickname.charAt(0).toUpperCase() + data.nickname.slice(1):null}</span>
                    </div>
                    <span className='bg-shape w-4 h-4 rounded-full flex justify-center items-center'>
                        {(!dropDown)?(<ArrowDownIcon edit="w-1.5"/>):(<ArrowUpIcon edit='w-1.5 h-1.5 fill-secondaryText' />)}
                    </span>
                </button>
                {
                    (dropDown)?(
                            <div className='absolute top-12 rounded-md bg-body shadow right-0 w-36 flex flex-col py-5 gap-2'>
                            <button className='flex gap-2   hover:bg-backgroundHover items-center justify-center p-2' onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                               if(settings)
                               {
                                   settings(true);
                                   document.body.style.overflow="hidden";
                                   setDropDown(false)
                               }
                            }}>
                                <SettingsNavIcon edit='w-5 h-5 fill-primaryText'/>
                                Settings
                            </button>
                            <button className='flex gap-2  hover:bg-backgroundHover items-center justify-center p-2'>
                                <LogoutIcon edit='w-5 h-5 fill-primaryText'/>
                                Logout
                            </button>
                        </div>
                        ):null
                    }
                </div>
            </div>
        </section>
    ):null
  )
}
