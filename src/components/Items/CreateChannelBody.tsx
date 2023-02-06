import React from 'react'
import { CheckIcon } from './Icons'

export default function CreateChannelBody() {
  return (
    <div>
        <div>
            <div className='flex items-center justify-center gap-16'>
                <button className='bg-body flex items-center gap-3 w-40 p-3 rounded-md'>
                    <button aria-label='Check' className='bg-primary w-7 h-7 flex justify-center items-center rounded-full'>
                        <CheckIcon edit='w-4 h-4'/>
                    </button>
                    <span className='text-primaryText text-md font-light'>Public</span>
                </button>
                <button className='bg-body flex items-center gap-3 w-40 p-3 rounded-md'>
                    <button aria-label='Check' className='y w-7 h-7 flex justify-center items-center border-2 border-primary rounded-full'>
                    </button>
                    <span className='text-primaryText text-md font-light'>Private</span>
                </button>
                <button className='bg-body flex items-center gap-3 w-40 p-3 rounded-md'>
                    <button aria-label='Check' className='y w-7 h-7 flex justify-center items-center border-2 border-primary rounded-full'>
                    </button>
                    <span className='text-primaryText text-md font-light'>Protected</span>
                </button>
            </div>
            <div></div>
        </div>
    </div>
  )
}
