import { createContext } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient(`localhost:3000/game`, {
	transports: ['websocket'],
	withCredentials: true,
});

const GameSocketContext = createContext(socket);

export default GameSocketContext;