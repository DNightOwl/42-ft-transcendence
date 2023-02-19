import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import { checkToken,addFriend,getUsers,unFriend,blockFriend, unblockFriend, getUserData, getMatchHistoryProfile } from "../Helpers";
import { useLocation } from "react-router-dom";
import { AddFriendIcon,MessagesIcon,FriendIcon,ArrowDownIcon,ArrowUpIcon,UnblockIcon } from "./Items/Icons";
import axios from "axios";
import { toast } from "react-toastify";


interface typeProps{
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Profile({setModal}:typeProps) {

  const sendInvitation = (Id: string) => {
    axios.post("http://localhost:3000/game/sendInvitation", {
      receiverId: Id,
    }, {
      withCredentials: true
    }).then((res) => {
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
  }

  checkToken();
  const [dropDown,setDropDwon] = useState<boolean>(false);
  const [arrow,setArrow] = useState<boolean>(false);
  const [mouse,setMouse] = useState<boolean>(false);
  const [friend,setFriend] = useState<boolean>(false);
  const [display,setDisplay] = useState<boolean>(true);
  const [fill,setFill]    = useState<any>({});
  const [name,setName] = useState("")
  const [unblock,setUnblock] = useState(false);
  const [numberFriends,setNumberFriends]=useState(0);
  const [matchHistory,setMatchHistory] = useState<any>({});

  const location = useLocation();
  //const dataUser = location.state;

  const [dataUser,setDataUser] = useState<any>({})
  useEffect(()=>{
    document.title = "Pong - Profile";
    getUserData((res:any)=>{
      setDataUser(res)
    })

    getMatchHistoryProfile((res:any)=>{
      setMatchHistory(res)
      
    })

  },[])
  
  // useEffect(() => {
  //   document.title = "Pong - Profile";
    
  //   getUsers((res:any)=>{
      
  //     res.data.forEach((e:any)=>{

  //       if(e.username === dataUser?.data.username)
  //       {
  //         setFill(e);
  //       }
  //     })
  //   })
    
  // },[dataUser,unblock,setFriend]);

  // console.log("dataUser: ",dataUser);
  // console.log("fill: ",fill);
  
  
  
  // if(dataUser.data.friend !== 'none' && (fill.blocked === "blocked" && !unblock))
  // {
  //   return(
  //     <main className="flex flex-col gap-12 h-full pb-0 items-center">
  //       <section className="flex  flex-col items-center gap-10  justify-center">
  //       <CardProfile settings={true} setModal={setModal}  dataUser={(dataUser.data.friend!=="none" && dataUser)?.data} block={true}/>
  //       <div className="flex btn-profile items-center gap-3">
  //             <button className="w-36 p-2 rounded-md bg-unblock gap-2 flex items-center justify-center" onClick={()=>{
  //               setUnblock(true)
  //               unblockFriend(fill.username)
  //             }}>
  //               <UnblockIcon edit="w-4 fill-primaryText"/>
  //               <span className="text-primaryText text-sm">Unblock</span>
  //             </button>
  //       </div>
  //     </section>
  //     </main>
  //   )
  // }
  return (
      <main className="flex flex-col gap-12 h-full pb-0">
      <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
        <CardProfile settings={true} setModal={setModal}  dataUser={dataUser.data}/>
        <div className="flex gap-10">
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">{dataUser.NumberofFreinds}</span>
            <span className="text-secondaryText text-sm">Friends</span>
          </span>
          <span className="separtor bg-shape"></span>
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">{matchHistory[0]?.NumberofWins}</span>
            <span className="text-secondaryText text-sm ">Wins</span>
          </span>
          <span className="separtor bg-shape"></span>
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">{matchHistory[0]?.NumberofLoses}</span>
            <span className="text-secondaryText text-sm ">Losses</span>
          </span>
        </div>
        </section>
        <SwitchersProfile matchHistory={matchHistory}/>

        {/* {
          (dataUser.data.friend !== "none" && dataUser)?(
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
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onClick={()=>{
                    setDropDwon(false);
                    setArrow(false);
                    blockFriend(fill.username)
                    setDisplay(false);
                    setUnblock(false)
                    fill.blocked = "blocked"
                  }}>
                    Block
                  </button>
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light" onClick={()=>{
                    sendInvitation(fill.id);
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
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onClick={()=>{
                    setDropDwon(false);
                    setArrow(false);
                    blockFriend(fill.username)
                    setDisplay(false);
                    setUnblock(false)
                    fill.blocked = "blocked"
                  }}>
                    Block
                  </button>
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light" onClick={()=>{
                    setDropDwon(false);
                    setArrow(false);
                    sendInvitation(fill.id);
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
        } */}
         {/* <div className="flex gap-10">
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">{
        // (dataUser.data.friend === "none")?(
        //   getUserData((res:any)=>{
        //     setNumberFriends(res.NumberofFreinds);
            
        //   }),
        //   numberFriends
          
        // ):(dataUser?.data.username === fill.username)?(
        //   fill.NumberofFreinds
            
        //   ):null
            }</span>
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
        </div> */}
      
      {/* {
        (dataUser.data.friend === "none")?(
          <SwitchersProfile />
        ):(dataUser?.data.username === fill.username)?(
            <SwitchersProfile username={dataUser?.data.username}/>
            
          ):null
      } */}
    </main>
  );
}