import React, { useEffect,useState } from 'react';
import CardAchievments from './CardAchievments';
import { getAchievements, getUserData,getUsers } from '../../Helpers';
import { Trophy, PointGameIcon, LoseIcon, FirstWinIcon} from './Icons';

interface typeProps{
  id?:any
  achievements?: any;
}




export default function Achievements({id,achievements}:typeProps) {
  
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
      },idUser)
    }
  })

  let trophy = <Trophy edit='w-8 h-8 absolute fill-primary'/>
  let pointgame = <PointGameIcon edit='w-10 h-10 absolute fill-primary'/>
  let lose = <LoseIcon edit='w-11 h-11 absolute fill-primary'/>
  let firstWin = <FirstWinIcon edit='w-11 h-11 absolute fill-primary'/>
  return (
    <div className='flex pt-10 content-profile lg:pb-10 flex-col gap-10 md:gap-16'>
        <div className='flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5'>
        {
            ( achievements && Object.keys(achievements).length && achievements.data.Achievement.includes("3 win streak"))?(
              <CardAchievments icon={trophy} number={3} message={"Achievement your three win streak"}/>
            ):(
              <CardAchievments icon={trophy} number={0} message={"Achievement your three win streak"}/>
            )
          }
          {
            (achievements && Object.keys(achievements).length && achievements.data.Achievement.includes("5 points in a game"))?(
              <CardAchievments icon={pointgame} number={5} message={"Achievement five points in a game"}/>
            ):(
              <CardAchievments icon={pointgame} number={0} message={"Achievement five points in a game"}/>
            )
          }
            
        </div>
        <div className='flex items-center flex-col gap-10 justify-around w-full md:flex-row md:gap-5'>
        {
            (achievements && Object.keys(achievements).length && achievements.data.Achievement.includes("2 lose streak"))?(
              <CardAchievments icon={lose} number={2} message={"Achievement your two lose streak"}/>
            ):(
              <CardAchievments icon={lose} number={0} message={"Achievement your two lose streak"}/>
            )
          }
          {
            (achievements && Object.keys(achievements).length && achievements.data.Achievement.includes("First win"))?(
              
              <CardAchievments icon={firstWin} number={1} message={"Achievement your first win"}/>
            ):(
              <CardAchievments icon={firstWin} number={0} message={"Achievement your first win"}/>

            )
          }

        </div>
    </div>
  )
}