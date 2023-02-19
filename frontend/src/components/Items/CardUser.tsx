import React,{useEffect, useState} from 'react';
import {getUserData,getUsers} from '../../Helpers'
import { Link } from 'react-router-dom';

interface typeProps{
  username:string
  picture:string
  user:boolean
  data:any
  displayFriends?: React.Dispatch<React.SetStateAction<boolean>>;
  click?:number;
  setClick?: React.Dispatch<React.SetStateAction<number>>;

}

export default function CardUser({username,picture,user,data,displayFriends,click,setClick}:typeProps) {
  const[dropDown,setDropDown] = useState<boolean>(false)
  const [mouse,setMouse] = useState(true);
  const [move,setMove] = useState(false);
  const[display,setDisplay] = useState(true);

  const [dataUser,setDataUser]    = useState<any>({});
  const [userProfile,setUserProfile] = useState("")

  useEffect(()=>{
    document.title = "Pong - Profile";
        getUsers((res:any)=>{
      
      res.data.forEach((e:any)=>{
        

        if(e.username === username)
        {
          setDataUser(e);
        }
      })
    })

    getUserData((res:any)=>{
      
      setUserProfile(res.nickname);
    })
  },[])


  let redirection = "/ProfileUser";

  if(username === userProfile)
    redirection = "/Profile"
    

  if(display)
  {
    return(
      <Link to ={redirection} state={{data:dataUser}} className='flex items-center p-4 card-user shadow justify-between bg-body rounded-xl display-friends' onClick={(e)=>{
        
        if(move)  
          e.preventDefault()
        else
          setDropDown(false)
      }}>
      <div className='flex gap-3 items-center'>
          <img src={picture} alt="Friend" className='w-12 h-12 rounded-full' />
          <span className='text-sm text-primaryText username-card overflow-hidden text-ellipsis whitespace-nowrap'>{username.charAt(0).toUpperCase() + username.slice(1)}</span>
      </div>
  </Link>
    )
  }
  else{
    return null
  }
}
