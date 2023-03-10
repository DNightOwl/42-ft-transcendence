import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import MessagesList from './MessagesList';

interface typeprops{
    chatState:any,
    setChatState:React.Dispatch<React.SetStateAction<any>>,
    conversation?:boolean,
    setConversation?:React.Dispatch<React.SetStateAction<boolean>>
    setCreate?:React.Dispatch<React.SetStateAction<boolean>>
    edit?:string
  setPassChannel?: React.Dispatch<React.SetStateAction<boolean>>
  setDataProtected?:any



  }

export default function MessagesContainer({chatState,setChatState,conversation,setConversation,setCreate,edit,setPassChannel,setDataProtected}:typeprops) {
  return (
    <Tabs edit={edit}>
        <TabsList>
            <Tab>Chats</Tab>
            <Tab>Channels</Tab>
        </TabsList>
        <TabsPanels>
            <TabContent>
              <MessagesList setChatState={setChatState} conversation={conversation} setConversation={setConversation}/>
            </TabContent>
            <TabContent>
              <MessagesList setChatState={setChatState} conversation={conversation} setConversation={setConversation} channel={true} setCreate={setCreate} setPassChannel={setPassChannel} setDataProtected={setDataProtected}/>
            </TabContent>
        </TabsPanels>
    </Tabs>
  )
}
