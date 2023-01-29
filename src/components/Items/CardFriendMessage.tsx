import React from 'react';
import friendPicture from '../../assets/friend.jpg';
import {PointsIcon} from '../Items/Icons';
import {Link} from 'react-router-dom'
interface Props{
    newMessage?:boolean,
    data:any
}

export default function CardFriendMessage(props:Props) {
  return (
    <React.Fragment>
    <Link to="/Messages" className='flex justify-between btn-message px-2 py-4 hover:bg-backgroundHover'>
      <div className='flex items-center gap-2'>
      <img src={props.data.picture} alt="Friend" className='w-10 h-10 rounded-full' />
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1.5'>
            <span className={`text-primaryText text-sm username ${props.newMessage?('new-message'):''}`}>{props.data.username}</span>
              {
                (props.newMessage)?(<span className='w-2 h-2 bg-primary rounded-full'></span>):null
              }
          </div>
          <span className='text-secondaryText font-light text-xs'>{props.data.latestMessage}</span>
        </div>
      </div>
      <button className='w-4 h-4 p-1 flex justify-center items-center rounded-full bg-shape '>
        <PointsIcon edit='w-2.5 h-2.5 fill-secondaryText'/>
      </button>
    </Link>
  </React.Fragment>
  )
}
