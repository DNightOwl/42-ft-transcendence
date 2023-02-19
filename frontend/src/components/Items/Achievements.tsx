import React, { useEffect,useState } from 'react';
import CardAchievments from './CardAchievments';
import { getAchievements, getUserData,getUsers } from '../../Helpers';
import { Trophy, PointGameIcon, LoseIcon, FirstWinIcon} from './Icons';

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

  let trophy = <Trophy edit='w-8 h-8 absolute fill-primary'/>
  let pointgame = <PointGameIcon edit='w-10 h-10 absolute fill-primary'/>
  let lose = <LoseIcon edit='w-11 h-11 absolute fill-primary'/>
  let firstWin = <FirstWinIcon edit='w-11 h-11 absolute fill-primary'/>
  return (
    <div className='flex pt-10 content-profile lg:pb-10 flex-col gap-10 md:gap-16'>
        <div className='flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5'>
            <CardAchievments icon={trophy} number={0} message={"Achievements completed"}/>
            <CardAchievments icon={pointgame} number={0} message={"Achievements completed"}/>
        </div>
        <div className='flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5'>
            <CardAchievments icon={lose} number={0} message={"Achievements completed"}/>
            <CardAchievments icon={firstWin} number={0} message={"Achievements completed"}/>
        </div>
    </div>
  )
}