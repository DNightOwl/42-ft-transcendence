import React, { useEffect,useState } from 'react'
import CardMember from './CardMember'


interface typeProps{
    channelData:any
    roles:any
    members:any
}

export default function Role({channelData,roles,members}:typeProps){    
    return(
        <div className='flex flex-col gap-6 content-role'>
            {
                (roles.length)?(
                    <div className={`flex flex-col gap-5 ${!members.length?'':'pb-6 role'}`}>
                    {
                        roles.map((e:any,index:number)=>{
                               return <CardMember data={e} role={e.role} key={index} channelData={channelData}/>
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
                            return <CardMember data={e} key={index} channelData={channelData}/>
                        }})
                    }
                    </div>
                ):null
            }

        </div>
    )
}