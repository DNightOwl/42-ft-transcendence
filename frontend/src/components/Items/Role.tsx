import React from 'react'
import SearchInput from './SearchInput'
import PictureProfile from "../../assets/friend.jpg"
import CardMember from './CardMember'


export default function Role(){
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