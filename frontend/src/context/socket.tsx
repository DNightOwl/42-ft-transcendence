/////////////////////////////////laafilal
import React from 'react'
import io from 'socket.io-client'

const domain : string | undefined = process.env.REACT_APP_DOMAIN;

export const socket  = io("http://"+domain+":3000", {
  //autoConnect : false,
  withCredentials: true,
});

export const SocketContext = React.createContext(socket);
