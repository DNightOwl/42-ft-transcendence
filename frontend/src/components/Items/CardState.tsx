import React from 'react';
import {PlusIcon,GroupIcon,EyeChannelIcon} from '../Items/Icons'

interface typeProps{
  chatState?: any
}

export default function CardState(props:typeProps) {
  return (
    <div className={`flex flex-1 items-center ${props.chatState.members?'justify-between lg:justify-start lg:gap-8':''}`}>
      <div className='flex items-center gap-2'>
        <img src={props.chatState.picture} alt="Friend" className='w-14 h-14 rounded-full' />
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1.5'>
            <span className={`text-primaryText text-md ${props.chatState.members?'channel-name':'max-w-sm'} overflow-hidden text-ellipsis whitespace-nowrap`}>{(props.chatState.username || props.chatState.name).charAt(0).toUpperCase() + (props.chatState.username || props.chatState.name).slice(1)}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            {
              (!props.chatState.members)?<span className={`w-2 h-2 rounded-full ${(props.chatState.status === "online")?'bg-online':'bg-offline'}`}></span>:null
            }
              <span className='text-secondaryText font-light text-sm'>{
                (!props.chatState.members)?props.chatState.status.charAt(0).toUpperCase() + props.chatState.status.slice(1):
                props.chatState.members + " members"
              }</span>
          </div>
        </div>
      </div>
      {
        (props.chatState.members)?(
          <div className='flex items-center gap-4'>
            <div className='w-10 h-10 bg-shape flex justify-center items-center rounded-full'>
              <PlusIcon edit='fill-secondaryText w-4 h-4'/>
            </div>{(props.chatState.role === "owner" || props.chatState.role === "admin")?(
              <div className='w-10 h-10 bg-shape flex justify-center items-center rounded-full'>
                <GroupIcon edit='fill-secondaryText w-5 h-5'/>
              </div>
            ):null
            }
            {
              (props.chatState.role === "owner")?(
                <div className='w-10 h-10 bg-shape flex justify-center items-center rounded-full'>
                  <EyeChannelIcon edit='fill-secondaryText w-5 h-5'/>
                </div>
              ):null
            }
          </div>
        ):null
      }
    </div>
  )
}
