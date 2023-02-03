import React from 'react';
import { CircularProgress} from '@chakra-ui/react';
import { SearchIcon, Trophy } from './Icons';

export default function Achievements() {
  return (
    <div className='flex py-10'>
        <div className='flex items-center justify-around w-full'>
            <div className='flex items-center justify-center p-5 card-profile gap-5 bg-body rounded-xl'>
                <div className='relative flex justify-center items-center'>
                    <CircularProgress value={30} size='100px' thickness='4px' color='#7970B3' trackColor='#414554'/>
                    <Trophy edit='w-8 h-8 absolute fill-primary' />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-primaryText text-4xl'>10</span>
                    <span className='text-secondaryText text-sm'>Achievements completed</span>
                </div>
            </div>
            <div className='flex items-center justify-center p-5 card-profile gap-5 bg-body rounded-xl'>
                <div className='relative flex justify-center items-center'>
                    <CircularProgress value={50} size='100px' thickness='4px' color='#7970B3' trackColor='#414554'/>
                    <SearchIcon edit='w-5 h-5 absolute fill-primary' />
                </div>
                <div className='flex flex-col gap-1'>
                    <span className='text-primaryText text-4xl'>10</span>
                    <span className='text-secondaryText text-sm'>Achievements completed</span>
                </div>
            </div>
        </div>
    </div>
  )
}