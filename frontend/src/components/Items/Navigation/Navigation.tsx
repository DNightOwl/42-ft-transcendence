import React, { useState, useEffect } from "react";
import NavigationDesktop from "./NavigationDesktop/NavigationDesktop";
import NavigationPhone from "./NavigationPhone/NavigationPhone";
import { useLocation } from "react-router-dom";
import { dataChat } from "../../../Data";
import { Modal, ModalHeader, ModalBody } from "../Modal";
import SettingsBody from "../SettingsBody";
import NotFound from "../../NotFound";
import CreateChannelBody from '../CreateChannelBody'

interface typeprops {
  chatState: any;
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation: boolean;
  setConversation: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigation({
  chatState,
  setChatState,
  conversation,
  setConversation,
  modal,
  setModal
}: typeprops) {
  const [messages, setMessages] = useState(false);
  const [display,setDisplay] = useState(false);
  const location = useLocation();
  const [create,setCreate] = useState(false);

  let pathname = location.pathname;

  useEffect(() => {
    if(location.pathname.toLocaleLowerCase() !== "/Login".toLocaleLowerCase() && location.pathname !== "/")
      setDisplay(true);
    if (location.pathname.toLocaleLowerCase() === "/Messages".toLocaleLowerCase()) {
      setMessages(true);
    } else {
      setMessages(false);
      setConversation(false);
      setChatState(dataChat[0]);
    }
    let create = document.querySelectorAll(".create")
    create.forEach((e)=>{
      e.addEventListener("click",()=>{
        console.log(4);
        
      })
    })
    

  }, [location.pathname, setConversation, setChatState]);

  if(pathname !== "/" && pathname.toLocaleLowerCase() !== "/Login".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Home".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Messages".toLocaleLowerCase() && pathname.toLocaleLowerCase() !== "/Profile".toLocaleLowerCase())
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
      />
      <NavigationPhone
        conversation={conversation}
        setConversation={setConversation}
        chatState={chatState}
      />
      {modal ? (
        <Modal edit="modal">
          <ModalHeader settings={setModal}>Settings</ModalHeader>
          <ModalBody edit="justify-center">
            <SettingsBody settings={setModal} />
          </ModalBody>
        </Modal>
      ) : null} 
      {
        (create)?(
          <Modal edit="modal channel">
          <ModalHeader create={setCreate}>Create Channel</ModalHeader>
          <ModalBody>
            <CreateChannelBody/>
          </ModalBody>
        </Modal>
        ):null
      }
    </React.Fragment>
    ):null
  );
}
