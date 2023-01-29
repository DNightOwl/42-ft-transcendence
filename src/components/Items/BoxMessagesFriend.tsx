import React from 'react'

interface typeProps{
  message:string,
  time:string
}

export default function BoxMessagesFriend(props:typeProps) {
  return (
    <div className='flex justify-start'>
        <div className='bg-shape max-w-lg p-5 pb-3 rounded-xl rounded-br-none'>
            <p className='text-white text-sm font-light text-left break-words '>{props.message}</p>
            <div className='flex text-xs justify-end text-secondaryText'>{props.time}</div>
        </div>
    </div>
  )
}
