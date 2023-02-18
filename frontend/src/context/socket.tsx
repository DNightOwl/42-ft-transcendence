/////////////////////////////////laafilal
import React from 'react'
import io from 'socket.io-client'

export const socket  = io("http://localhost:3000", {
  autoConnect : true,
  withCredentials: true,
});

export const SocketContext = React.createContext(socket);
