import React from 'react';
import HeaderPhone from './HeaderPhone';
import NavItemsPhone from './NavItemsPhone';

interface typeProps{
  conversation:boolean;
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavigationPhone({conversation, setConversation}:typeProps) {
  return (
    <React.Fragment>
      <HeaderPhone conversation={conversation} setConversation={setConversation}/>
      {!conversation?<NavItemsPhone/>:null}
    </React.Fragment>
  )
}
