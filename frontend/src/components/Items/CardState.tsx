import React from "react";
import {
  PlusIcon,
  GroupIcon,
} from "../Items/Icons";

interface typeProps {
  chatState?: any;
  setMembers?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardState(props: typeProps) {

  return (
    <div
      className={`flex flex-1 items-center ${
        props.chatState?.members
          ? "justify-between lg:justify-start lg:gap-8"
          : ""
      }`}
    >

<React.Fragment>
        {
          ( props.chatState != undefined && Object.keys(props.chatState).length)?(
            <div className="flex items-center gap-2">
             {
              (!props.chatState?.members)?(
                <img
                src={props.chatState.picture}
                alt="Friend"
                className="h-14 w-14 rounded-full"
              />
              ):null
             } 

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-md text-primaryText ${
                    props.chatState.members ? "channel-name" : "max-w-sm"
                  } overflow-hidden text-ellipsis whitespace-nowrap`}
                >
                  {(props.chatState.username || props.chatState.name)
                    .charAt(0)
                    .toUpperCase() +
                    (props.chatState.username || props.chatState.name).slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {!props.chatState.members ? (
                  <span
                    className={`h-2 w-2 rounded-full ${
                      props.chatState.status === "on"
                        ? "bg-online"
                        : "bg-offline"
                    }`}
                  ></span>
                ) : null}
                <span className="text-sm font-light text-secondaryText">
                  {!props.chatState.members
                    ? (props.chatState.status === "on")?(
                      "Online"
                    ):"Offline"
                    : props.chatState.members + " members"}
                </span>
              </div>
            </div>
          </div>
          ):null
        }
      {props.chatState?.members ? (
        <div className="flex items-center gap-4">
          {
              (props.chatState.role === "owner" || props.chatState.role === "admin" || (props.chatState.role === "member" && props.chatState.type === "public"))?(
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-shape" onClick={()=>{
                  if(props.setAdd)props.setAdd(true);
                  document.body.style.overflow="hidden";}}>
                    <PlusIcon edit="fill-secondaryText w-4 h-4" />
                  </button>
              ):null
            }
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-shape" onClick={()=>{
                if(props.setMembers)props.setMembers(true);
                document.body.style.overflow="hidden";
              }}>
                <GroupIcon edit="fill-secondaryText w-5 h-5" />
              </button>
        </div>
      ) : null}
          </React.Fragment>
    </div>
  );
}