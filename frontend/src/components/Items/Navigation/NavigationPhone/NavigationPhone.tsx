import React from 'react';
import HeaderPhone from './HeaderPhone';
import NavItemsPhone from './NavItemsPhone';

interface typeProps{
  conversation:boolean;
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
  chatState:any,
}

export default function NavigationPhone({conversation, setConversation,chatState}:typeProps) {
  return (
    <React.Fragment>
      <HeaderPhone conversation={conversation} setConversation={setConversation} chatState={chatState}/>
      {!conversation?<NavItemsPhone/>:null}
    </React.Fragment>
  )
}
