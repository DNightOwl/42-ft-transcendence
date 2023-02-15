import React, { useState } from 'react'
import PictureProfile from "../../assets/friend.jpg"
import { PlusIcon, CheckIcon } from './Icons'
import {addFriendToChannel} from "../../Helpers"

interface typeProps{
    role?:string
    data:any
    channelData:any
}

export default function CardFriend({role,data,channelData}:typeProps){
    
    const [check,setCheck] = useState(false);
    const [click,setClick] = useState(true);
    
    return(
    <div className={`flex flex-1 items-center justify-between pr-4 gap-0.5`}>
        <div className='flex items-center gap-2'>
            <img src={data.pictureLink} alt="Profile" className='w-12 h-12 rounded-full' />
            <div className='flex flex-col gap-0.5'>
                <div className='flex items-center gap-3'>
                    <span className={`text-primaryText text-md name-member overflow-hidden text-ellipsis whitespace-nowrap`}>{data.username.charAt(0).toUpperCase() + data.username.slice(1)}</span>
                 </div>
                <div className='flex items-center gap-1.5'>
                    <span className={`w-2 h-2 rounded-full ${data.status === "of"?"bg-offline":"bg-online"}`}></span>
                    <span className='text-secondaryText font-light text-sm'>
                        {
                            data.status == "of"?"Offline":"Online"
                        }
                    </span>
                </div>
            </div>
        </div>
        <button className='w-7 h-7 bg-body p-1 rounded-full flex justify-center items-center' onClick={()=>{
            if(click)
            {
                let object = {
                    name:channelData.name,
                    type:channelData.type,
                    login:data.username,
                }
                addFriendToChannel(object)
                setCheck(true)
                setClick(false);
            }
            }}>
            {
                (!check)?(
                <PlusIcon edit='fill-secondaryText w-3 h-3'/>
                ):<CheckIcon edit='fill-secondaryText w-3 h-3'/>
            }
        </button>
    </div>
    )
}