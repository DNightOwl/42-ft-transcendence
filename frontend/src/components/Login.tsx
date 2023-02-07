import React, { useEffect } from 'react'

export default function Login() {
  useEffect(()=>{
    document.title = "Pong - Login";
    
  })
  return (
    <div className='h-full flex justify-center items-center'>
      <button className='bg-primary p-3 w-40 rounded-md text-white' onClick={()=>{
        window.location.href = "http://localhost:3000/auth/42intra/login"
      }}>Login</button>
    </div>
  )
}
