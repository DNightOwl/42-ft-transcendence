import React, { useEffect,useState } from 'react'
import CardMember from './CardMember'
import { getMemberChannel } from '../../Helpers'

interface typeProps{
    channelData:any
}

export default function Role({channelData}:typeProps){
    const [data,setData] =  useState([]);
    useEffect(()=>{
        getMemberChannel((res:any)=>{
            setData(res);
            
        },channelData.name)
    },[])

    console.log(data);
    
    return(
        <div className='flex flex-col gap-6 content-rol'>
            <div className='flex flex-col gap-5 pb-6 role'>
                <CardMember role="owner"/>
                <CardMember role="admin"/>
            </div>
            <div className='flex flex-col gap-5'>
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            <CardMember />
            </div>
        </div>
    )
}