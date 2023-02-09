import React, { useEffect,useState } from "react"
import PictureProfile from "../../assets/friend.jpg"
import { SettingsIcon } from "./Icons"
import {getUserData } from "../../Helpers";


interface typeProps{
  settings:boolean
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function CardProfile({settings,setModal}:typeProps){
  const [data,setData] = useState<any>({});
  useEffect(()=>{
    function getRes(res:any){
      setData(res);
      console.log(res);
      
  }
  getUserData(getRes);
  },[])
    return(
        <div className={`flex flex-1 items-center`}>
        <div className='flex items-center gap-2'>
          <img src={PictureProfile} alt="Profile" className='w-20 h-20 rounded-full' />
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span className={`text-primaryText text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap`}>{(data.nickname)?data.nickname.charAt(0).toUpperCase() + data.nickname.slice(1):null}</span>
              <button className="w-8 h-8 bg-shape flex justify-center items-center rounded-full" onClick={()=>{
                if(setModal)
                  setModal(true);
              }}>
                <SettingsIcon edit="w-4 h-4 fill-secondaryText"/>
              </button>
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