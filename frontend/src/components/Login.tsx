import React, { useEffect } from 'react'
import axios from 'axios';


export default function Login() {
  axios.get("http://localhost:3000/profile", {
    withCredentials: true,
      headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
    }).then((res)=>{
        window.location.href = "http://localhost:3001/Home"
    }).catch(error=>{
        if(error.response.data.statusCode === 401)
        {
          axios.get("http://localhost:3000/auth/refresh", {
            withCredentials: true,
            headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
          }).then((res)=>{
            window.location.href = "http://localhost:3001/Home"
          });
        }
    });
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
