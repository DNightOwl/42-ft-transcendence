
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Items/Navigation/Navigation";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Tfa from "./components/Tfa";
import { getConversations } from "./Helpers";

function App() {
  const [chatState,setChatState] = useState([]);
  const [conversation,setConversation] = useState<boolean>(false);
  const [modal,setModal] = useState(false);
  const [create,setCreate] = useState(false);
  const [add,setAdd] = useState(false);
  const [members,setMembers] = useState(false);
  const [click,setClick] = useState<boolean>(false);
  const [username,setUsername] = useState<string>("");


  
  const[dataChat,setDataChat] = useState([]);

  useEffect(()=>{
    getConversations((res:any)=>{
      setChatState(res.data[0]);
    })

  },[]);
  
  return (
    <BrowserRouter>
      <Navigation chatState={chatState} setChatState={setChatState} conversation = {conversation} setConversation={setConversation} modal={modal} setModal={setModal} create={create} setCreate={setCreate} members={members} setMembers={setMembers} click={click} setClick={setClick} add={click} setAdd={setClick}/>
        <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Login' element={<Login/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Messages' element={<Messages chatState={chatState} setChatState={setChatState} conversation={conversation} setConversation={setConversation} modal={modal} setModal={setModal} setCreate={setCreate} setMembers={setMembers} add={click} setAdd={setClick}/>}/>
          <Route path='/Profile' element={<Profile setModal={setModal} username={username} />}/>
          <Route path='/Tfa' element={<Tfa />}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;