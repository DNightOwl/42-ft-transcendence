import React, { useEffect } from 'react'
import BoxMessagesFriend from './Items/BoxMessagesFriend';
import BoxMessagesUser from './Items/BoxMessagesUser';

export default function Messages() {
  useEffect(()=>{
    document.title = "Pong - Messages";
  });

  return (
    <main className='flex flex-col gap-20'>
      <BoxMessagesFriend />
      <BoxMessagesUser />
    </main>
  )
}
