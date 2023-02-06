import React, { useState, useEffect } from "react";
import NavigationDesktop from "./NavigationDesktop/NavigationDesktop";
import NavigationPhone from "./NavigationPhone/NavigationPhone";
import { useLocation } from "react-router-dom";
import { dataChat } from "../../../Data";
import { Modal, ModalHeader, ModalBody } from "../Modal";
import SettingsBody from "../SettingsBody";
//import CreateChannelBody from '../CreateChannelBody'

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
  setModal,
}: typeprops) {
  const [messages, setMessages] = useState(false);
  const [login,setLogin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/Messages") {
      setMessages(true);
    } else {
      setMessages(false);
      setConversation(false);
      setChatState(dataChat[0]);
    }

    if(location.pathname === "/")
      setLogin(true);
  }, [location.pathname, setConversation, setChatState,login]);
  console.log(login);
  
  return (
    (!login)?(
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
  /*
  }      <Modal edit="modal">
        <ModalHeader>Create Channel</ModalHeader>
        <ModalBody>
          <CreateChannelBody />
        </ModalBody>
      </Modal> 
  */

}

    </React.Fragment>
    ):null
  );
}