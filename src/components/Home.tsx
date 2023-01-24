import React, { useEffect } from 'react'

export default function Home() {
  useEffect(()=>{
    document.title = "Pong - Home";
  });
  
  return (
    <main>
        <h1 className='text-primaryText text-2xl'>Home</h1>
    </main>
  )
}
