import React from 'react'
import CircleAchievements from './CircleAchievements'

interface typeProps{
  icon:any
  number:number,
  message:string
}

export default function CardAchievments({icon,number,message}:typeProps) {
  return (
    <div className='flex items-center justify-center p-5 card-profile gap-5 bg-body rounded-xl'>
    <CircleAchievements icon={icon}/>
    <div className='flex flex-col gap-1'>
        <span className='text-primaryText text-4xl'>{number}</span>
        <span className='text-secondaryText text-sm'>{message}</span>
    </div>
</div>
  )
}
