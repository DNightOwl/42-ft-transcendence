import React,{useEffect, useState} from 'react';
import logo from '../../../../assets/logo.svg';
import { Link } from "react-router-dom";
import CardState from "../../CardState"
import {ArrowLeftIcon} from "../../Icons"
import { getUsers } from '../../../../Helpers';

interface typeProps{
  conversation:boolean;
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
  chatState:any,
  setMembers?:React.Dispatch<React.SetStateAction<boolean>>
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function HeaderPhone({conversation,setConversation,chatState,setMembers,setAdd}:typeProps) {
  const [profile,setProfile] = useState<any>({});
  useEffect(()=>{
    getUsers((res:any)=>{
      res.data.forEach((e:any)=>{
        if(e.username === chatState?.username)
        {
          setProfile(e);
        }
      })
    })
  },[chatState])
  
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
    <section className='mx-3 flex items-center py-4 justify-start gap-4 lg:hidden'>
      <button className='w-6 h-6 rounded-full flex justify-center items-center bg-shape' onClick={()=>{setConversation(false)}}>
        <ArrowLeftIcon edit='w-2.5 h-2.5 fill-secondaryText' />
      </button>
      {
            !chatState.role?(
                <Link to="/ProfileUser" state={{data:profile}}>
                <CardState chatState={chatState} setMembers={setMembers} setAdd={setAdd}/>
                </Link>
            ):(
                <CardState chatState={chatState} setMembers={setMembers} setAdd={setAdd}/>
            )
        }
    </section>
  )
}
