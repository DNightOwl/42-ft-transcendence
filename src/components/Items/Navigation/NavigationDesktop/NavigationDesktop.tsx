import React, { useState,useEffect } from 'react';
import SideNav from './SideNav';
import HeaderNav from './HeaderNav';
import { useLocation } from 'react-router-dom';


interface typeprops{
  chatState:any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
}

export default function NavigationDesktop({chatState ,setChatState}:typeprops) {
  const [messages,setMessages] = useState(false);
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === "/Messages")
      setMessages(true);
    else
      setMessages(false)
  },[location.pathname]);
  return (
    <React.Fragment>
      <SideNav messages={messages} setMessages={setMessages} chatState={chatState} setChatState={setChatState}/>
      <HeaderNav messages={messages} chatState={chatState}/>
    </React.Fragment>
  )
}
