import React, { useEffect,useState } from 'react';
import CardUser from './CardUser';
import { getFriends,getFriendsUsers,getUserData } from '../../Helpers';

interface typeProps{
    username?:string
}

export default function Friends({username}:typeProps) {
    const [friends,setFriends] = useState([]);
    const [fill,setFill] = useState([]);
    const [name,setName] = useState<any>({});
    const [display,setDisplay] = useState(false)
    const [click,setClick] = useState(1);
    useEffect(()=>{      
        console.log(click);
        getUserData((res:any)=>{
            setName(res.nickname)
        })
        if(username !== undefined)
        {
            getFriendsUsers((res:any)=>{
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
                if(data.length)
                    fill.push(data)
                setFill(fill)
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
                if(data.length)
                    fill.push(data)
                setFill(fill)
            })   
        }
    },[username,click])

    if(fill.length && !display)
  return (
    <div className='flex pt-10 content-profile lg:pb-10 flex-col gap-12'>
        {
            fill.map((e:any,index)=>{
                return(
                    <div className='flex w-full flex-col md:flex-row gap-12' key={index}>
                        {
                            e.map((element:any,index:number)=>{
                                if(element.username === name)
                                    element.friend = "none"
                                        return(
                                        <CardUser key={index} username={element.username} picture={element.pictureLink} user={(username === undefined)?false:true} data={element} click={click} setClick={(setClick)} />
                                        )
                                        })
                                    }
                                    </div>
                                )
                            })
        }
    </div>
  )
  else
    return(
        <div className='h-full flex content-profile lg:pb-0 justify-center items-center text-primaryText text-md'>No friends.</div>
    )
}