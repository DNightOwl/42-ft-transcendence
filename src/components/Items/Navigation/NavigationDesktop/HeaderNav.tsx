import React from 'react'
import {SearchIcon, ControllerIcon, ArrowDownIcon} from '../../Icons';
import UserPicture from '../../../../assets/user.jpg'
export default function HeaderNav() {
  return (
    <section className='hidden lg:flex justify-between items-start pr-4 ml-64 pt-7'>
        <div className='flex items-center bg-shape pr-4 rounded-md'>
            <input type="text" placeholder='Search for user' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-4 pr-1 focus:outline-none text-primaryText'/>
            <SearchIcon edit="w-4"/>
        </div>
        <div className='flex'>
            <button>
                <ControllerIcon/>
                <span>Play now</span>
            </button>
            <button>
                <img src={UserPicture} alt="user" />
            <span>
                <ArrowDownIcon />
            </span>
            </button>
        </div>
    </section>
  )
}
