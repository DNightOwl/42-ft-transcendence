import React from 'react';
import friendPicture from '../../assets/friend.jpg';
import {PointsIcon} from '../Items/Icons';

interface Props{
    newMessage?:boolean
}

export default function CardFriendMessage(props:Props) {
  return (
    <React.Fragment>
    <a href="/" className='flex justify-between btn-message px-2 py-4 hover:bg-shape'>
      <div className='flex items-center gap-2'>
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
      </div>
      <button className='w-5 h-5 bg-shape '>
        <PointsIcon/>
      </button>
    </a>
  </React.Fragment>
  )
}
