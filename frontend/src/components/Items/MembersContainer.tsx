import React, { useEffect, useState } from 'react'
import CardMember from './CardMember'

import CardFriend from './CardFriend';

interface typeProps{
    channelData:any
    dataMembers:any
}


export default function MembersContainer({channelData,dataMembers}:typeProps){
    return(
        <div className='flex flex-col gap-6 content-rol'>
            <div className='flex flex-col gap-5'>
                {
                    dataMembers.map((e:any,index:any)=>{
                    
                    return <CardFriend key={index} data={e} channelData={channelData}/>

                    })
                }
            </div>
        </div>
    )
}