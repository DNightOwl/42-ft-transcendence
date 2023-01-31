import React from 'react';
import {ControllerIcon, ArrowDownIcon} from '../../Icons';
import UserPicture from '../../../../assets/user.jpg';
import CardState from '../../CardState'


interface typeProps{
    chatState:any
}

export default function HeaderChat({chatState}:typeProps) {
    return (
    <section className='hidden lg:flex justify-between items-start pt-7 gap-5 pb-7'>
        <CardState chatState={chatState}/>
            <div className='flex items-center gap-5'>
                <button className='bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3'>
                    <ControllerIcon edit="w-7"/>
                    <span>Play now</span>
                </button>
                <button className='flex items-center gap-2 text-primaryText text-sm'>
                    <div className='flex items-center gap-2'>
                        <img src={UserPicture} alt="User" className='w-10 h-10 rounded-full' />
                        <span className='username'>Username</span>
                    </div>
                    <span className='bg-shape w-4 h-4 rounded-full flex justify-center items-center'>
                        <ArrowDownIcon edit="w-1.5"/>
                    </span>
                </button>
            </div>
    </section>
      )
}
