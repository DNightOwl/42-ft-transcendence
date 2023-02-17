import React from 'react'
import SearchInput from './SearchInput'
import MembersContainer from './MembersContainer'
import { useState, useEffect } from 'react'
import { getFriendChannel } from '../../Helpers'
import { ExclamationIcon } from './Icons'

interface typeProps{
    channelData:any
}


export default function AddMember({channelData}:typeProps){
    const [dataMembers,setDataMembers] =  useState([]);
    const [reset,setReset] =  useState([]);
    const [empty,setEmpty]  = useState(false)
    useEffect(()=>{
        getFriendChannel((res:any)=>{
            setDataMembers(res);
            setReset(res)
            
        },channelData.name)
    },[])
    
    if(dataMembers.length)
    return(
        <div className='py-5 w-full flex flex-col gap-6'>
            <SearchInput edit={"Search for friend"} dataMembers={dataMembers} setDataMembers={setDataMembers} reset={reset}/>
            <MembersContainer channelData={channelData} dataMembers={dataMembers}/>
        </div>
    )
    return (
        <div className='py-5 w-full flex gap-1 text-sm text-secondaryText justify-center item-center'>
            <ExclamationIcon edit='w-5 h-4 fill-secondaryText  exlamation'/>
            No friends available to add.
        </div>
    )
}