import React from 'react';
import {PointsIcon} from '../Items/Icons';
import {Link} from 'react-router-dom';
import { dataChat } from '../../Data';
interface Props{
    newMessage?:boolean,
    data:any,
    setChatState:React.Dispatch<React.SetStateAction<any>>
    conversation?:boolean
    setConversation?:React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardFriendMessage(props:Props) {
  
  return (
    <React.Fragment>
    <Link to="/Messages" className={`flex justify-between btn-message px-2 py-4 lg:hover:bg-backgroundHover btn-friend-message ${props.data.id === dataChat[0].id ? 'lg:bg-backgroundHover':null}`} onClick={(event)=>{

        let btnMessage = document.querySelectorAll(".btn-friend-message");
        let find:boolean = false;

        btnMessage.forEach((e)=>{e.classList.remove("lg:bg-backgroundHover")});
        event.currentTarget.classList.add("lg:bg-backgroundHover")

        btnMessage.forEach((e,index)=>{
          e.classList.forEach(element=>{
            if(element === "lg:bg-backgroundHover")
            {
              find = true;
              
              if(index >= btnMessage.length / 2)
                btnMessage[index - (btnMessage.length / 2)].classList.add("lg:bg-backgroundHover");
              return;
            }
          })
          if(find)
            return;
        })

        dataChat.forEach((e,index)=>{
          if(e.id === props.data.id)
          {
            props.setChatState(dataChat[index]);
            return;
          }
        })
        if(props.setConversation)
          props.setConversation(true);
    }}>
      <div className='flex items-center gap-2'>
      <img src={props.data.picture} alt="Friend" className='w-10 h-10 rounded-full' />
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1.5'>
            <span className={`text-primaryText text-sm username ${props.newMessage?('new-message'):''}`}>{props.data.username.charAt(0).toUpperCase() + props.data.username.slice(1)}</span>
              {
                (props.newMessage)?(<span className='w-2 h-2 bg-primary rounded-full'></span>):null
              }
          </div>
          <span className='text-secondaryText font-light text-xs w-40 overflow-hidden text-ellipsis'>{props.data.latestMessage}</span>
        </div>
      </div>
      <button className='w-4 h-4 p-1 flex justify-center items-center rounded-full bg-shape '>
        <PointsIcon edit='w-2.5 h-2.5 fill-secondaryText'/>
      </button>
    </Link>
  </React.Fragment>
  )
}
