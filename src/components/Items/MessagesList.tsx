import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs"

export default function MessagesList() {
  return (
    <Tabs>
        <TabsList>
            <Tab>Chats</Tab>
            <Tab>Channels</Tab>
            <Tab>test</Tab>
        </TabsList>
        <TabsPanels>
            <TabContent>
                <div>one</div>
            </TabContent>
            <TabContent>
                <div>two</div>
            </TabContent>
        </TabsPanels>
    </Tabs>
  )
}
