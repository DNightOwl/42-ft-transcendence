import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import Achievements from '../Items/Achievements'
export default function SwitchersProfile() {
  return (
    <Tabs edit='gap-0 lg:overflow-visible'>
    <TabsList>
        <Tab>Achievements</Tab>
        <Tab>Friends</Tab>
        <Tab>Match History</Tab>
    </TabsList>
    <TabsPanels edit="overflow-visible">
        <TabContent edit="overflow-visible">
            <Achievements/>
        </TabContent>
        <TabContent edit="overflow-visible">
            <div>two</div>
        </TabContent>
        <TabContent edit="overflow-visible">
            <div>three</div>
        </TabContent>
    </TabsPanels>
</Tabs>
  )
}
