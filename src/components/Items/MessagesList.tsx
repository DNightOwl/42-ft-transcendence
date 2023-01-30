import React from 'react';
import {SearchIcon} from '../Items/Icons';
import CardFriendMessage from './CardFriendMessage';
import { dataChat } from '../../Data';

interface typeprops{
  chatState:any,
  setChatState:React.Dispatch<React.SetStateAction<any>>,
  conversation?:boolean
  setConversation?:React.Dispatch<React.SetStateAction<boolean>>
}

export default function MessagesList({chatState,setChatState,conversation,setConversation}:typeprops) {
  return (
    <div className='flex flex-col h-full  gap-6 pb-20 lg:pb-0'>
        <div className='flex items-center bg-shape mx-2 pl-2 rounded-md'>
            <SearchIcon edit="w-3 relative"/>
            <input type="text" placeholder='Search for friend' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-xs font-light text-xs py-2.5 px-2 focus:outline-none text-primaryText'/>
        </div>
        <div className='flex flex-col h-full overflow-auto'>
          {
            (dataChat)?(
              dataChat.map((e,index)=>{
                return <CardFriendMessage data={dataChat[index]} key={index} setChatState={setChatState} conversation={conversation} setConversation={setConversation}/>
              })
            ):null
          }
        </div>
    </div>
  )
}
