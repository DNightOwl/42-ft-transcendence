import React from 'react';
import logo from '../../../../assets/logo.svg';
import { Link } from "react-router-dom";

interface typeProps{
  conversation:boolean;
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
}

export default function HeaderPhone({conversation,setConversation}:typeProps) {
  if(!conversation)
  {
    return (
      <section className='flex justify-center items-center pt-7 lg:hidden'>
          <Link to="/">
              <img src={logo} alt="Pong logo" className='w-48' />
          </Link>
      </section>
    )
  }
  return(
    <section>
      <div>hello</div>
      <button onClick={()=>{setConversation(false)}}>back</button>
    </section>
  )
}
