import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import { checkToken,addFriend,getUsers,unFriend,blockFriend, unblockFriend, getUserData,getMachHistoryUser, getMatchHistoryProfile } from "../Helpers";
import { useLocation } from "react-router-dom";
import { AddFriendIcon,MessagesIcon,FriendIcon,ArrowDownIcon,ArrowUpIcon,UnblockIcon } from "./Items/Icons";
import { BtnAddFriend } from "./BtnAddFriend";
import { BtnMessage } from "./BtnMessage";
import { BtnFriend } from "./BtnFriend";


export default function ProfileUser() {

  checkToken();
  const [dropDown,setDropDwon] = useState<boolean>(false);
  const [arrow,setArrow] = useState<boolean>(false);
  const [mouse,setMouse] = useState<boolean>(false);
  const [friend,setFriend] = useState<boolean>(false);
  const [click,setClick] = useState<boolean>(false);
  const [display,setDisplay] = useState<boolean>(true);
  const [name,setName] = useState("")
  const [unblock,setUnblock] = useState(false);
  const [numberFriends,setNumberFriends]=useState(0);
  const [enter,setEnter] = useState(true)
  const [matchHistory,setMatchHistory] = useState<any>({});

  const location = useLocation();
  const fill = location.state;
  const [data,setData]    = useState<any>({});

  useEffect(()=>{
    document.title = "Pong - Profile";
        getUsers((res:any)=>{
      
      res.data.forEach((e:any)=>{
        

        if(e.username === fill.data.username)
        {
          setData(e);
        }
      })
    })

    let user:any = {};
    if(fill.data.username === data.username)
    user = data;
    else
    user = fill.data

    getMachHistoryUser((res:any)=>{
      setMatchHistory(res)
    },user.username)

  },[])

  let dataUser:any = {};

 if(fill.data.username === data.username)
 dataUser = data;
 else
 dataUser = fill.data






  return (
      <main className="flex flex-col gap-12 h-full pb-0">
      <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
        <CardProfile settings={false}  dataUser={dataUser}/>

        <div className="flex btn-profile items-center gap-3">
            {
                (dataUser.freind === "friend")?(
                        <BtnFriend dataUser={dataUser} setFriend = {setFriend}/>
                    ):(
                        <BtnAddFriend  dataUser={dataUser} setFriend = {setFriend} username={dataUser.username}/>
                    )
            }
        </div>

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
        <SwitchersProfile username={dataUser?.username} matchHistory={matchHistory}/>
    </main>
  );
}