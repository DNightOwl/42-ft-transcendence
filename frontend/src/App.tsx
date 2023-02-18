import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navigation from "./components/Items/Navigation/Navigation";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { getConversations } from "./Helpers";
import Queue from './components/Queue';
import Game from './components/game';
import Watch from "./components/watch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GameInvitation from "./components/Items/gameInvitation";
import GameSocketContext from "./contexts/gameSocket";


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
    <>
      <BrowserRouter>
        <Navigation chatState={chatState} setChatState={setChatState} conversation={conversation} setConversation={setConversation} modal={modal} setModal={setModal} create={create} setCreate={setCreate} members={members} setMembers={setMembers} click={click} setClick={setClick} />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/game/*' element={<Game />} />
          <Route path='/watch/*' element={<Watch />} />
          <Route path='/queue' element={<Queue />} />
          <Route path='/Messages' element={<Messages chatState={chatState} setChatState={setChatState} conversation={conversation} setConversation={setConversation} modal={modal} setModal={setModal} setCreate={setCreate} setMembers={setMembers} />} />
          <Route path='/Profile' element={<Profile setModal={setModal} username={username} />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}


export default App;