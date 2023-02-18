

import { AddFriendIcon } from "./Items/Icons"
import { addFriend } from "../Helpers";

interface typeProps{
  setFriend: React.Dispatch<React.SetStateAction<boolean>>;
  username:string
  dataUser:any

}

export function BtnAddFriend ({setFriend,username,dataUser}:typeProps){
    return(
        <button className="w-36 p-2 rounded-md bg-primary gap-2 flex items-center justify-center" onClick={()=>{
            setFriend(true);
            addFriend(username);
          }}>
          <AddFriendIcon edit="w-5 fill-primaryText"/>
          <span className="text-primaryText text-sm">Add friend</span>
        </button>
    )
}