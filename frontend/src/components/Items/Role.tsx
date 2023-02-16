import React, { useEffect,useState } from 'react'
import CardMember from './CardMember'
import { getMemberChannel } from '../../Helpers'

interface typeProps{
    channelData:any
}

export default function Role({channelData}:typeProps){
    const [data,setData] =  useState([]);
    const [roles,setRoles] = useState<any>([]);
    const [members,setMembers] = useState<any>([]);
    useEffect(()=>{

        let roles:any = [];
        let members:any= [];
        getMemberChannel((res:any)=>{

            res.forEach((e:any)=>{
                if(e.role !== "members")
                    roles.push(e);
                else
                    members.push(e);
            })

            setRoles(roles);
            setMembers(members);
            
        },channelData.name)
    },[])
    
    return(
        <div className='flex flex-col gap-6 content-role'>
            {
                (roles.length)?(
                    <div className='flex flex-col gap-5 pb-6 role'>
                    {
                        roles.map((e:any,index:number)=>{
                               return <CardMember data={e} role={e.role} key={index}/>
                        })
                    }
                </div>
                ):null
            }

            {
                (members.length)?(
                    <div className='flex flex-col gap-5'>
                    {
                        members.map((e:any, index:number)=>{{
                            return <CardMember data={e} key={index}/>
                        }})
                    }
                    </div>
                ):null
            }

        </div>
    )
}