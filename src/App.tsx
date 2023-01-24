
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Items/Navigation/Navigation";
import Home from "./components/Home";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Preloader from "./components/Items/Preloader";
function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Messages' element={<Messages/>} />
        <Route path='/Profile' element={<Profile/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
