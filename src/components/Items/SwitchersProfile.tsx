import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import Achievements from '../Items/Achievements'
export default function SwitchersProfile() {
  return (
    <Tabs edit='gap-0'>
    <TabsList>
        <Tab>Achievements</Tab>
        <Tab>Friends</Tab>
        <Tab>Match History</Tab>
    </TabsList>
    <TabsPanels>
        <TabContent>
            <Achievements/>
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
