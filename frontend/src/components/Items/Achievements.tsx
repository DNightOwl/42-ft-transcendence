import React, { useEffect,useState } from 'react';
import CardAchievments from './CardAchievments';
import { getAchievements, getUserData,getUsers } from '../../Helpers';

interface typeProps{
  id?:any
}

export default function Achievements({id}:typeProps) {
  const [idUser,setIdUser] = useState("");
  useEffect(()=>{

    if(id === undefined)
    {
        getUserData((res:any)=>{
            setIdUser(res.id)   
        });
    }
    else{
      getUsers((res:any)=>{
      
        res.data.forEach((e:any)=>{
  
          if(e.username === id)
          {
            setIdUser(e.id);
          }
        })
      })
      
    }

    if(idUser){
      getAchievements((res:any)=>{
        // console.log(res);
      },idUser)
    }
    
    // else
    // {
    //     getFriends((res:any)=>{
    //         setFriends(res);
    //     })   
    // }
    
    // getAchievements((res:any)=>{
    //   console.log(res);
    // },id);
  })
  return (
    <div className='flex pt-10 content-profile lg:pb-10 flex-col gap-10 md:gap-16'>
        <div className='flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5'>
            <CardAchievments/>
            <CardAchievments/>
        </div>
        <div className='flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5'>
            <CardAchievments/>
            <CardAchievments/>
        </div>
    </div>
  )
}