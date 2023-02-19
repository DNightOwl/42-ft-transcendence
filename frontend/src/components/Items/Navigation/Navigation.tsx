import React, { useState, useEffect, useContext } from "react";
import NavigationDesktop from "./NavigationDesktop/NavigationDesktop";
import NavigationPhone from "./NavigationPhone/NavigationPhone";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "../Modal";
import SettingsBody from "../SettingsBody";
import AddMember from "../AddMember";
import NotFound from "../../NotFound";
import CreateChannelBody from '../CreateChannelBody'
import Members from "../Members";
import { getUserData,getConversations } from "../../../Helpers";

import GameSocketContext from "../../../contexts/gameSocket";
import { toast } from "react-toastify";
import Password from "../Password";



interface typeprops {
  chatState: any;
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation: boolean;
  setConversation: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  create?: boolean;
  setCreate?: React.Dispatch<React.SetStateAction<boolean>>;
  members?: boolean;
  setMembers?: React.Dispatch<React.SetStateAction<boolean>>;
  add?: boolean;
  setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
  setClick: React.Dispatch<React.SetStateAction<boolean>>
  setPassChannel?: React.Dispatch<React.SetStateAction<boolean>>
  passChannel?: boolean
  click: boolean,
  username:string,
  setUsername:React.Dispatch<React.SetStateAction<string>>;
  pictureUser:string
  setPictureUser:any
}

export default function Navigation({
  chatState,
  setChatState,
  conversation,
  setConversation,
  modal,
  setModal,
  create,
  setCreate,
  members,
  setMembers,
  click,
  setClick,
  add,
  setAdd,
  setPassChannel,
  passChannel,
  username,
  setUsername,
  pictureUser,
  setPictureUser
}: typeprops) {
  const [messages, setMessages] = useState(false);
  const [display,setDisplay] = useState(false);
  const [data,setData] = useState<any>({});
  const [dataProtected,setDataProtected] = useState([]);
  const location = useLocation();

  let pathname = location.pathname;

  const[dataChat,setDataChat] = useState([]);

  const navigate = useNavigate();
  const socket = useContext(GameSocketContext);

  socket.off("game_accepted").on("game_accepted", (data: any) => {
    navigate(`/game/${data.gameId}`);
  })
  socket.off("game_declined").on("game_declined", (data: any) => {
    toast.info("Your game invitation has been declined");
  })
  
  useEffect(() => {
    if(location.pathname !== "/Tfa" && location.pathname.toLocaleLowerCase() !== "/Login".toLocaleLowerCase() && location.pathname !== "/")
      setDisplay(true);
    if (location.pathname.toLocaleLowerCase() === "/Messages".toLocaleLowerCase()) {
      setMessages(true);
    } else {
      setMessages(false);
      setConversation(false);
      setChatState(dataChat[0]);
    }
    getUserData((res:any)=>{
      setData(res);
    })

    getConversations((res:any)=>{
      setDataChat(res.data);
    })
  }, [location.pathname, setConversation, setChatState]);


  if(pathname !== "/" && pathname.toLocaleLowerCase() !== "/login".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Home".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Queue".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Messages".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Profile".toLocaleLowerCase() && pathname.split('/').at(1) !== "game" && pathname.split('/').at(1) !== "watch" &&  pathname.toLocaleLowerCase() !== "/Tfa".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/ProfileUser".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/AddFriend".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/FriendProfile".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Block".toLocaleLowerCase())
  {
    document.title = "Pong - Page not found"
    return <NotFound />
  }
  return (
    (display)?(
      <React.Fragment>
      <NavigationDesktop
        chatState={chatState}
        setChatState={setChatState}
        message={messages}
        setMessages={setMessages}
        settings={setModal}
        setCreate={setCreate}
        click={click}
        setClick={setClick}
        setPassChannel={setPassChannel}
        setDataProtected={setDataProtected}
        pictureUser ={pictureUser}
        username={username}
        
      />
      <NavigationPhone
        conversation={conversation}
        setConversation={setConversation}
        chatState={chatState}
        setMembers={setMembers}
        setAdd = {setAdd}
      />
      {modal ? (
        <Modal edit="modal">
          <ModalHeader settings={setModal}>Settings</ModalHeader>
          <ModalBody edit="justify-center">
            <SettingsBody settings={setModal} nickname={data?.nickname} pictureUser={data?.pictureLink} setPictureProfile={setPictureUser} setUsername={setUsername} />
          </ModalBody>
        </Modal>
      ) : null} 
      {
        (create)?(
          <Modal edit="modal channel">
          <ModalHeader create={setCreate}>Create Channel</ModalHeader>
          <ModalBody>
            <CreateChannelBody setCreate={setCreate}/>
          </ModalBody>
        </Modal>
        ):null
      }
      {
        (members)?(
          <Modal edit="h-auto modal-members pr-0">
              <ModalHeader edit="pr-4" setMembers={setMembers}>Members</ModalHeader>
                <ModalBody>
                  <Members channelData = {chatState}/>
                </ModalBody>
            </Modal>
            ):null
              }
      
      {
        (add)?(
          <Modal edit="h-auto modal-members pr-0">
              <ModalHeader edit="pr-4" setAdd={setAdd}>Add member</ModalHeader>
                <ModalBody>
                  <AddMember channelData = {chatState}/>
                </ModalBody>
            </Modal>
            ):null
              }
            {
              (passChannel)?(
                <Modal edit="h-auto modal-members pr-0">
                <ModalHeader edit="pr-4" setPassChannel={setPassChannel}>Password channel</ModalHeader>
                <ModalBody>
                  <Password dataProtected={dataProtected} setPassChannel={setPassChannel} setChatState={setChatState}/>
                </ModalBody>
            </Modal>
              ):null
            }
    </React.Fragment>
    ):null
  );
}
