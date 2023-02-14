import React, { useEffect, useState } from "react";
import { PlusIcon, SearchIcon } from "../Items/Icons";
import CardFriendMessage from "./CardFriendMessage";
import { dataChannel } from "../../Data";
import { getConversations, getAllUsersDm } from "../../Helpers";

interface typeprops {
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation?: boolean;
  setConversation?: React.Dispatch<React.SetStateAction<boolean>>;
  channel?: boolean;
  setCreate?:React.Dispatch<React.SetStateAction<boolean>>

}

export default function MessagesList({
  setChatState,
  conversation,
  setConversation,
  channel,
  setCreate
}: typeprops) {

  const[dataChat,setDataChat] = useState([]);
  const[dm,setDm] = useState([]);;

  useEffect(()=>{
    getConversations((res:any)=>{
      setDataChat(res.data);
    })

    getAllUsersDm((res:any)=>{

      console.log("dm: ",res);
      
      setDm(res.data);
    })

  },[]);
  


  return (
    <div className="flex h-full flex-col  gap-6 pb-20 lg:pb-0">
      {!channel ? (
        <div className="mx-2 flex items-center rounded-md bg-shape pl-2">
          <SearchIcon edit="w-3 relative" />
          <input
            type="text"
            placeholder="Search for friend"
            className="placeholder-secondary-text flex-1 bg-transparent py-2.5 px-2 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
          />
        </div>
      ) : (
        <div className="mx-2 flex items-center justify-between gap-2">
          <div className="flex flex-1 items-center rounded-md bg-shape pl-2">
            <SearchIcon edit="w-3 relative" />
            <input
              type="text"
              placeholder="Search for channel"
              className="placeholder-secondary-text flex-1 bg-transparent py-2.5 px-2 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
            />
          </div>
          <button className="flex h-6 w-6 items-center justify-center rounded-full bg-primary" onClick={()=>{
            if(setCreate)
            {
              setCreate(true)
              document.body.style.overflow="hidden";
            }
          }}>
            <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
          </button>
        </div>
      )}
      <div className="flex h-full flex-col overflow-auto">
        {!channel
          ? dataChat
            ? dataChat.map((e, index) => {
                return (
                  <CardFriendMessage
                    data={dataChat[index]}
                    key={index}
                    setChatState={setChatState}
                    conversation={conversation}
                    setConversation={setConversation}
                  />
                );
              })
            : null
          : dataChannel
          ? dataChannel.map((e, index) => {
              return (
                <CardFriendMessage
                  data={dataChannel[index]}
                  key={index}
                  setChatState={setChatState}
                  conversation={conversation}
                  setConversation={setConversation}
                  channel={true}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
