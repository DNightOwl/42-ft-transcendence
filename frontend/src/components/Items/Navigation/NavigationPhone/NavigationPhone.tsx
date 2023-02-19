import React from 'react';
import HeaderPhone from './HeaderPhone';
import NavItemsPhone from './NavItemsPhone';

interface typeProps{
  conversation:boolean;
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
  chatState:any,
  setMembers?:React.Dispatch<React.SetStateAction<boolean>>
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavigationPhone({conversation, setConversation,chatState,setMembers,setAdd}:typeProps) {
  return (
    <React.Fragment>
      <HeaderPhone conversation={conversation} setConversation={setConversation} chatState={chatState} setMembers={setMembers} setAdd={setAdd}/>
      {!conversation?<NavItemsPhone/>:null}
    </React.Fragment>
  )
}
