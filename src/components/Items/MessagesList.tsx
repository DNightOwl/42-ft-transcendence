import React from "react";
import { PlusIcon, SearchIcon } from "../Items/Icons";
import CardFriendMessage from "./CardFriendMessage";
import { dataChat, dataChannel } from "../../Data";

interface typeprops {
  setChatState: React.Dispatch<React.SetStateAction<any>>;
  conversation?: boolean;
  setConversation?: React.Dispatch<React.SetStateAction<boolean>>;
  channel?: boolean;
}

export default function MessagesList({
  setChatState,
  conversation,
  setConversation,
  channel,
}: typeprops) {
  return (
    <div className="flex h-full flex-col  gap-6 pb-20 lg:pb-0">
      {!channel ? (
        <div className="mx-2 flex items-center rounded-md bg-shape pl-2">
          <SearchIcon edit="w-3 relative" />
          <input
            type="text"
            placeholder="Search for friend"
            className="placeholder-secondary-text flex-1 bg-transparent py-2.5 px-2 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
          />
        </div>
      ) : (
        <div className="mx-2 flex items-center justify-between gap-2">
          <div className="flex items-center rounded-md bg-shape pl-2 flex-1">
            <SearchIcon edit="w-3 relative" />
            <input
              type="text"
              placeholder="Search for channel"
              className="placeholder-secondary-text flex-1 bg-transparent py-2.5 px-2 text-xs font-light text-primaryText placeholder:text-xs placeholder:font-light focus:outline-none"
            />
          </div>
          <button className="h-6 w-6 bg-primary flex justify-center items-center rounded-full">
            <PlusIcon edit="w-2.5 h-2.5 fill-primaryText" />
          </button>
        </div>
      )}
      <div className="flex h-full flex-col overflow-auto">
        {!channel
          ? dataChat
            ? dataChat.map((e, index) => {
                return (
                  <CardFriendMessage
                    data={dataChat[index]}
                    key={index}
                    setChatState={setChatState}
                    conversation={conversation}
                    setConversation={setConversation}
                  />
                );
              })
            : null
          : dataChannel
          ? dataChannel.map((e, index) => {
              return (
                <CardFriendMessage
                  data={dataChannel[index]}
                  key={index}
                  setChatState={setChatState}
                  conversation={conversation}
                  setConversation={setConversation}
                  channel={true}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}
