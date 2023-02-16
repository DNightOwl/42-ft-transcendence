import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  GroupIcon,
  EyeChannelIcon,
  EyeOffPasswordIcon,
  EyeOnPasswordIcon,
  CopyIcon,
  RefreshIcon,
  CheckIcon
} from "../Items/Icons";

interface typeProps {
  chatState?: any;
  setMembers?: React.Dispatch<React.SetStateAction<boolean>>;
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardState(props: typeProps) {
  const [password, setPassword] = useState(true);
  const [copy, setCopy] = useState(false);
  const [clickEye, setClickEye] = useState(false);
  const [check, setCheck] = useState(false);
  const [value,setValue] = useState("jkdjkljklfsjdlfjasdl;fjsdjf;asdfj;klasjdfl");
  
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
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-shape" onClick={()=>{
                            if(props.setAdd)props.setAdd(true);
                            document.body.style.overflow="hidden";
          }}>
            <PlusIcon edit="fill-secondaryText w-4 h-4" />
          </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-shape" onClick={()=>{
                if(props.setMembers)props.setMembers(true);
                document.body.style.overflow="hidden";
              }}>
                <GroupIcon edit="fill-secondaryText w-5 h-5" />
              </button>
          {props.chatState.role === "owner" ? (
            <div className="relative">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-shape" onClick={()=>{
                (clickEye)?setClickEye(false):setClickEye(true);
              }} onBlur={()=>{
                if(!check)
                  setClickEye(false);
              }}  >
                <EyeChannelIcon edit="fill-secondaryText w-5 h-5" />
              </button>
              {
                (clickEye)?(
                  <div className="absolute p-5 right-0 lg:left-0 rounded-lg lg:w-96 bg-body shadow flex flex-col gap-8 dropdown-channel" onMouseMove={()=>{setCheck(true)}} onMouseOut={()=>{setCheck(false)}}>
                  <div className="flex items-end gap-3">
                    <div className="flex w-80 flex-col gap-1.5 lg:w-full">
                      <label
                        htmlFor="Name channel"
                        className="text-sm text-primaryText"
                      >
                        Password
                      </label>
                      <div className="flex">
                        <input
                          type={`${password ? "password" : "text"}`}
                          className="placeholder-secondary-text flex-1 rounded-md rounded-r-none bg-shape p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light"
                          placeholder="Enter password"
                          value={value}
                          onChange={(e)=>{setValue(e.currentTarget.value)}}
                        />
                        <button
                          className="rounded-md rounded-l-none bg-secondaryText p-3"
                          onClick={() => {
                            password ? setPassword(false) : setPassword(true);
                          }}
                        >
                          {password ? (
                            <EyeOnPasswordIcon edit="w-4 h-4 fill-shape" />
                          ) : (
                            <EyeOffPasswordIcon edit="w-4 h-4 fill-shape" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="w-10 h-10 bg-shape flex rounded-full justify-center items-center" onClick={()=>{
                        navigator.clipboard.writeText(value);
                        setCopy(true);
                        setTimeout(()=>{setCopy(false)},800)
  
                      }}>
                        {
                          (copy)?(
                            <CheckIcon edit="w-5 h-5 fill-secondaryText" />
                          ):(
                            <CopyIcon edit="w-5 h-5 fill-secondaryText" />
                          )
                        }
                      </button>
                      <button className="w-10 h-10 bg-shape flex rounded-full justify-center items-center">
                        <RefreshIcon edit="w-5 h-5 fill-secondaryText"/>
                      </button>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-start gap-3">
                    <button className="w-24 rounded-md bg-shape p-2 text-xs text-primaryText" onClick={()=>{
                      setClickEye(false);
                    }}>
                      Cancel
                    </button>
                    <button className="w-24 rounded-md bg-primary p-2 text-xs text-primaryText">
                      Save
                    </button>
                    </div>
                </div>
                ):null
              }
            </div>
          ) : null}
        </div>
      ) : null}
          </React.Fragment>

      {/* {
        (props.chatState?.length)?(

        ):null
      } */}

    </div>
  );
}