import React, { useEffect} from 'react'
import BoxMessagesFriend from './Items/BoxMessagesFriend';
import BoxMessagesUser from './Items/BoxMessagesUser';
import { SendIcon } from './Items/Icons';
import MessagesContainer from './Items/MessagesContainer';

interface typeProps{
  chatState:any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
  conversation:boolean
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Messages({chatState,setChatState,conversation,setConversation}:typeProps) {

  useEffect(()=>{
    document.title = "Pong - Messages";
    let objDiv = document.querySelectorAll(".conversation");
    
    objDiv.forEach(e=>{
      e.scrollTop = e.scrollHeight;
    })
  },[chatState]);

  return (
    <React.Fragment>
    <main className={`lg:pt-0 overflow-hidden h-full lg:ml-64 lg:mr-4 pb-0 ${conversation?'pt-0':''}`}>
      <div className={`${conversation?'':'hidden'} lg:flex flex-col h-full relative overflow-hidden mb-16 pb-16 lg:mb-8 lg:pb-8`}>
        <div className='h-full overflow-auto mb-16 pb-16 lg:mb-8 lg:pb-8 conversation'>
          <div className='flex flex-col gap-20'>
            {
              (chatState.conversation)?(
                chatState.conversation.map((e:any,index:number)=>{
                  if(e.type === "friend")
                  return <BoxMessagesFriend message={e.message} time={e.time} key={index}/>
                  else
                  return <BoxMessagesUser message={e.message} time={e.time} key={index}/>
                })
              ):null
            }
          </div>
        </div>
          <div className='flex items-center bg-shape pr-2 rounded-md absolute w-full bottom-3 send'>
            <input type="text" placeholder='Type a message' className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-4 pl-3 pr-2 focus:outline-none text-primaryText'/>
            <button className='bg-primary w-8 h-8 flex justify-center items-center rounded-md'>
              <SendIcon edit="w-4 fill-white"/>
            </button>
        </div>
      </div>
      { 
        (!conversation)?<MessagesContainer chatState={chatState} setChatState={setChatState} conversation={conversation} setConversation={setConversation}/>:null
      }
    </main>
    </React.Fragment>
  )
}
