import React,{useState,useEffect} from "react";
import { PointsIcon } from "../Items/Icons";
import { Link } from "react-router-dom";
import { getConversations, getChannelConversations } from "../../Helpers";
interface Props {
  newMessage?: boolean;
  data: any;
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation?: boolean;
  setConversation?: React.Dispatch<React.SetStateAction<boolean>>;
  channel?: boolean;
  dataChat?:any
  dataChannel?:any
  empty?:boolean
}

export default function CardFriendMessage(props: Props) {
  
  const [dropDown,setDropDwon] = useState<boolean>(false)
  const [mouse,setMouse] = useState(false);
  
  return (
    <React.Fragment>
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
                if (e.id === props.data.id) {
                  console.log("data: ",props.dataChannel);
                  
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
          <button className="flex h-4 w-4 items-center justify-center rounded-full bg-shape p-1 hover:bg-backgroundHover lg:hover:bg-body" onClick={()=>{
            (dropDown)?setDropDwon(false):setDropDwon(true)
          }} onMouseMove={()=>{
            setMouse(true)
          }} onMouseLeave={()=>{
            setMouse(false)
          }} onBlur={()=>{
            setDropDwon(false)
          }}>
            <PointsIcon edit="w-2.5 h-2.5 fill-secondaryText" />
          </button>
          {
            (dropDown)?(
              <div className="w-32 absolute top-6 right-0 flex flex-col gap-2 rounded-md bg-body py-3 shadow z-10">
              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover  font-light">
                Block
              </button>
              <button className="flex items-center  gap-2 py-2 px-4  text-primaryText text-xs hover:bg-backgroundHover font-light">
                Invite to play
              </button>
            </div>
            ):null
          }
        </div>
      </Link>
    </React.Fragment>
  );
}
