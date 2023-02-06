
import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Items/Navigation/Navigation";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Login from "./components/Login";
import {dataChat} from './Data'

function App() {
  const [chatState,setChatState] = useState(dataChat[0]);
  const [conversation,setConversation] = useState<boolean>(false);
  const [modal,setModal] = useState(false);
  
  return (
    <HashRouter>
      <Navigation chatState={chatState} setChatState={setChatState} conversation = {conversation} setConversation={setConversation} modal={modal} setModal={setModal}/>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Messages' element={<Messages chatState={chatState} setChatState={setChatState} conversation={conversation} setConversation={setConversation} modal={modal} setModal={setModal}/>} />
          <Route path='/Profile' element={<Profile/>} />
        </Routes>
    </HashRouter>
  );
}

export default App;