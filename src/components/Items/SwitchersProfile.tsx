import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";

export default function SwitchersProfile() {
  return (
    <Tabs>
    <TabsList>
        <Tab>Achievements</Tab>
        <Tab>Friends</Tab>
        <Tab>Match History</Tab>
    </TabsList>
    <TabsPanels>
        <TabContent>
            <div>one</div>
        </TabContent>
        <TabContent>
            <div>two</div>
        </TabContent>
        <TabContent>
            <div>three</div>
        </TabContent>
    </TabsPanels>
</Tabs>
  )
}
