import React from 'react';
import friendPicture from '../../assets/friend.jpg';

export default function CardState() {
  return (
    <div className='flex flex-1 justify-start items-center gap-2'>
    <img src={friendPicture} alt="Friend" className='w-14 h-14 rounded-full' />
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-1.5'>
          <span className='text-primaryText text-md max-w-sm overflow-hidden text-ellipsis'>Username</span>
        </div>
        <div className='flex items-center gap-1.5'>
            <span className='w-2 h-2 bg-online rounded-full'></span>
            <span className='text-secondaryText font-light text-sm'>Online</span>
        </div>
      </div>
    </div>
  )
}
