import React from 'react';
import logo from '../../../../assets/logo.svg';
import { Link } from "react-router-dom";
import CardState from "../../CardState"
import {ArrowLeftIcon} from "../../Icons"

interface typeProps{
  conversation:boolean;
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
  chatState:any,
  setMembers?:React.Dispatch<React.SetStateAction<boolean>>
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function HeaderPhone({conversation,setConversation,chatState,setMembers,setAdd}:typeProps) {
  if(!conversation)
  {
    return (
      <section className='flex justify-center items-center pt-7 lg:hidden'>
          <Link to="/Home">
              <img src={logo} alt="Pong logo" className='w-48' />
          </Link>
      </section>
    )
  }
  return(
    <section className='mx-3 flex items-center py-4 justify-center gap-4 lg:hidden'>
      <button className='w-6 h-6 rounded-full flex justify-center items-center bg-shape' onClick={()=>{setConversation(false)}}>
        <ArrowLeftIcon edit='w-2.5 h-2.5 fill-secondaryText' />
      </button>
      <CardState chatState={chatState} setMembers={setMembers} setAdd={setAdd}/>
    </section>
  )
}
