import React, { useEffect } from 'react'

export default function Messages() {
  useEffect(()=>{
    document.title = "Pong - Messages";
  });

  return (
    <main>
        <h1 className='text-primaryText text-2xl'>Messages</h1>
    </main>
  )
}