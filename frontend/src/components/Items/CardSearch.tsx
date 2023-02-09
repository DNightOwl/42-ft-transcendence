import React from 'react';
import { AddFiriendSearchIcon,PointsIcon } from './Icons';

interface typeProps{
    friend:string
    username:string
    picture:string
}

export default function CardSearch({friend,username,picture}:typeProps){
    return (
        <div className='hover:bg-backgroundHover px-4 py-2 cursor-pointer'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-3'>
                <img src={picture} alt="users" className='w-12 h-12 rounded-full' />
                <span className='text-primaryText text-sm username-search'>{username}</span>
            </div>
            <button className={` ${friend?"w-8 h-8":"w-7 h-7"} rounded-full  flex justify-center items-center bg-shape`}>
                {
                    
                    (friend === "Not friend")?(
                        <AddFiriendSearchIcon edit='w-4 h-4 fill-secondaryText' />
                    ):(
                        <PointsIcon edit='w-3 h-3 fill-secondaryText' />
                    )
                }
                
            </button>
        </div>
        </div>
    )
}