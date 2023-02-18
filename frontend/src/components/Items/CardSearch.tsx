import React from 'react';
import { AddFiriendSearchIcon,PointsIcon } from './Icons';
import { Link } from 'react-router-dom';

interface typeProps{
    setDisplay?:React.Dispatch<React.SetStateAction<boolean>>
    setValue?:React.Dispatch<React.SetStateAction<string>>
    setClick: React.Dispatch<React.SetStateAction<boolean>>
    click:boolean

    data:any
}

export default function CardSearch({data,setDisplay,setValue,setClick,click}:typeProps){
    
    return (
        <Link to="/ProfileUser" state={{data:data}} className='hover:bg-backgroundHover px-4 py-2 cursor-pointer' onClick={()=>{
            if(setDisplay)
                setDisplay(false)
            if(setValue)
                setValue("");
                if(!click)
                    setClick(true)
                else
                    setClick(false)
            }}>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-3'>
                <img src={data.pictureLink} alt="users" className='w-12 h-12 rounded-full' />
                <span className='text-primaryText text-sm username-search'>{data.username}</span>
            </div>
            {/* <button className={` ${friend?"w-8 h-8":"w-7 h-7"} rounded-full  flex justify-center items-center bg-shape`}>
                {
                    
                    (friend === "Not friend")?(
                        <AddFiriendSearchIcon edit='w-4 h-4 fill-secondaryText' />
                    ):(
                        <PointsIcon edit='w-3 h-3 fill-secondaryText' />
                    )
                }
                
            </button> */}
        </div>
        </Link>
    )
}