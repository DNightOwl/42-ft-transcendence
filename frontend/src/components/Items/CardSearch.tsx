import React from 'react';
import Picture from '../../assets/friend.jpg'
import { AddFiriendSearchIcon,PointsIcon } from './Icons';

interface typeProps{
    friend:boolean
}

export default function CardSearch({friend}:typeProps){
    return (
        <button className='hover:bg-backgroundHover px-4 py-2'>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-3'>
                <img src={Picture} alt="users" className='w-12 h-12 rounded-full' />
                <span className='text-primaryText text-sm username-search'>Username</span>
            </div>
            <button className={` ${friend?"w-8 h-8":"w-7 h-7"} rounded-full  flex justify-center items-center bg-shape`}>
                {
                    (friend)?(
                        <AddFiriendSearchIcon edit='w-4 h-4 fill-secondaryText' />
                    ):(
                        <PointsIcon edit='w-3 h-3 fill-secondaryText' />
                    )
                }
                
            </button>
        </div>
        </button>
    )
}