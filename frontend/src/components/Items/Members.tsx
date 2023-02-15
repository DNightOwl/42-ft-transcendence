import React from 'react'
import SearchInput from './SearchInput'
import Role from './Role'

interface typeProps{
    channelData:any
}

export default function Members({channelData}:typeProps){
    return(
        <div className='py-5 w-full flex flex-col gap-6'>
            <SearchInput />
            <Role channelData={channelData}/>
        </div>
    )
}