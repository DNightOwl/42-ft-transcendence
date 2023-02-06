import React from 'react'
import CircleAchievements from './CircleAchievements'

export default function CardAchievments() {
  return (
    <div className='flex items-center justify-center p-5 card-profile gap-5 bg-body rounded-xl'>
    <CircleAchievements/>
    <div className='flex flex-col gap-1'>
        <span className='text-primaryText text-4xl'>10</span>
        <span className='text-secondaryText text-sm'>Achievements completed</span>
    </div>
</div>
  )
}
