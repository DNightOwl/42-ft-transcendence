import React, { useEffect, useRef,useState } from "react";
import BoxMessagesFriend from "./Items/BoxMessagesFriend";
import BoxMessagesUser from "./Items/BoxMessagesUser";
import BoxMessagesMember from "./Items/BoxMessagesMember";
import { SendIcon, NomessagesIcon } from "./Items/Icons";
import MessagesContainer from "./Items/MessagesContainer";
import HeaderChat from "./Items/Navigation/NavigationDesktop/HeaderChat";
import { Modal, ModalHeader, ModalBody } from "./Items/Modal";
import SettingsBody from "./Items/SettingsBody";
import axios from 'axios';
import { checkToken,getUserData, getUsers } from "../Helpers";
import { socket } from "../context/socket";

interface typeProps {
  chatState?: any;
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation: boolean;
  setConversation: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setCreate?: React.Dispatch<React.SetStateAction<boolean>>;
  setMembers?: React.Dispatch<React.SetStateAction<boolean>>;
  add?: boolean;
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
  setPassChannel?: React.Dispatch<React.SetStateAction<boolean>>
  passChannel?: boolean,
  username:string,
  setUsername:React.Dispatch<React.SetStateAction<string>>;
  pictureUser:string
  setPictureUser:any
  
}


export default function Messages({
  chatState,
  setChatState,
  conversation,
  setConversation,
  modal,
  setModal,
  setCreate,
  setMembers,
  add,
  setAdd,
  setPassChannel,
  username,
  setUsername,
  pictureUser,
  setPictureUser
}: typeProps) {
  checkToken();
  const scroll = useRef<HTMLDivElement>(null);
  const [data,setData] = useState<any>({});
  const [message,setMessage] = useState<any>("");
  

  axios.get("http://localhost:3000/profile", { 
    withCredentials: true,
      headers :{'Access-Control-Allow-Origin': 'localhost:3000'} 
    }).then().catch(error=>{
        if(error.response.data.statusCode === 401)
        {
          axios.get("http://localhost:3000/auth/refresh", {
            withCredentials: true,
            headers :{'Access-Control-Allow-Origin': 'localhost:3000'}
          }).then().catch((error)=>{
            window.location.href="http://localhost:3001/Login";
          });
        }
    });
  
  
  
  
  
    useEffect(()=>
  {
    if(!socket.connected)
      socket.connect()
    socket.on("msgFromServer", (data) => {
      
      setChatState(data)
    });
    return () => {socket.off("msgToClients")};
  },[])
  useEffect(() => {
    document.title = "Pong - Messages";
    let objDiv = document.querySelectorAll(".conversation");

    objDiv.forEach((e) => {
      e.scrollTop = e.scrollHeight;
    });

    if (scroll.current) {

      let hasVerticalScrollbar =
        scroll.current.scrollHeight > scroll.current.clientHeight;
      if (hasVerticalScrollbar) scroll.current.classList.add("pr-4");
    }

    getUserData((res:any)=>{
      setData(res);
    })
  }, [conversation, chatState]);


  const dmData = {
      type:"DM",
      data: message,
      name:chatState?.username,
  }

  const chatData = {
    type:"RM",
    data: message,
    name:chatState?.name,
}
  const sendMessage = () =>
  {
    (!chatState?.members)?
      socket.emit("msgServer", dmData):(
        socket.emit("msgServer", chatData)
      )
  }
  
  
  return (
    <React.Fragment>
      <main
        className={`h-full overflow-hidden pb-0 lg:ml-64 lg:mr-4 lg:pt-0${
          conversation ? "pt-0" : ""
        }`}
      >
        <div
          className={`${
            conversation ? "" : "hidden"
          } relative mb-16 h-full flex-col overflow-hidden pb-16 lg:mb-8 lg:flex lg:pb-8`}
        >
          <HeaderChat chatState={chatState} settings={setModal} setMembers={setMembers} setAdd={setAdd} username={username} setUsername={setUsername} pictureUser={pictureUser} setPictureUser={setPictureUser}/>
          <div
            className={`conversation h-full overflow-auto ${chatState?.conversation?"mb-16 pb-16 lg:mb-8 lg:pb-8":""}`}
            ref={scroll}
          >
            <div className={`flex flex-col gap-20  ${(chatState?.conversation?.length)?"":"h-full"}`}>
              {(chatState?.members) || (chatState?.conversation?.length)
                ? chatState?.conversation?.map((e: any, index: number) => {
                  
                  if(chatState.members){
                    
                    
                    if(e.login === data.nickname)
                    {
                      return(
                        <BoxMessagesUser
                        message={e.message}
                        time={e.time}
                        key={index}
                      />
                      )
                    }
                    else{
                      return(
                        <BoxMessagesMember
                        message={e.message}
                        time={e.time}
                        picture={e.picture}
                        key={index}
                      />
                      )
                    }
                  }
                  else{
                    if(e.type === "friend")
                    {
                      return (
                        <BoxMessagesFriend
                          message={e.message}
                          time={e.time}
                          key={index}
                        />
                      );
                    }
                    else{
                      return (
                        <BoxMessagesUser
                          message={e.message}
                          time={e.time}
                          key={index}
                        />
                      )
                    }
                  }
                  })
                : (<div className="h-full flex justify-center items-center">
                  <div className="flex flex-col justify-center gap-3 items-center">
                    <div className="bg-shape p-7 rounded-full">
                      <NomessagesIcon edit="w-20 h-20 fill-secondaryText"/>
                    </div>
                      <span className="text-md text-secondaryText">No messages.</span>
                  </div>
                </div>)}
            </div>
          </div>
          {
            (chatState?.conversation)?(
              <form action="#" className="send absolute bottom-3 flex w-full items-center rounded-md bg-shape pr-2">
              <input
                type="text"
                placeholder="Type a message"
                className="placeholder-secondary-text flex-1 bg-transparent p-4 pl-3 pr-2 text-sm font-light text-primaryText placeholder:text-sm placeholder:font-light focus:outline-none"
                value={message} onChange={(e)=>{
                  setMessage(e.currentTarget.value)
                }}
              />
              <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-md bg-primary" onClick={(e)=>{
                e.preventDefault();
                if(message.trim().length)
                {
                 setMessage("");
                 sendMessage();
              }
              }}>
                <SendIcon edit="w-4 fill-white" />
              </button>
            </form>
            ):null
          }
        </div>
        {!conversation ? (
          <MessagesContainer
            chatState={chatState}
            setChatState={setChatState}
            conversation={conversation}
            setConversation={setConversation}
            setCreate={setCreate}
            edit = "lg:hidden"
            setPassChannel={setPassChannel}
          />
        ) : null}
      </main>

    </React.Fragment>
  );
}
