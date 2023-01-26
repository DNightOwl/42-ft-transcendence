import React from 'react';
import friendPicture from '../../assets/friend.jpg';

interface Props{
    newMessage?:boolean
}

export default function CardFriendMessage(props:Props) {
  return (
    <a href="/" className='flex items-center gap-2 p-2 hover:bg-shape'>
      <img src={friendPicture} alt="Friend" className='w-10 h-10 rounded-full' />
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-1.5'>
            <span className='text-primaryText text-sm username overflow-hidden text-ellipsis'>Username</span>
            {
                (props.newMessage)?(<span className='w-2 h-2 bg-primary rounded-full'></span>):null
            }
        </div>
        <span className='text-secondaryText font-light text-xs'>message</span>
      </div>
  </a>
  )
}
