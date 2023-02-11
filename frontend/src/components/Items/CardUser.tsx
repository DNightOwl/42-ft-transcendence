import React,{useEffect, useState} from 'react';
import { PointsIcon } from './Icons';
import {blockFriend,getUserData,getUsers} from '../../Helpers'
import { Link } from 'react-router-dom';

interface typeProps{
  username:string
  picture:string
  user:boolean
  data:any
}

export default function CardUser({username,picture,user,data}:typeProps) {
  const[dropDown,setDropDown] = useState<boolean>(false)
  const [mouse,setMouse] = useState(false);
  const [move,setMove] = useState(false);
  const[display,setDisplay] = useState(true);

  if(display)
    return(
      <Link to ="/Profile" state={{data:data}} className='flex items-center p-4 card-user shadow justify-between bg-body rounded-xl' onClick={(e)=>{
        if(move)  
          e.preventDefault()
        else
          setDropDown(false)
      }}>
      <div className='flex gap-3 items-center'>
          <img src={picture} alt="Friend" className='w-12 h-12 rounded-full' />
          <span className='text-sm text-primaryText username-card overflow-hidden text-ellipsis whitespace-nowrap'>{username.charAt(0).toUpperCase() + username.slice(1)}</span>
      </div>
      {
        (!user)?(
          <div className='relative'>
          <button className='w-4 h-4 bg-shape flex justify-center items-center rounded-full hover:bg-backgroundHover' onClick={()=>{
            (dropDown)?setDropDown(false):setDropDown(true)
          }} onBlur={()=>{
              if(mouse)
                setDropDown(false)}
            }onMouseMove={()=>{
              setMove(true)
            }} onMouseLeave={()=>{
              setMove(false)
            }}>
            <PointsIcon edit='w-2 h-2 fill-secondaryText' />
          </button>
          {
            (dropDown)?(
            <div className="w-32 absolute top-6 right-0 flex flex-col gap-2 rounded-md bg-body py-3 shadow z-10">
              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onClick={()=>{
                blockFriend(username)
                setDisplay(false)
              }} onMouseMove={()=>{
                setMouse(false)
                setMove(true)
              }} onMouseLeave={()=>{
                setMouse(true)
                setMove(false)
              }}>
                Block
              </button>
              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light">
                Invite to play
              </button>
            </div>
            ):null
          }
        </div>
        ):null
      }
  </Link>
    )
  else{
    return null
  }
}
