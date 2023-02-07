import React,{useEffect} from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import Achievements from '../Items/Achievements';
import Friends from './Friends';
import MatchHistory from "./MatchHistory";

export default function SwitchersProfile() {
    useEffect(()=>{
        let btnSwitcher = document.getElementById("first");
        btnSwitcher?.click();
    },[])
  return (
    <Tabs edit='gap-0 lg:overflow-visible'>
    <TabsList>
        <Tab id="first">Achievements</Tab>
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
            <MatchHistory />
        </TabContent>
    </TabsPanels>
</Tabs>
  )
}
