import React, { useEffect } from "react";
import CardProfile from "./Items/CardProfile";

export default function Profile() {
  useEffect(() => {
    document.title = "Pong - Profile";
  });

  return (
    <main>
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
        {/*
                  <div className="flex justify-around w-full bg-green-100">
          <span className="flex flex-col items-center flex-1">
            <span className="text-primaryText font-extrabold text-4xl">10</span>
            <span className="text-secondaryText font-light text-sm">
              Friends
            </span>
          </span>
          <span className="flex flex-col items-center flex-1 border-secondaryText number-profile">
            <span className="text-primaryText font-extrabold text-4xl">8</span>
            <span className="text-secondaryText font-light text-sm">Wins</span>
          </span>
          <span className="flex flex-col items-center flex-1 border-secondaryText number-profile">
            <span className="text-primaryText font-extrabold text-4xl">0</span>
            <span className="text-secondaryText font-light text-sm">
              Losses
            </span>
          </span>
        </div>
        */}
      </section>
    </main>
  );
}