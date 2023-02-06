import React,{useState} from 'react';
import { PointsIcon } from './Icons';

export default function CardUser() {
  const[dropDown,setDropDown] = useState<boolean>(false)
  return (
    <div className='flex items-center p-4 card-user shadow justify-between bg-body rounded-xl'>
        <div className='flex gap-3 items-center'>
            <img src="https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg" alt="Friend" className='w-12 h-12 rounded-full' />
            <span className='text-sm text-primaryText username-card overflow-hidden text-ellipsis whitespace-nowrap'>{"mouassit".charAt(0).toUpperCase() + "mouassit".slice(1)}</span>
        </div>
        <div className='relative'>
          <button className='w-4 h-4 bg-shape flex justify-center items-center rounded-full hover:bg-backgroundHover' onClick={()=>{
            (dropDown)?setDropDown(false):setDropDown(true)
          }} onBlur={()=>{setDropDown(false)}}>
            <PointsIcon edit='w-2 h-2 fill-secondaryText' />
          </button>
          {
            (dropDown)?(
            <div className="w-32 absolute top-6 right-0 flex flex-col gap-2 rounded-md bg-body py-3 shadow z-10">
              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light">
                Block
              </button>
              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light">
                Invite to play
              </button>
            </div>
            ):null
          }
        </div>
    </div>
  )
}