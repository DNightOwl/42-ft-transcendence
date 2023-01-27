import React, { useEffect } from 'react'
import BoxMessagesFriend from './Items/BoxMessagesFriend';
import BoxMessagesUser from './Items/BoxMessagesUser';
import { SendIcon } from './Items/Icons';

export default function Messages() {
  useEffect(()=>{
    document.title = "Pong - Messages";
  });

  return (
    <main className='flex flex-col h-full relative overflow-hidden pt-0'>
      <div className='h-full overflow-auto 2xl:flex 2xl:justify-center mb-7 pb-7 2xl:mb-10'>
        <div className='flex flex-col content 2xl:w-full gap-20'>
          <BoxMessagesFriend />
          <BoxMessagesUser />
          <BoxMessagesFriend />
          <BoxMessagesUser />
          <BoxMessagesFriend />
          <BoxMessagesUser />
          <BoxMessagesFriend />
          <BoxMessagesUser />
        </div>
      </div>
        <div className='flex items-center bg-shape pr-2 rounded-md absolute w-full bottom-3 send'>
            <input type="text" placeholder='Type a message' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-3 pr-2 focus:outline-none text-primaryText'/>
            <button className='bg-primary w-8 h-8 flex justify-center items-center rounded-md'>
              <SendIcon edit="w-4 fill-white"/>
            </button>
        </div>
    </main>
  )
}
