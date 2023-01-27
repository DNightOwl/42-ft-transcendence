import React from 'react';
import {SearchIcon, ControllerIcon, ArrowDownIcon} from '../../Icons';
import UserPicture from '../../../../assets/user.jpg';
import CardState from '../../CardState'


interface typeProps{
    messages:boolean;
}

export default function HeaderNav({messages}:typeProps) {
  return (
    <section className='hidden lg:flex justify-between items-center mr-4 ml-64 pt-7 gap-5'>
        {
            (!messages)?(
            <div className='flex-1 2xl:flex 2xl:justify-center'>
                <div className='flex items-center bg-shape pr-4 rounded-md search'>
                    <input type="text" placeholder='Search for user' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText'/>
                    <SearchIcon edit="w-4"/>
                </div>
            </div>
            ):(
                <CardState/>
            )
        }
        <div className='flex items-center gap-5'>
            <button className='bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3'>
                <ControllerIcon edit="w-7"/>
                <span>Play now</span>
            </button>
            <button className='flex items-center gap-2 text-primaryText text-sm'>
                <div className='flex items-center gap-2'>
                <img src={UserPicture} alt="User" className='w-10 h-10 rounded-full' />
                <span className='username'>Username</span>
                </div>
            <span className='bg-shape w-4 h-4 rounded-full flex justify-center items-center'>
                <ArrowDownIcon edit="w-1.5"/>
            </span>
            </button>
        </div>
    </section>
  )
}
