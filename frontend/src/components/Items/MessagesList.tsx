import React, { useEffect, useState } from "react";
import { PlusIcon, SearchIcon } from "../Items/Icons";
import CardFriendMessage from "./CardFriendMessage";
import { getConversations, getAllUsersDm, getChannelConversations, getAllChannels } from "../../Helpers";

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
  const[allConversation,setAllCoversation] = useState([]);
  const[allChannels,setAllChannels] = useState([]);
  const[dataChannel,setDataChannel] = useState<any>([]);
  const[value,setValue] = useState<any>([]);
  const[valueChannel,setValueChannel] = useState<any>([]);
  const[display,setDisplay] = useState(false);
  const [reset,setReset] = useState<any>([]);
  const [resetChannel,setResetChannel] = useState<any>([]);
  const [empty,setEmpty] = useState(false);

  useEffect(()=>{
    getConversations((res:any)=>{
      
      setDataChat(res.data);
      setReset(res.data)
    })

    getAllUsersDm((res:any)=>{
      setAllCoversation(res.data);
    })

    getChannelConversations((res:any)=>{
      setDataChannel(res.data)
      setResetChannel(res.data)
    
    getAllChannels((res:any)=>{
        setAllChannels(res.data);
      })
    });

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
            value={value}
            onChange={(e)=>{
              if(!channel){
                let value = e.currentTarget.value;
                let data:any = [];
                setValue(e.currentTarget.value)
                if(value.length)
                {
                  setEmpty(false);
                    data = allConversation.filter((e:any)=>{
                        if(e.username.search(value) != -1){
                            return e;        
                        }
                    })
                    setDisplay(true)
                    setDataChat(data);
                }
                else
                {
                    data=[];
                    setDisplay(false);
                    setDataChat(reset)
                    setEmpty(true);
                    
                }
              }
            }}
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
              value={valueChannel}
              onChange={(e)=>{
                  let value = e.currentTarget.value;
                  let data:any = [];
                  
                  setValueChannel(e.currentTarget.value)
                  if(value.length)
                  {
                    setEmpty(false);
                      data = allChannels.filter((e:any)=>{
                        
                          if(e.name.search(value) != -1){
                              return e;        
                          }
                      })
                      setDisplay(true)
                      setDataChannel(data);
                  }
                  else
                  {
                      data=[];
                      setDisplay(false);
                      setDataChannel(resetChannel)
                      setEmpty(true);
                  }
              }}
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
          ? dataChat.length
            ? dataChat.map((e, index) => {
                return (
                  <CardFriendMessage
                    data={dataChat[index]}
                    key={index}
                    setChatState={setChatState}
                    conversation={conversation}
                    setConversation={setConversation}
                    dataChat={dataChat}
                    empty={empty}
                  />
                );
              })
            : <div className="h-full flex justify-center items-center text-primaryText text-md lg:hidden">No messages.</div>
          : dataChannel
          ? dataChannel.map((e:any, index:any) => {
              return (
                <CardFriendMessage
                  data={dataChannel[index]}
                  key={index}
                  setChatState={setChatState}
                  conversation={conversation}
                  setConversation={setConversation}
                  channel={true}
                  dataChannel={dataChannel}

                />
              );
            })
          : null}
      </div>
    </div>
  );
}
