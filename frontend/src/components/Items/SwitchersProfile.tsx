import React,{useEffect} from 'react'
import {Tabs,TabsList,Tab, TabsPanels, TabContent} from "./Tabs";
import Achievements from '../Items/Achievements';
import Friends from './Friends';
import MatchHistory from "./MatchHistory";


interface typeProps{
    username?:string
    matchHistory?: any;
    achievements?: any;
}


export default function SwitchersProfile({username,matchHistory,achievements}:typeProps) {
    useEffect(()=>{
        let btnSwitcher = document.getElementById("first");
        btnSwitcher?.click();
        
    },[username])
  return (
    <Tabs edit='gap-0 lg:overflow-visible'>
    <TabsList>
        <Tab id="first">Achievements</Tab>
        <Tab>Friends</Tab>
        <Tab>Match History</Tab>
    </TabsList>
    <TabsPanels edit="overflow-visible">
        <TabContent edit="overflow-visible">
            <Achievements id={username} achievements={achievements}/>
        </TabContent>
        <TabContent edit="overflow-visible">
            <Friends username={username}/>
        </TabContent>
        <TabContent edit="overflow-visible">
            <MatchHistory matchHistory={matchHistory}/>
        </TabContent>
    </TabsPanels>
</Tabs>
  )
}
