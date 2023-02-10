import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import { checkToken,addFriend,getUsers,unFriend } from "../Helpers";
import { useLocation } from "react-router-dom";
import { AddFriendIcon,MessagesIcon,FriendIcon,ArrowDownIcon,ArrowUpIcon } from "./Items/Icons";

interface typeProps{
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function Profile({setModal}:typeProps) {
  
  checkToken();
  const [dropDown,setDropDwon] = useState<boolean>(false);
  const [arrow,setArrow] = useState<boolean>(false);
  const [mouse,setMouse] = useState<boolean>(false);
  const [friend,setFriend] = useState<boolean>(false);
  const [display,setDisplay] = useState<boolean>(true);
  const [fill,setFill]     = useState<any>({});

  const location = useLocation();
  const dataUser = location.state;
  
  useEffect(() => {
    document.title = "Pong - Profile";
    
    getUsers((res:any)=>{
      res.data.forEach((e:any)=>{
        if(e.username === dataUser?.data.username)
        {
          setFill(e);
        }
      })
    })
    
  },[]);

  console.log(fill);
  
  
  return (
    <main className="flex flex-col gap-12 h-full pb-0">
      <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
        <CardProfile settings={true} setModal={setModal}  dataUser={dataUser?.data}/>

        {
          (dataUser)?(
            (fill?.freind === "Not friend")?(
              <div className="flex btn-profile items-center gap-3">
                {
                  (friend)?(
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
                    unFriend(dataUser.data.username);
                    setFriend(false);
                    
                    
                  }}>
                    Unfriend
                  </button>
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light" onClick={()=>{
                    setDropDwon(false);
                    setArrow(false);
                    
                  }}>
                    Invite to play
                  </button>
                </div>
                ):null
              }
                    </div>
                  ):(
                    <button className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center" onClick={()=>{
                      setFriend(true);
                      addFriend(dataUser.data.username);
                      console.log("send up");
                      
                    }}>
                    <AddFriendIcon edit="w-5 fill-primaryText"/>
                    <span className="text-primaryText text-sm">Add friend</span>
                  </button>
                  )
                }
                <button className="w-36 p-2 rounded-md bg-shape gap-2 flex items-center justify-center">
                  <MessagesIcon edit="w-5 fill-primaryText"/>
                  <span className="text-primaryText text-sm">Message</span>
                </button>
              </div>
            ):(
              <div className="flex btn-profile items-center gap-3">
                {
                  (display)?(
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
                    unFriend(dataUser.data.username);
                    setDisplay(false);
                    
                  }}>
                    Unfriend
                  </button>
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light" onClick={()=>{
                    setDropDwon(false);
                    setArrow(false);
                    
                  }}>
                    Invite to play
                  </button>
                </div>
                ):null
              }
                    </div>
                  ):(
                    <button className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center" onClick={()=>{
                      setFriend(true);
                      console.log("send down");
                      console.log(dataUser.data.username);
                      
                      addFriend(dataUser.data.username)
                      
                    }}>
                    <AddFriendIcon edit="w-5 fill-primaryText"/>
                    <span className="text-primaryText text-sm">Add friend</span>
                  </button>
                  )
                }
              <button className="w-36 p-2 rounded-md bg-shape gap-2 flex items-center justify-center">
                <MessagesIcon edit="w-5 fill-primaryText"/>
                <span className="text-primaryText text-sm">Message</span>
              </button>
            </div>
            )
          ):null
        }






        <div className="flex gap-10">
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">10</span>
            <span className="text-secondaryText text-sm">Friends</span>
          </span>
          <span className="separtor bg-shape"></span>
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">8</span>
            <span className="text-secondaryText text-sm ">Wins</span>
          </span>
          <span className="separtor bg-shape"></span>
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">0</span>
            <span className="text-secondaryText text-sm ">Losses</span>
          </span>
        </div>
      </section>
      <SwitchersProfile />
    </main>
  );
}