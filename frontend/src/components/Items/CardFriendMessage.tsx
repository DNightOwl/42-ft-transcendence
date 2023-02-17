import React,{useState,useEffect} from "react";
import { PointsIcon, LockIcon } from "../Items/Icons";
import { Link } from "react-router-dom";
import { getConversations, getChannelConversations, joinRoom,leaveRoom } from "../../Helpers";
interface Props {
  newMessage?: boolean;
  data: any;
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation?: boolean;
  setConversation?: React.Dispatch<React.SetStateAction<boolean>>;
  channel?: boolean;
  dataChat?:any
  dataChannel?:any
  empty?:boolean,
  type?:string
  join?:string,
  setPassChannel?: React.Dispatch<React.SetStateAction<boolean>>
  setDataProtected?:any


}

export default function CardFriendMessage(props: Props) {
  
  const [dropDown,setDropDwon] = useState<boolean>(false)
  const [mouse,setMouse] = useState(false);
  const [leave,setLeave] = useState(false);
  
  return (
    <React.Fragment>
      {
        (!leave)?(
          <Link
          to="/Messages"
          className={`btn-message btn-friend-message flex justify-between px-2 py-4 lg:hover:bg-backgroundHover`}
          onClick={(event) => {
            if(!mouse)
            {
              let btnMessage = document.querySelectorAll(".btn-friend-message");
              let find: boolean = false;
    
              btnMessage.forEach((e) => {
                e.classList.remove("lg:bg-backgroundHover");
              });
              
    
              btnMessage.forEach((e, index) => {
                e.classList.forEach((element) => {
                  if (element === "lg:bg-backgroundHover") {
                    find = true;
    
                    if (index >= btnMessage.length / 2)
                      btnMessage[index - btnMessage.length / 2].classList.add(
                        "lg:bg-backgroundHover"
                      );
                    return;
                  }
                });
                if (find) return;
              });
    
              if (!props.channel) {
                props.dataChat.forEach((e:any, index:number) => {
                  if (e.id === props.data.id) {
                    props.setChatState(props.dataChat[index]);
                    return;
                  }
                });
              } else {
                props.dataChannel.forEach((e:any, index:any) => {
                  if (e.name === props.data.name) {
                    
                    if(props.dataChannel[index].type === "public" && props.dataChannel[index].join === "NON")
                    {
                      let obj = {
                        name: props.dataChannel[index].name,
                        type: props.dataChannel[index].type
                      }
  
                      joinRoom((res:any)=>{
                        props.setChatState(res.data);
                        
                      },obj)
                    }
                    else if(props.dataChannel[index].type === "protected" && props.dataChannel[index].join === "NON")
                    {
                      let obj = {name: props.dataChannel[index].name, type:props.dataChannel[index].type}
                      if(props.setPassChannel)
                        props.setPassChannel(true);
                      props.setDataProtected(obj)
                    }
                    else
                      props.setChatState(props.dataChannel[index]);
                    return;
                  }
                });
              }
              if (props.setConversation) props.setConversation(true);
            }
          }}
        >
          <div className="flex items-center gap-2">
            {!props.channel?(
                        <img
                        src={props.data.picture}
                        alt="Friend"
                        className="h-10 w-10 rounded-full"
                      />
            ):null}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`username text-sm text-primaryText ${
                    props.newMessage ? "new-message" : ""
                  }`}
                >
                  {(props.data.username || props.data.name)
                    .charAt(0)
                    .toUpperCase() +
                    (props.data.username || props.data.name).slice(1)}
                </span>
                {props.newMessage ? (
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                ) : null}
              </div>
              <span className="w-40 overflow-hidden text-ellipsis text-xs font-light text-secondaryText">
                {props.data.latestMessage}
              </span>
            </div>
          </div>
          <div className="relative">
            {
              (props.join !== "NON")?(
                (props.type === "private")?(
                  <div className="bg-primary w-12 p-.6 text-primaryText rounded-full text-center text-xs private">Private</div>
                ):
                <button className="flex h-4 w-4 items-center justify-center rounded-full bg-shape p-1 hover:bg-backgroundHover lg:hover:bg-body" onClick={()=>{
                  (dropDown)?setDropDwon(false):setDropDwon(true)
                }} onMouseMove={()=>{
                  setMouse(true)
                }} onMouseLeave={()=>{
                  setMouse(false)
                }} onBlur={()=>{
                  if(!mouse)
                    setDropDwon(false)
                }}>
                  <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
                </button>
              ):(props.type === "protected")?(
                <LockIcon edit="w-4 h-4 fill-secondaryText" />
              ):null
            }
            {
              (dropDown)?(
                (props.channel)?(
                  <div className="w-32 absolute top-6 right-0 flex flex-col gap-2 rounded-md bg-body py-3 shadow z-10">
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                    setDropDwon(false)
                    setLeave(true);
                    leaveRoom((res:any)=>{
                    },props.data.name);
                    
                  }}>
                    Leave channel
                  </button>
                  {
                    (props.data.role === "owner")?(
                      <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                        setDropDwon(false)
                        setLeave(true);
                        leaveRoom((res:any)=>{
                        },props.data.name);
                        
                      }}>
                        Delete channel
                      </button>
                    ):null
                  }
                </div>
                ):(
                  <div className="w-32 absolute top-6 right-0 flex flex-col gap-2 rounded-md bg-body py-3 shadow z-10">
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                    setDropDwon(false)
                  }}>
                    Block
                  </button>
                  <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light" onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                    setDropDwon(false)
                  }}>
                    Invite to play
                  </button>
                </div>
                )
              ):null
            }
          </div>
        </Link>
        ):null
      }
    </React.Fragment>
  );
}
