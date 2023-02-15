import React, { useEffect, useState } from 'react'
import CardMember from './CardMember'
import { getFriendChannel } from '../../Helpers'
import CardFriend from './CardFriend';

interface typeProps{
    channelData:any
}


export default function MembersContainer({channelData}:typeProps){
    const [data,setData] =  useState([]);
    useEffect(()=>{
        getFriendChannel((res:any)=>{
            setData(res);
            
        },channelData.name)
    },[])
    return(
        <div className='flex flex-col gap-6 content-rol'>
            <div className='flex flex-col gap-5'>
                {
                    data.map((e,index)=>{
                    
                    return <CardFriend key={index} data={e} channelData={channelData}/>

                    })
                }
            </div>
        </div>
    )
}