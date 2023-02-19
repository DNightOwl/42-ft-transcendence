import React, { useEffect } from 'react'
import { checkTokenLogin } from '../Helpers';

export default function Login() {
  checkTokenLogin();
  const domain : string | undefined = process.env.REACT_APP_DOMAIN;

  useEffect(()=>{
    document.title = "Pong - Login";
    
  })
  return (
    <div className='h-full flex justify-center items-center'>
      <button className='bg-primary p-3 w-40 rounded-md text-white' onClick={()=>{
        window.location.href = "http://"+domain+":3000/auth/42intra/login"
      }}>Login</button>
    </div>
  )
}
