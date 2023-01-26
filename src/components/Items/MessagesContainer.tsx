import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import MessagesList from './MessagesList';

export default function MessagesContainer() {
  return (
    <Tabs>
        <TabsList>
            <Tab>Chats</Tab>
            <Tab>Channels</Tab>
        </TabsList>
        <TabsPanels>
            <TabContent>
                <MessagesList />
            </TabContent>
            <TabContent>
                <div>two</div>
            </TabContent>
        </TabsPanels>
    </Tabs>
  )
}
