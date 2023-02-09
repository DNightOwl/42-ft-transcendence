import React, { useEffect } from "react";
import CardProfile from "./Items/CardProfile";
import SwitchersProfile from "./Items/SwitchersProfile";
import axios from 'axios';

export default function Profile() {
  axios.get("http://localhost:3000/profile", {
    withCredentials: true,
      headers :{'Access-Control-Allow-Origin': 'localhost:3000'} 
    }).then().catch(error=>{
        if(error.response.data.statusCode === 401)
        {
          axios.get("http://localhost:3000/auth/refresh", {
            withCredentials: true,
            headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
          }).then().catch((error)=>{
            window.location.href="http://localhost:3001/Login";
          });
        }
    });
  useEffect(() => {
    document.title = "Pong - Profile";
  });

  return (
    <main className="flex flex-col gap-12 h-full pb-0">
      <section className="flex  flex-col items-center gap-10  justify-center lg:flex-row lg:justify-between">
        <CardProfile settings={true} />
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