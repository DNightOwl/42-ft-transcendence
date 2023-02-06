import React from 'react';
import SideNav from './SideNav';
import HeaderNav from './HeaderNav';


interface typeprops{
  chatState:any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
  message:boolean,
  setMessages:React.Dispatch<React.SetStateAction<boolean>>
  settings?:React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavigationDesktop({chatState ,setChatState, message, setMessages,settings}:typeprops) {
  return (
    <React.Fragment>
      <SideNav messages={message} setMessages={setMessages} chatState={chatState} setChatState={setChatState}/>
      <HeaderNav messages={message} chatState={chatState} settings={settings}/>
    </React.Fragment>
  )
}
