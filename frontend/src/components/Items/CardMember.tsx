import React from 'react'
import PictureProfile from "../../assets/friend.jpg"
import { PointsIcon } from './Icons'
import { useState } from 'react'
import { setAdmin,setMute,setBlock, setKick } from '../../Helpers'

interface typeProps{
    role?:string
    data?:any
    channelData?:any
}

export default function CardMember({role,data,channelData}:typeProps){
    
    const [dropDown,setDropDwon] = useState<boolean>(false);
    const [mouse,setMouse] = useState<boolean>(false);
    return(
    <div className={`flex flex-1 items-center justify-between pr-4 gap-0.5`}>
        <div className='flex items-center gap-2'>
            <img src={data.pictureLink} alt="Profile" className='w-12 h-12 rounded-full' />
            <div className='flex flex-col gap-0.5'>
                <div className='flex items-center gap-3'>
                    <span className={`text-primaryText text-md name-member overflow-hidden text-ellipsis whitespace-nowrap`}>{data.username.charAt(0).toUpperCase() + data.username.slice(1)}</span>
                        <span className={`w-16 rounded-sm ${(role === "owner")?"bg-ownerBg text-ownerText":(role === "admin")?"bg-adminBg text-adminText":""} flex justify-center items-center text-xs`}>
                            {
                                (role)?(
                                    role.charAt(0).toUpperCase() + role.slice(1)
                                ):null
                            }
                        </span>
                 </div>
                <div className='flex items-center gap-1.5'>
                    <span className={`w-2 h-2 rounded-full ${data.status === "of"?"bg-offline":"bg-online"}`}></span>
                    <span className='text-secondaryText font-light text-sm'>{
                        (data.status === "of")?(
                            "Offline"
                        ):"Online"
                    }</span>
                </div>
            </div>
        </div>
        <div className='relative'>
        <button className='w-3 h-3' onClick={()=>{
            (dropDown)?setDropDwon(false):setDropDwon(true)

        }} onBlur={()=>{
            if(!mouse)
                setDropDwon(false)
        }}>
            <PointsIcon edit='fill-secondaryText'/>
        </button>
        {
                            (dropDown)?(
                                
                                <div className="w-32 absolute top-6 right-0 flex flex-col gap-2 rounded-md bg-body py-3 shadow z-10">
                                    {
                                        (channelData.role === "owner")?(
                                            <React.Fragment>
                                            <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                                let obj = {login: data.username,name:channelData.name}
                                                setAdmin(obj);
                                              }}>
                                                Admin
                                              </button>
                                              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                              }}>
                                                Ivite to play
                                              </button>
                                              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                                let obj = {login: data.username,name:channelData.name}
                                              setBlock(obj);
                                              }}>
                                                Block
                                              </button>
                                              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                                let obj = {login: data.username,name:channelData.name}
                                              setKick(obj);
                                              }}>
                                                Kick
                                              </button>
                                              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                                let obj = {login: data.username,name:channelData.name}
                                                setMute(obj);
                                              }}>
                                                Mute
                                              </button>                                                                                                                                          
                                            </React.Fragment>

                                        ):(channelData.role === "admin")?(
                                            <React.Fragment>
                                            <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                              }}>
                                                Ivite to play
                                              </button>
                                              {
                                              (data.role === "member")?(
                                                    <React.Fragment>
                                              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                                let obj = {login: data.username,name:channelData.name}
                                                setBlock(obj);
                                              }}>
                                                Block
                                              </button>
                                              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                                let obj = {login: data.username,name:channelData.name}
                                              setKick(obj);
                                              }}>
                                                Kick
                                              </button>
                                              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                                let obj = {login: data.username,name:channelData.name}
                                                setMute(obj);
                                              }}>
                                                Mute
                                              </button>                                                           
                                                    </React.Fragment>
                                                ):null
                                              }                                                
                                            </React.Fragment>

                                        ):(
                                            <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                                setDropDwon(false)
                                              }}>
                                                Ivite to play
                                              </button>
                                        )
                                    }
                              </div>
                              ):null
            }
        </div>
    </div>
    )
}