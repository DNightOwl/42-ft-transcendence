import React, { useEffect, useContext, useState } from 'react'
import GameSocketContext from '../contexts/gameSocket'
import Board from './Board';

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

  const [gameState, setGameState] = useState('waiting');

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
      console.log("game bdat", data);
      setGameState("started");
    });
  }, [])

  return (
    <main>
      <div className='w-4/5 flex flex-col gap-8'>
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
        <div className='rounded-lg overflow-hidden relative'>
          {gameState === 'waiting' &&
            <div className='absolute flex w-full h-full justify-center items-cenetr bg-black opacity-60 z-[100]'>
              <button className='px-4 bg-white text-black rounded-lg text-[4rem] cursor-pointer hover:bg-gray-200'
                onClick={handleStartGame}
              > Start! </button>
            </div>
          }
          <Board />
        </div>
      </div>
    </main>
  )
}

export default Game