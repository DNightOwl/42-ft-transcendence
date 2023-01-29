import React , {useState,useEffect} from 'react'
import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationPhone from './NavigationPhone/NavigationPhone';
import { useLocation } from 'react-router-dom';

interface typeprops{
  chatState: any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
}

export default function Navigation({chatState,setChatState}:typeprops) {
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
      <NavigationDesktop chatState={chatState} setChatState={setChatState} message={messages} setMessages = {setMessages} />
      <NavigationPhone />
    </React.Fragment>
  )
}
