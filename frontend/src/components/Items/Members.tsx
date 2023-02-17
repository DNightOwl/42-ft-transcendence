import React,{useState,useEffect} from 'react'
import SearchInput from './SearchInput'
import Role from './Role'
import { getMemberChannel } from '../../Helpers'
import { ExclamationIcon } from './Icons'

interface typeProps{
    channelData:any
}

export default function Members({channelData}:typeProps){
    const [roles,setRoles] = useState<any>([]);
    const [members,setMembers] = useState<any>([]);
    const [reset,setReset] =  useState([]);
    const [search,setSearch] =  useState([]);
    useEffect(()=>{

        let roles:any = [];
        let members:any= [];
        getMemberChannel((res:any)=>{
            
            res.forEach((e:any)=>{
                if(e.role !== "member")
                    roles.push(e);
                else
                    members.push(e);
            })

            setRoles(roles);
            setMembers(members);
            
        },channelData.name)
    },[]);
    

    if(members.length || roles.length)
    return(
        <div className='py-5 w-full flex flex-col gap-6'>
            <SearchInput />
            <Role channelData={channelData} roles={roles} members={members}/>
        </div>
    )
    return (
        <div className='py-5 w-full flex gap-1 text-sm text-secondaryText justify-center item-center'>
        <ExclamationIcon edit='w-5 h-4 fill-secondaryText  exlamation'/>
        No members.
    </div>
    )
}