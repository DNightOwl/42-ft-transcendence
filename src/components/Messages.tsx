import React, { useEffect } from 'react'
import BoxMessagesFriend from './Items/BoxMessagesFriend';
import BoxMessagesUser from './Items/BoxMessagesUser';
import { SendIcon } from './Items/Icons';

interface typeProps{
  chatState:any
}

export default function Messages({chatState}:typeProps) {
  useEffect(()=>{
    document.title = "Pong - Messages";
  });

  return (
    <main className='flex flex-col h-full relative overflow-hidden pt-0'>
      <div className='h-full overflow-auto mb-7 pb-7'>
        <div className='flex flex-col gap-20'>
          {
            (chatState.conversation)?(
              chatState.conversation.map((e:any,index:number)=>{
                if(e.type === "friend")
                  return <BoxMessagesFriend message={e.message} time={e.time} key={index}/>
                else
                  return <BoxMessagesUser message={e.message} time={e.time} key={index}/>
              })
            ):null
          }
        </div>
      </div>
        <div className='flex items-center bg-shape pr-2 rounded-md absolute w-full bottom-3 send'>
            <input type="text" placeholder='Type a message' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-5 pl-3 pr-2 focus:outline-none text-primaryText'/>
            <button className='bg-primary w-8 h-8 flex justify-center items-center rounded-md'>
              <SendIcon edit="w-4 fill-white"/>
            </button>
        </div>
    </main>
  )
}
