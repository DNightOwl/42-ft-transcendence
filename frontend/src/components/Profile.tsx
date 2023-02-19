import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import { checkToken, getUserData, getMatchHistoryProfile,getAchievements } from "../Helpers";
import axios from "axios";
import { toast } from "react-toastify";


interface typeProps{
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  pictureUser:string
  username:string
}

export default function Profile({setModal,pictureUser,username}:typeProps) {

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

  const [matchHistory,setMatchHistory] = useState<any>({});
  const [achievement,setAcheivement] = useState<any>({});

  const [dataUser,setDataUser] = useState<any>({})
  useEffect(()=>{
    document.title = "Pong - Profile";
    getUserData((res:any)=>{
      console.log(res);
      setDataUser(res)
      getAchievements(((resp:any)=>{
        setAcheivement(resp)
        
      }),res.id)
    })

    getMatchHistoryProfile((res:any)=>{
      setMatchHistory(res)
    })

  },[])

  return (
      <main className="flex flex-col gap-12 h-full pb-0">
      <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
        <CardProfile settings={true} setModal={setModal}  dataUser={dataUser.data} username={username} pictureUser={pictureUser}/>
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
        <SwitchersProfile matchHistory={matchHistory} achievements={achievement}/>
    </main>
  );
}