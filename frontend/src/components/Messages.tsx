import React, { useEffect, useRef } from "react";
import BoxMessagesFriend from "./Items/BoxMessagesFriend";
import BoxMessagesUser from "./Items/BoxMessagesUser";
import BoxMessagesMember from "./Items/BoxMessagesMember";
import { SendIcon } from "./Items/Icons";
import MessagesContainer from "./Items/MessagesContainer";
import HeaderChat from "./Items/Navigation/NavigationDesktop/HeaderChat";
import { Modal, ModalHeader, ModalBody } from "./Items/Modal";
import SettingsBody from "./Items/SettingsBody";

interface typeProps {
  chatState: any;
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation: boolean;
  setConversation: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setCreate?: React.Dispatch<React.SetStateAction<boolean>>;
  
}

export default function Messages({
  chatState,
  setChatState,
  conversation,
  setConversation,
  modal,
  setModal,
  setCreate
}: typeProps) {
  const scroll = useRef<HTMLDivElement>(null);

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
  }, [conversation, chatState]);

  return (
    <React.Fragment>
      <main
        className={`h-full overflow-hidden pb-0 lg:ml-64 lg:mr-4 lg:pt-0 ${
          conversation ? "pt-0" : ""
        }`}
      >
        <div
          className={`${
            conversation ? "" : "hidden"
          } relative mb-16 h-full flex-col overflow-hidden pb-16 lg:mb-8 lg:flex lg:pb-8`}
        >
          <HeaderChat chatState={chatState} settings={setModal} />
          <div
            className="conversation mb-16 h-full overflow-auto pb-16 lg:mb-8 lg:pb-8"
            ref={scroll}
          >
            <div className="flex flex-col gap-20">
              {chatState.conversation
                ? chatState.conversation.map((e: any, index: number) => {
                    if (e.type === "friend")
                      return (
                        <BoxMessagesFriend
                          message={e.message}
                          time={e.time}
                          key={index}
                        />
                      );
                    else if (e.type === "member")
                      return (
                        <BoxMessagesMember
                          message={e.message}
                          time={e.time}
                          picture={e.picture}
                          key={index}
                        />
                      );
                    else
                      return (
                        <BoxMessagesUser
                          message={e.message}
                          time={e.time}
                          key={index}
                        />
                      );
                  })
                : null}
            </div>
          </div>
          <div className="send absolute bottom-3 flex w-full items-center rounded-md bg-shape pr-2">
            <input
              type="text"
              placeholder="Type a message"
              className="placeholder-secondary-text flex-1 bg-transparent p-4 pl-3 pr-2 text-sm font-light text-primaryText placeholder:text-sm placeholder:font-light focus:outline-none"
            />
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <SendIcon edit="w-4 fill-white" />
            </button>
          </div>
        </div>
        {!conversation ? (
          <MessagesContainer
            chatState={chatState}
            setChatState={setChatState}
            conversation={conversation}
            setConversation={setConversation}
            setCreate={setCreate}
            edit = "lg:hidden"
          />
        ) : null}
      </main>
      {modal ? (
        <Modal edit="modal">
          <ModalHeader settings={setModal}>Settings</ModalHeader>
          <ModalBody>
            <SettingsBody settings={setModal} />
          </ModalBody>
        </Modal>
      ) : null}
    </React.Fragment>
  );
}
