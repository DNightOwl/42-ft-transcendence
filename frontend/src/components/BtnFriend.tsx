

import { ArrowDownIcon, FriendIcon, ArrowUpIcon } from "./Items/Icons"
import { useState } from "react";


import { unFriend,blockFriend } from "../Helpers";
import { checkToken,addFriend,getUsers,unblockFriend, getUserData } from "../Helpers";
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect} from "react";
import { Link } from "react-router-dom";



interface typeProps{
    setFriend?: React.Dispatch<React.SetStateAction<any>>;
    dataUser:any
  
  }

export function BtnFriend ({setFriend,dataUser}:typeProps){
    const [dropDown,setDropDwon] = useState<boolean>(false);
    const [arrow,setArrow] = useState<boolean>(false);
    const [mouse,setMouse] = useState<boolean>(false);
    const [fill,setFill]    = useState<any>({});

    
  //   useEffect(() => {
  //   document.title = "Pong - Profile";
    
  //   getUsers((res:any)=>{
      
  //     res.data.forEach((e:any)=>{

  //       if(e.username === dataUser?.data.username)
  //       {
  //         setFill(e);
  //       }
  //     })
  //   })
    
  // },[dataUser]);

  
    const sendInvitation = (Id: string) => {
      axios.post("http://localhost:3000/game/sendInvitation", {
        receiverId: Id,
      }, {
        withCredentials: true
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        toast.error(err.response.data.message)
      })
    }
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
      <Link to="/AddFriend" state={{data:dataUser}} className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onClick={()=>{
        setDropDwon(false);
        setArrow(false);
        unFriend(dataUser.username);
        if(setFriend)
          setFriend(false);
        
        
      }}>
        Unfriend
      </Link>
      <Link to="/Block" state={{data:dataUser}} className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onClick={()=>{
        blockFriend(dataUser.username)

      }}>
        Block
      </Link>
      <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light" onClick={()=>{
        setDropDwon(false);
        setArrow(false);
        console.log("_______",dataUser.id);
        sendInvitation(dataUser.id);

        
      }}>
        Invite to play
      </button>
    </div>
    ):null
  }
        </div>
    )
}