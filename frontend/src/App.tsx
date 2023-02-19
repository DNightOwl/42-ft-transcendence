import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navigation from "./components/Items/Navigation/Navigation";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Tfa from "./components/Tfa";
import { getConversations } from "./Helpers";

import Queue from './components/Queue';
import Game from './components/game';
import Watch from "./components/watch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameInvitation from "./components/Items/gameInvitation";
import GameSocketContext from "./contexts/gameSocket";
import ProfileUser from "./components/ProfileUser"
import FriendProfile from "./components/FriendProfile";
import AddFriend from "./components/AddFriend";
import Block from "././components/Block"



function App() {
  const [chatState, setChatState] = useState([]);
  const [conversation, setConversation] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [create, setCreate] = useState(false);
  const [members, setMembers] = useState(false);
  const [click, setClick] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const socket = React.useContext(GameSocketContext);
  const [dataChat, setDataChat] = useState([]);
  const [nickname,setNickname] = useState<string>("");
  const [pictureUser,setPictureUser] = useState<string>("");
 
  const [add,setAdd] = useState(false);

  const [passChannel,setPassChannel] = useState(false);
  
  const handleDecline = (Id: string) => {
    socket.emit("decline_game", { senderId: Id });
  }

  useEffect(() => {
    socket.off("game_invitation").on("game_invitation", (data: any) => {
      toast(<GameInvitation
        sender={data.sender}
        senderId={data.senderId}
        senderAvatar={data.senderAvatar}
      />, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
        onClose: () => handleDecline(data.senderId),
      },
      );
    })
  }, []);

  useEffect(() => {
    getConversations((res: any) => {
      setChatState(res.data[0]);
    })
  }, []);

  return (
   
      <BrowserRouter>
      <Navigation chatState={chatState} setChatState={setChatState} conversation = {conversation} setConversation={setConversation} modal={modal} setModal={setModal} create={create} setCreate={setCreate} members={members} setMembers={setMembers} click={click} setClick={setClick} add={add} setAdd={setAdd} passChannel={passChannel} setPassChannel={setPassChannel} username={nickname} setUsername={setNickname} pictureUser={pictureUser} setPictureUser={setPictureUser}/>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/game/*' element={<Game />} />
          <Route path='/watch/*' element={<Watch />} />
          <Route path='/queue' element={<Queue />} />
          <Route path='/Messages' element={<Messages chatState={chatState} setChatState={setChatState} conversation={conversation} setConversation={setConversation} modal={modal} setModal={setModal} setCreate={setCreate} setMembers={setMembers} add={add} setAdd={setAdd} passChannel={passChannel} setPassChannel={setPassChannel} username={nickname} setUsername={setNickname} pictureUser={pictureUser} setPictureUser={setPictureUser}/>} />
          <Route path='/Profile' element={<Profile setModal={setModal}  username={nickname} pictureUser={pictureUser}/>} />
          <Route path='/ProfileUser' element={<ProfileUser />}/>
          <Route path='/Tfa' element={<Tfa />}/>
          <Route path='/FriendProfile' element={<FriendProfile />}/>
          <Route path='/AddFriend' element={<AddFriend />}/>
          <Route path='/Block' element={<Block />}/>


        </Routes>
        <ToastContainer />
      </BrowserRouter>
  );
}


export default App;