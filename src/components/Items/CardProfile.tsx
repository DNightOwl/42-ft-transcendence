import React from "react"
import PictureProfile from "../../assets/friend.jpg"
import { SettingsIcon } from "./Icons"

interface typeProps{
    settings:boolean
}

export default function CardProfile({settings}:typeProps){
    return(
        <div className={`flex flex-1 items-center`}>
        <div className='flex items-center gap-2'>
          <img src={PictureProfile} alt="Profile" className='w-20 h-20 rounded-full' />
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span className={`text-primaryText text-md max-w-sm overflow-hidden text-ellipsis whitespace-nowrap`}>Username</span>
              <span className="w-8 h-8 bg-shape flex justify-center items-center rounded-full">
                <SettingsIcon edit="w-4 h-4 fill-secondaryText"/>
              </span>
            </div>
            <div className='flex items-center gap-1.5'>
            <span className={`w-2 h-2 rounded-full bg-online`}></span>
                <span className='text-secondaryText font-light text-sm'>Online</span>
            </div>
          </div>
        </div>
      </div>
    )
}