import React from 'react'
import PictureProfile from "../../assets/friend.jpg"
import { PointsIcon } from './Icons'

interface typeProps{
    role?:string 
}

export default function CardMember({role}:typeProps){
    return(
    <div className={`flex flex-1 items-center justify-between pr-4 gap-0.5`}>
        <div className='flex items-center gap-2'>
            <img src={PictureProfile} alt="Profile" className='w-12 h-12 rounded-full' />
            <div className='flex flex-col gap-0.5'>
                <div className='flex items-center gap-3'>
                    <span className={`text-primaryText text-md name-member overflow-hidden text-ellipsis whitespace-nowrap`}>Username</span>
                        <span className={`w-16 rounded-sm ${(role === "owner")?"bg-ownerBg text-ownerText":(role === "admin")?"bg-adminBg text-adminText":""} flex justify-center items-center text-xs`}>
                            {
                                (role)?(
                                    role.charAt(0).toUpperCase() + role.slice(1)
                                ):null
                            }
                        </span>
                 </div>
                <div className='flex items-center gap-1.5'>
                    <span className={`w-2 h-2 rounded-full bg-online`}></span>
                    <span className='text-secondaryText font-light text-sm'>Online</span>
                </div>
            </div>
        </div>
        <button className='w-3 h-3'>
            <PointsIcon edit='fill-secondaryText'/>
        </button>
    </div>
    )
}