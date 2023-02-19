

import { AddFriendIcon } from "./Items/Icons"
import { addFriend } from "../Helpers";
import { Link } from "react-router-dom";

interface typeProps{
  setFriend?: React.Dispatch<React.SetStateAction<any>>;
  username:string
  dataUser:any

}

export function BtnAddFriend ({setFriend,username,dataUser}:typeProps){
    return(
        <Link to="/FriendProfile" state={{data:dataUser}} className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center" onClick={()=>{
          if(setFriend)  
          setFriend(true);
            addFriend(username);
          }}>
          <AddFriendIcon edit="w-5 fill-primaryText"/>
          <span className="text-primaryText text-sm">Add friend</span>
        </Link>
    )
}