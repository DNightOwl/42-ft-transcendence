import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import MessagesList from './MessagesList';

interface typeprops{
    chatState:any,
    setChatState:React.Dispatch<React.SetStateAction<any>>
  }

export default function MessagesContainer({chatState,setChatState}:typeprops) {
  return (
    <Tabs>
        <TabsList>
            <Tab>Chats</Tab>
            <Tab>Channels</Tab>
        </TabsList>
        <TabsPanels>
            <TabContent>
                <MessagesList chatState={chatState} setChatState={setChatState}/>
            </TabContent>
            <TabContent>
                <div>two</div>
            </TabContent>
        </TabsPanels>
    </Tabs>
  )
}
