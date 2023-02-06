import React,{useState} from 'react';
import {ControllerIcon, ArrowDownIcon,ArrowUpIcon,SettingsNavIcon,LogoutIcon} from '../../Icons';
import UserPicture from '../../../../assets/user.jpg';
import CardState from '../../CardState'


interface typeProps{
    chatState:any
    settings?:React.Dispatch<React.SetStateAction<boolean>>
}

export default function HeaderChat({chatState,settings}:typeProps) {
    const [dropDown,setDropDown] = useState<boolean>(false)
    const [mouse,setMouse] = useState<boolean>(false)


    return (
    <section className='hidden lg:flex justify-between items-start pt-7 gap-5 pb-7'>
        <CardState chatState={chatState}/>
            <div className='flex items-center gap-5'>
                <button className='bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3'>
                    <ControllerIcon edit="w-7"/>
                    <span>Play now</span>
                </button>
                <div className='relative text-primaryText text-sm'>
                <button className='flex items-center gap-2' onClick={()=>{(!dropDown)?setDropDown(true):setDropDown(false)}} onBlur={()=>{if(!mouse)setDropDown(false)}}>
                    <div className='flex items-center gap-2'>
                        <img src={UserPicture} alt="User" className='w-10 h-10 rounded-full' />
                        <span className='username'>Username</span>
                    </div>
                    <span className='bg-shape w-4 h-4 rounded-full flex justify-center items-center'>
                        {(!dropDown)?(<ArrowDownIcon edit="w-1.5"/>):(<ArrowUpIcon edit='w-1.5 h-1.5 fill-secondaryText' />)}
                    </span>
                </button>
                {
                    (dropDown)?(
                            <div className='absolute top-12 rounded-md bg-body shadow left-0 w-full flex flex-col py-5 gap-2'>
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
      )
}
