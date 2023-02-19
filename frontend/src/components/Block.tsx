import React, { useEffect, useState } from "react";
import CardProfile from "./Items/CardProfile";
import { checkToken,getUsers,unblockFriend} from "../Helpers";
import { Link, useLocation } from "react-router-dom";
import { UnblockIcon } from "./Items/Icons";


export default function FriendProfile() {

  checkToken();

  const location = useLocation();
  const fill = location.state;
  const [data,setData]    = useState<any>({});

  useEffect(()=>{
    document.title = "Pong - Profile";
        getUsers((res:any)=>{
      
      res.data.forEach((e:any)=>{
        

        if(e.username === fill.data.username)
        {
          setData(e);
        }
      })
    })
  },[])

  let dataUser:any = {};
  
 if(fill.data.username === data.username)
 dataUser = data;
 else
 dataUser = fill.data
  
    return(
      <main className="flex flex-col gap-12 h-full pb-0 items-center">
        <section className="flex  flex-col items-center gap-10  justify-center">
        <CardProfile settings={false}  dataUser={dataUser}/>
        <div className="flex btn-profile items-center gap-3">
              <Link to="/AddFriend" state={{data:dataUser}} className="w-36 p-2 rounded-md bg-unblock gap-2 flex items-center justify-center" onClick={()=>{
                unblockFriend(fill.username)
              }}>
                <UnblockIcon edit="w-4 fill-primaryText"/>
                <span className="text-primaryText text-sm">Unblock</span>
              </Link>
        </div>
      </section>
      </main>
    )
}