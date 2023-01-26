import React from 'react';
import {SearchIcon} from '../Items/Icons';

export default function MessagesList() {
  return (
    <div className='px-2'>
        <div className='flex items-center bg-shape pl-2 rounded-md search'>
            <SearchIcon edit="w-3 relative"/>
            <input type="text" placeholder='Search for user' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-xs font-light text-xs py-2.5 px-2 focus:outline-none text-primaryText'/>
        </div>
    </div>
  )
}
