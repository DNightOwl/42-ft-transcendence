import React from 'react'

interface typeProps{
  message:string,
  time:string
}

export default function BoxMessagesUser(props:typeProps) {
  return (
  <div className='flex justify-end'>
        <div className='bg-primary max-w-lg p-5 pb-3 rounded-xl rounded-tr-none'>
            <p className='text-white text-sm font-light text-left break-words '>{props.message}</p>
            <div className='flex text-xs justify-end text-time'>{props.time}</div>
        </div>
    </div>
  )
}
