import React from 'react';
import { PointsIcon } from './Icons';

export default function CardUser() {
  return (
    <div className='flex items-center p-4 card-user shadow justify-between bg-body rounded-xl'>
        <div className='flex gap-3 items-center'>
            <img src="https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg" alt="Friend" className='w-12 h-12 rounded-full' />
            <span className='text-sm text-primaryText username-card overflow-hidden text-ellipsis whitespace-nowrap'>{"mouassit".charAt(0).toUpperCase() + "mouassit".slice(1)}</span>
        </div>
        <button className='w-4 h-4 bg-shape flex justify-center items-center rounded-full'>
            <PointsIcon edit='w-2 h-2 fill-secondaryText' />
        </button>
    </div>
  )
}
