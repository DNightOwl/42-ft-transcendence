import React, { useEffect,useState } from 'react';
import CardUser from './CardUser';
import { getFriends,getFriendsUsers,getUserData } from '../../Helpers';

interface typeProps{
    username?:string
}

export default function Friends({username}:typeProps) {
    const [friends,setFriends] = useState([]);
    const [fill,setFill] = useState([]);
    const [name,setName] = useState<any>({})
    useEffect(()=>{
        getUserData((res:any)=>{
            setName(res.nickname)
        })
        if(username !== undefined)
        {
            getFriendsUsers((res:any)=>{
                setFriends(res)         
            },username);
        }
        else
        {
            getFriends((res:any)=>{
                let data:string[] = [];
                let fill:any = [];
                let count = 0;
                res.forEach((element:any) => {
                    data.push(element);
                    count++;
                    if(count >= 3)
                    {
                        fill.push(data)
                        count = 0;
                        data = [];
                    }
                });
                setFill(fill)
            })   
        }
    },[username])
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
            (fill.length)?(
                fill.map((e:any,index)=>{
                    return(
                        <div className='flex w-full flex-col md:flex-row gap-12' key={index}>
                        {
                            e.map((element:any,index:number)=>{
                                if(element.username === name)
                                element.friend = "none"
                                return(
                                    <CardUser key={index} username={element.username} picture={element.pictureLink} user={(username === undefined)?false:true} data={element}/>
                                )
                            })
                        }
                        </div>
                    )
                    // e.map((element:any)=>{
                    //     if(element.username === name)
                    //         e.friend = "none"
                        
                        
                    // })
                    return null
                    
                })
            ):null
        }
    </div>
  )
}
