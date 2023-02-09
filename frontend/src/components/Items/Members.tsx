import React from 'react'
import SearchInput from './SearchInput'
import Role from './Role'


export default function Members(){
    return(
        <div className='py-5 w-full flex flex-col gap-6'>
            <SearchInput />
            <Role/>
        </div>
    )
}