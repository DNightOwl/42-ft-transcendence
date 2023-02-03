import React from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import Achievements from '../Items/Achievements';
import Friends from './Friends';
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
            <Friends />
        </TabContent>
        <TabContent edit="overflow-visible">
            <div>three</div>
        </TabContent>
    </TabsPanels>
</Tabs>
  )
}
