import React , {useState,useEffect} from 'react'
import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationPhone from './NavigationPhone/NavigationPhone';
import { useLocation } from 'react-router-dom';

interface typeprops{
  chatState: any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
  conversation:boolean
  setConversation:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navigation({chatState,setChatState,conversation,setConversation}:typeprops) {
  const [messages,setMessages] = useState(false);
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname === "/Messages")
    {
      setMessages(true);
    }
    else
    {
      setMessages(false);
      setConversation(true);
    }
  },[location.pathname]);
  return (
    <React.Fragment>
      <NavigationDesktop chatState={chatState} setChatState={setChatState} message={messages} setMessages = {setMessages} />
      <NavigationPhone conversation={conversation} setConversation={setConversation} chatState={chatState}/>
    </React.Fragment>
  )
}
