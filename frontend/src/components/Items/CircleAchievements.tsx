import React from 'react';
import { Trophy } from './Icons';
import { CircularProgress} from '@chakra-ui/react';

export default function CircleAchievements() {
  return (
    <div className='relative flex justify-center items-center'>
        <CircularProgress value={30} size='100px' thickness='4px' color='#7970B3' trackColor='#414554'/>
        <Trophy edit='w-8 h-8 absolute fill-primary' />
    </div>
  )
}
