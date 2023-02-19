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
    const [search,setSearch] =  useState([]);
    useEffect(()=>{
        getFriendChannel((res:any)=>{            
            setDataMembers(res);
            setReset(res)
            setSearch(res)
            
        },channelData.name)
    },[])
    
    if(dataMembers.length)
    return(
        <div className='py-5 w-full flex flex-col gap-6'>
            <SearchInput edit={"Search for friend"} dataMembers={dataMembers} setDataMembers={setSearch} reset={reset}/>
            {
                (search.length)?(
                    <MembersContainer channelData={channelData} dataMembers={search}/>
                ):(
                    <div className='py-3 w-full flex gap-1 text-sm text-secondaryText justify-center item-center'>
                    <ExclamationIcon edit='w-5 h-4 fill-secondaryText  exlamation'/>
                    No friend found.
                </div>                    
                )
            }
        </div>
    )
    return (
        <div className='py-5 w-full flex gap-1 text-sm text-secondaryText justify-center item-center'>
            <ExclamationIcon edit='w-5 h-4 fill-secondaryText  exlamation'/>
            No friends available to add.
        </div>
    )
}