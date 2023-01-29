
import React, { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Items/Navigation/Navigation";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import {dataChat} from './Data'

function App() {
  console.log(dataChat);
  const [chatState,setChatState] = useState(dataChat[0]);
  
  return (
    <HashRouter>
      <Navigation chatState={chatState} setChatState={setChatState}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Messages' element={<Messages chatState={chatState}/>} />
          <Route path='/Profile' element={<Profile/>} />
        </Routes>
    </HashRouter>
  );
}

export default App;
