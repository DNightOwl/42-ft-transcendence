import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import { checkToken } from "../Helpers";
import { useLocation } from "react-router-dom";
import { AddFriendIcon,MessagesIcon,FriendIcon } from "./Items/Icons";

interface typeProps{
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function Profile({setModal}:typeProps) {

  const location = useLocation();
  const dataUser = location.state;
  
  checkToken();
  useEffect(() => {
    document.title = "Pong - Profile";
  });
    
  return (
    <main className="flex flex-col gap-12 h-full pb-0">
      <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
        <CardProfile settings={true} setModal={setModal}  dataUser={dataUser?.data}/>

        {
          (dataUser)?(
            (dataUser.data.friend === "Not friend")?(
              <div className="flex btn-profile items-center gap-3">
                <button className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center">
                  <AddFriendIcon edit="w-5 fill-primaryText"/>
                  <span className="text-primaryText text-sm">Add friend</span>
                </button>
                <button className="w-36 p-2 rounded-md bg-shape gap-2 flex items-center justify-center">
                  <MessagesIcon edit="w-5 fill-primaryText"/>
                  <span className="text-primaryText text-sm">Message</span>
                </button>
              </div>
            ):(
              <div>hello</div>
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