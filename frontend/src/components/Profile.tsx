import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import { checkToken } from "../Helpers";
import { useLocation } from "react-router-dom";

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