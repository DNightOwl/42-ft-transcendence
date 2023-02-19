import React from 'react';
import { CircularProgress} from '@chakra-ui/react';

interface typeProps{
  icon:any
}

export default function CircleAchievements({icon}:typeProps) {
  return (
    <div className='relative flex justify-center items-center'>
        <CircularProgress value={100} size='100px' thickness='4px' color='#7970B3' trackColor='#414554'/>
        {icon}
    </div>
  )
}
