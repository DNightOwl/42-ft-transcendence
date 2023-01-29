import React from 'react';
import SideNav from './SideNav';
import HeaderNav from './HeaderNav';


interface typeprops{
  chatState:any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
  message:boolean,
  setMessages:React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavigationDesktop({chatState ,setChatState, message, setMessages}:typeprops) {
  return (
    <React.Fragment>
      <SideNav messages={message} setMessages={setMessages} chatState={chatState} setChatState={setChatState}/>
      <HeaderNav messages={message} chatState={chatState}/>
    </React.Fragment>
  )
}
