import React from 'react';
import CardUser from './CardUser';

export default function Friends() {
  return (
    <div className='flex pt-10 content-profile lg:pb-10 flex-col gap-12'>
        <div className='flex w-full justify-center items-center flex-col md:justify-start md:flex-row gap-12'>
            <CardUser />
            <CardUser />
            <CardUser />
        </div>
        <div className='flex w-full flex-col md:flex-row gap-12'>
            <CardUser />
            <CardUser />
            <CardUser />
        </div>
        <div className='flex w-full flex-col md:flex-row gap-12'>
            <CardUser />
            <CardUser />
            <CardUser />
        </div>
        <div className='flex w-full flex-col md:flex-row gap-12'>
            <CardUser />
            <CardUser />
            <CardUser />
        </div>
    </div>
  )
}
