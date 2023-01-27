import React, { useEffect } from 'react'
import BoxMessagesFriend from './Items/BoxMessagesFriend';
import BoxMessagesUser from './Items/BoxMessagesUser';
import { SearchIcon } from './Items/Icons';

export default function Messages() {
  useEffect(()=>{
    document.title = "Pong - Messages";
  });

  return (
    <main className='flex flex-col h-full relative overflow-hidden'>
      <div className='flex flex-col gap-20 h-full overflow-auto mb-7 pb-7'>
        <BoxMessagesFriend />
        <BoxMessagesUser />
        <BoxMessagesFriend />
        <BoxMessagesUser />
        <BoxMessagesFriend />
        <BoxMessagesUser />
        <BoxMessagesFriend />
        <BoxMessagesUser />
      </div>
        <div className='flex items-center bg-shape pr-4 rounded-md absolute w-full bottom-3'>
            <input type="text" placeholder='Type a message' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText'/>
              <SearchIcon edit="w-4"/>
        </div>
    </main>
  )
}
