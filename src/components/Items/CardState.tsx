import React from 'react';

interface typeProps{
  chatState: any
}

export default function CardState(props:typeProps) {
  return (
    <div className='flex flex-1 justify-start items-center gap-2'>
    <img src={props.chatState.picture} alt="Friend" className='w-14 h-14 rounded-full' />
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-1.5'>
          <span className='text-primaryText text-md max-w-sm overflow-hidden text-ellipsis'>{(props.chatState.username || props.chatState.name).charAt(0).toUpperCase() + (props.chatState.username || props.chatState.name).slice(1)}</span>
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
  )
}
