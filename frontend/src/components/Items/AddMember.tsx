import React from 'react'
import SearchInput from './SearchInput'
import MembersContainer from './MembersContainer'


interface typeProps{
    channelData:any
}


export default function AddMember({channelData}:typeProps){
    
    return(
        <div className='py-5 w-full flex flex-col gap-6'>
            <SearchInput edit={"Search for friend"} />
            <MembersContainer channelData={channelData}/>
        </div>
    )
}