import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import { checkToken,getUsers,getMachHistoryUser,getAchievements} from "../Helpers";
import { useLocation } from "react-router-dom";
import { BtnAddFriend } from "./BtnAddFriend";
import { BtnFriend } from "./BtnFriend";
import { UnblockIcon } from "./Items/Icons";
import { unblockFriend} from "../Helpers";
import { Link } from "react-router-dom";


export default function ProfileUser() {

  checkToken();
  const [friend,setFriend] = useState<boolean>(false);
  const [matchHistory,setMatchHistory] = useState<any>({});
  const location = useLocation();
  const fill = location.state;
  const [data,setData]    = useState<any>({});
  const [achievement,setAcheivement] = useState<any>({});

  useEffect(()=>{
    document.title = "Pong - Profile";
        getUsers((res:any)=>{
      
      res.data.forEach((e:any)=>{
        if(e.username === fill.data.username)
        {
          setData(e);
          getAchievements(((resp:any)=>{
            setAcheivement(resp)
            
          }),e.id)
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
 

if(dataUser.blocked === "blocked")
  return (
    <main className="flex flex-col gap-12 h-full pb-0 items-center">
    <section className="flex  flex-col items-center gap-10  justify-center">
    <CardProfile settings={false}  dataUser={dataUser}/>
    <div className="flex btn-profile items-center gap-3">
          <Link to="/AddFriend" state={{data:dataUser}} className="w-36 p-2 rounded-md bg-unblock gap-2 flex items-center justify-center" onClick={()=>{
            unblockFriend(dataUser.username)
          }}>
            <UnblockIcon edit="w-4 fill-primaryText"/>
            <span className="text-primaryText text-sm">Unblock</span>
          </Link>
    </div>
  </section>
  </main>
  )

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
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">{
              (!matchHistory[0]?.NumberofWins)?(0):matchHistory[0]?.NumberofWins
            }</span>
            <span className="text-secondaryText text-sm ">Wins</span>
          </span>
          <span className="separtor bg-shape"></span>
          <span className="flex flex-col items-center">
            <span className="text-primaryText text-4xl font-extrabold profile-number overflow-hidden text-ellipsis">{
              (!matchHistory[0]?.NumberofLoses)?(0):matchHistory[0]?.NumberofLoses
            }</span>
            <span className="text-secondaryText text-sm ">Losses</span>
          </span>
        </div>
        </section>
        <SwitchersProfile username={dataUser?.username} matchHistory={matchHistory} achievements={achievement}/>
    </main>
  );
}