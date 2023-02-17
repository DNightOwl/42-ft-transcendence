import React, { useEffect,useState } from "react"
import PictureProfile from "../../assets/friend.jpg"
import { SettingsIcon } from "./Icons"
import {getUserData } from "../../Helpers";


interface typeProps{
  settings:boolean
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  dataUser?: any
  block?:boolean
}

export default function CardProfile({settings,setModal,dataUser,block}:typeProps){
  const [data,setData] = useState<any>({});

  useEffect(()=>{
    function getRes(res:any){
      setData(res);
  }
  getUserData(getRes);
  },[setData])

  console.log(dataUser);
  
    return(
        <div className={`flex ${(!dataUser)?"flex-1":""}items-center`}>
        <div className='flex items-center gap-2'>
          {
            (dataUser && !dataUser.picture)?(
              <img src={dataUser.pictureLink} alt="Profile" className='w-20 h-20 rounded-full' />
            ):(
              <img src={(dataUser)?dataUser.picture:data.pictureLink} alt="Profile" className='w-20 h-20 rounded-full' />
            )
          }
          <div className='flex flex-col gap-1'>
            <div className='flex items-center gap-2'>
              <span className={`text-primaryText text-md max-w-xs overflow-hidden text-ellipsis whitespace-nowrap`} id="username">{
              (dataUser)?(dataUser.username.charAt(0).toUpperCase() + dataUser.username.slice(1)):(data.nickname)?data.nickname.charAt(0).toUpperCase() + data.nickname.slice(1):null
              }</span>
              {
                (!dataUser)?(
                  <button className="w-8 h-8 bg-shape flex justify-center items-center rounded-full" onClick={()=>{
                    if(setModal)
                      setModal(true);
                  }}>
                    <SettingsIcon edit="w-4 h-4 fill-secondaryText"/>
                  </button>
                ):null
              }
            </div>

            {
              (!block)?(
                (dataUser)?(
                  <div className='flex items-center gap-1.5'>
                  <span className={`w-2 h-2 rounded-full ${dataUser.status === "of" ?"bg-offline":"bg-online"}`}></span>
                      <span className='text-secondaryText font-light text-sm'>{(dataUser.status === "of")?"Offline":"Online"}</span>
                  </div>
                ):(
                  <div className='flex items-center gap-1.5'>
                    <span className={`w-2 h-2 rounded-full ${data.status === "of" ?"bg-offline":"bg-online"}`}></span>
                      <span className='text-secondaryText font-light text-sm'>{(data.status === "of")?"Offline":"Online"}</span>
                  </div>
                )
              ):null
            }

          </div>
        </div>
      </div>
    )
}