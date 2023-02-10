import React, { useEffect,useState } from 'react';
import CardUser from './CardUser';
import { getFriends } from '../../Helpers';

export default function Friends() {
    const [friends,setFriends] = useState([]);
    let count = 0;
    useEffect(()=>{
        getFriends((res:any)=>{
            setFriends(res);
        })
    },[])
  return (
    <div className='flex pt-10 content-profile lg:pb-10 flex-col gap-12'>
        {/* <div className='flex w-full justify-center items-center flex-col md:justify-start md:flex-row gap-12'>
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
        </div> */}
        {
            (friends)?(
                friends.map((e:any,index)=>{
                    return(<CardUser key={index} username={e.username} picture={e.pictureLink} />)
                })
            ):null
        }
    </div>
  )
}
