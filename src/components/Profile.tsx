import React, { useEffect } from 'react'


export default function Profile() {
  useEffect(()=>{
    document.title = "Pong - Profile";
  });

  return (
    <main>
        <h1 className='text-primaryText text-2xl'>Profile</h1>
    </main>
  )
}
