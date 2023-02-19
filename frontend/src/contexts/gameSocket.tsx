import { createContext } from 'react';
import socketIOClient from 'socket.io-client';

const domain : string | undefined = process.env.REACT_APP_DOMAIN;
const socket = socketIOClient(`${domain}:3000/game`, {
	transports: ['websocket'],
	withCredentials: true,
});

const GameSocketContext = createContext(socket);

export default GameSocketContext;