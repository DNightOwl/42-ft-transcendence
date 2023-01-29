import React from 'react';
import {SearchIcon} from '../Items/Icons';
import CardFriendMessage from './CardFriendMessage';

interface typeprops{
  chatState:any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
}

export default function MessagesList({chatState,setChatState}:typeprops) {
  {
    console.log(chatState)
  }
  return (
    <div className='flex flex-col h-full  gap-6'>
        <div className='flex items-center bg-shape mx-2 pl-2 rounded-md'>
            <SearchIcon edit="w-3 relative"/>
            <input type="text" placeholder='Search for user' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-xs font-light text-xs py-2.5 px-2 focus:outline-none text-primaryText'/>
        </div>
        <div className='flex flex-col h-full overflow-auto'>
            <CardFriendMessage newMessage={true}/>
            <CardFriendMessage />
            <CardFriendMessage />
            <CardFriendMessage />
        </div>
    </div>
  )
}
