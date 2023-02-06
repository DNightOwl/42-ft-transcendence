import React, { useEffect } from 'react'

export default function Login() {
  useEffect(()=>{
    document.title = "Pong - Login";
  })
  return (
    <div className='h-full flex justify-center items-center'>
      <button className='bg-primary p-3 w-40 rounded-md text-white'>Login</button>
    </div>
  )
}
