import React, { useEffect, useContext, useState } from 'react'
import GameSocketContext from '../contexts/gameSocket'
import Board from './Board';
import { Modal, ModalBody, ModalHeader } from './Items/Modal';
import { useNavigate } from 'react-router-dom';

interface ResultBoard {
  player1: string;
  player2: string;
  player1Score: number;
  player2Score: number;
  player1Avatar: string;
  player2Avatar: string;
  gameMode: string;
}

function Game() {
  const socket = useContext(GameSocketContext);
  const gameId = window.location.pathname.split('/')[2];
  const [resultBoard, setResultBoard] = useState<ResultBoard>(
    {
      player1: '',
      player2: '',
      player1Score: 0,
      player2Score: 0,
      player1Avatar: '',
      player2Avatar: '',
      gameMode: 'classic',
    }
  );
  const [modal, setModal] = useState(false);
  const [gameState, setGameState] = useState('waiting');
  const navigate = useNavigate();

  const toggleModal = (prev: boolean) => {
    if (prev) {
      navigate('/');
    }
    setModal(!prev);
  }

  const handleStartGame = () => {
    socket.emit('start_game', {
      gameId: window.location.pathname.split('/')[2],
    });
  }

  useEffect(() => {
    socket.emit('game_data', {
      gameId: window.location.pathname.split('/')[2],
    });

    socket.on('game_data', (data: ResultBoard) => {
      console.log("game data", data);
      setResultBoard(data);
    });

    socket.on('goal_score', (data: any) => {
      console.log("upadte", data);
      setResultBoard((prev) => {
        return {
          ...prev,
          player1Score: data.player1Score,
          player2Score: data.player2Score,
        }
      });
    });

    socket.on('game_started', (data: string) => {
      setGameState("started");
    });

    socket.on('game_over', (data: any) => {
      console.log("game over", data);
      setModal(true);
    });

    return () => {
      socket.off('game_started');
      socket.emit('player_left', {
        gameId,
      });
      console.log("unmount", gameId);
    }
  }, [])

  return (
    <div className='pl-[24rem] mt-16'>
      {modal &&
        <Modal>
          <ModalHeader
            onClose={() => toggleModal(modal)}
          >
            <h1 className='text-[2rem] text-white'>Game Over</h1>
          </ModalHeader>
          <ModalBody>
            <div className='flex flex-col justify-center items-center gap-4 w-[700px] h-[300px]'>
              <h3 className='text-[4rem] text-white'>
                <span className='text-purple-600 capitalize' >
                  {resultBoard.player1 > resultBoard.player2 ? `${resultBoard.player1}` : `${resultBoard.player2}`}
                </span> won!
              </h3>
              <button onClick={
                () => {
                  toggleModal(modal);
                  navigate('/queue?mode=classic')
                }
              } className='px-4 py-2 bg-purple-400 rounded-lg text-[1.5rem] cursor-pointer hover:bg-purple-800 text-white transition-all ease-in-out'>
                Play Again
              </button>
            </div>
          </ModalBody>
        </Modal>
      }
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col gap-8'>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex flex-row text-white gap-4 items-center' >
              <img src={resultBoard.player1Avatar} alt={resultBoard.player1}
                className='w-[120px] h-[120px] rounded-full' />
              <div className='flex flex-col'>
                <h4 className='text-[1.5rem]'>
                  {resultBoard.player1}
                </h4>
                <h3 className='text-[4rem] -mt-4'>
                  {resultBoard.player1Score}
                </h3>
              </div>
            </div>
            <h4 className='text-white text-[2rem]'>
              {resultBoard.gameMode}
            </h4>
            <div className='flex flex-row text-white gap-4 items-center' >
              <div className='flex flex-col items-end'>
                <h4 className='text-[1.5rem]'>
                  {resultBoard.player2}
                </h4>
                <h3 className='text-[4rem] -mt-4'>
                  {resultBoard.player2Score}
                </h3>
              </div>
              <img src={resultBoard.player2Avatar} alt={resultBoard.player2}
                className='w-[120px] h-[120px] rounded-full' />
            </div>
          </div>
          <div className='rounded-lg overflow-hidden relative '>
            {gameState === 'waiting' &&
              <div className='absolute flex flex-col w-full h-full justify-center items-cenetr bg-black opacity-60 z-[100]'>
                <button className='px-4 bg-white text-black rounded-lg text-[4rem] cursor-pointer hover:bg-gray-200 w-[40%] m-auto'
                  onClick={handleStartGame}
                > Start! </button>
              </div>
            }
            <Board />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game