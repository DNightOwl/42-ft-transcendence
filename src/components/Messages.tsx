import React, { useEffect } from 'react'

export default function Messages() {
  useEffect(()=>{
    document.title = "Pong - Message";
  });

  return (
    <main>
        <h1 className='text-primaryText text-2xl'>Messages</h1>
    </main>
  )
}
