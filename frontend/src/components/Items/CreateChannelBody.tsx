import React from 'react'
import { CheckIcon } from './Icons'

export default function CreateChannelBody() {
  return (
    <div className='flex items-center w-full'>
        <div className='flex flex-col gap-10 w-full'>
            <div className='flex flex-col lg:flex-row gap-8 items-center justify-between lg:gap-0'>
                <button className='bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md'>
                    <span aria-label='Check' className='bg-primary w-7 h-7 flex justify-center items-center rounded-full'>
                        <CheckIcon edit='w-4 h-4'/>
                    </span>
                    <span className='text-primaryText text-md font-light'>Public</span>
                </button>
                <button className='bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md'>
                    <span aria-label='Check' className='y w-7 h-7 flex justify-center items-center border-2 border-primary rounded-full'>
                    </span>
                    <span className='text-primaryText text-md font-light'>Private</span>
                </button>
                <button className='bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md'>
                    <span aria-label='Check' className='y w-7 h-7 flex justify-center items-center border-2 border-primary rounded-full'>
                    </span>
                    <span className='text-primaryText text-md font-light'>Protected</span>
                </button>
            </div>
            <div className='flex flex-col lg:flex-row items-center lg:items-end gap-3 '>
            <div className="flex flex-col gap-1.5 w-80 lg:w-full">
              <label htmlFor="Name channel" className="text-sm text-primaryText">
                Name Channel
              </label>
              <input
                type="text"
                className="placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light"
                placeholder="Enter name channel"
              />
            </div>
            <button className="w-80 lg:w-32 rounded-md bg-primary p-2.5 text-sm text-primaryText">
                Create
            </button>
            </div>
        </div>
    </div>
  )
}
