

import { ArrowDownIcon, FriendIcon, ArrowUpIcon } from "./Items/Icons"
import { useState } from "react";
import { unFriend } from "../Helpers";
interface typeProps{
    setFriend: React.Dispatch<React.SetStateAction<boolean>>;
    dataUser:any
  
  }

export function BtnFriend ({setFriend,dataUser}:typeProps){
    const [dropDown,setDropDwon] = useState<boolean>(false);
    const [arrow,setArrow] = useState<boolean>(false);
    const [mouse,setMouse] = useState<boolean>(false);
    return(
        <div className="relative">
        <button className="w-36 p-2 rounded-md bg-shape gap-6 flex items-center justify-center" onClick={()=>{
        if(dropDown)
        {
          setDropDwon(false);
          setArrow(false)
        }
        else{
          setDropDwon(true);
          setArrow(true);
        }
      }} onBlur={()=>{
        if(!mouse)
        {
          setDropDwon(false);
          setArrow(false);
        }
      }}>
        <div className="flex gap-2">
          <FriendIcon edit="w-5 fill-primaryText"/>
          <span className="text-primaryText text-sm">Friends</span>
        </div>
        <span className="rounded-full">
          {
            (!arrow)?<ArrowDownIcon edit="w-2 h-2 fill-primaryText"/>:<ArrowUpIcon edit="w-2 h-2 fill-primaryText"/>

          }
        </span>
      </button>
      {
    (dropDown)?(
      <div className="w-full absolute top-11 right-0 flex flex-col gap-2 rounded-md bg-body py-3 shadow z-10"  onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}}>
      <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onClick={()=>{
        setDropDwon(false);
        setArrow(false);
        unFriend(dataUser.username);
        setFriend(false);
        
        
      }}>
        Unfriend
      </button>
      <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onClick={()=>{
        //setDropDwon(false);
        //setArrow(false);
        // blockFriend(fill.username)
        // setDisplay(false);
        // setUnblock(false)
        // fill.blocked = "blocked"
      }}>
        Block
      </button>
      <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light" onClick={()=>{
        // setDropDwon(false);
        // setArrow(false);
        
      }}>
        Invite to play
      </button>
    </div>
    ):null
  }
        </div>
    )
}