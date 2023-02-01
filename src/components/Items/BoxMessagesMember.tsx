import React from 'react'

interface typeProps{
  message:string,
  time:string
  picture:string
}

export default function BoxMessagesMember(props:typeProps) {
  return (
    <div className='flex justify-start items-end gap-2'>
        <img src={props.picture} alt="Member" className='w-12 h-12 rounded-full'/>
        <div className='bg-shape max-w-lg p-5 pb-3 rounded-xl rounded-bl-none'>
            <p className='text-white text-sm font-light text-left break-words '>{props.message}</p>
            <div className='flex text-xs justify-end text-secondaryText'>{props.time}</div>
        </div>
    </div>
  )
}
