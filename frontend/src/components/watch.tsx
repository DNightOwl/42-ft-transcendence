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

function Watch() {
  const socket = useContext(GameSocketContext);
  const [winner, setWinner] = useState("");
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
  const navigate = useNavigate();

  const toggleModal = (prev: boolean) => {
    if (prev) {
      navigate('/');
    }
    setModal(!prev);
  }

  useEffect(() => {
    socket.emit('watch', {
      gameId: window.location.pathname.split('/')[2],
    });

    socket.emit('game_data', {
      gameId: window.location.pathname.split('/')[2],
    });

    socket.on('game_data', (data: ResultBoard) => {
      setResultBoard(data);
    });

    socket.on('goal_score', (data: any) => {
      setResultBoard((prev) => {
        return {
          ...prev,
          player1Score: data.player1Score,
          player2Score: data.player2Score,
        }
      });
    });

    socket.on('game_over', (data: any) => {
      setWinner(data.winner);
      setModal(true);
    });
  }, [])

  return (
    <div className='pl-[26rem] mt-16'>
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
                  {winner}
                </span> won!
              </h3>
              {window.location.pathname === 'game' &&
                <button onClick={
                  () => {
                    toggleModal(modal);
                    navigate('/queue?mode=classic')
                  }
                } className='px-4 py-2 bg-purple-400 rounded-lg text-[1.5rem] cursor-pointer hover:bg-purple-800 text-white transition-all ease-in-out'>
                  Play Again
                </button>
              }
            </div>
          </ModalBody>
        </Modal>
      }
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
        <div className='rounded-lg overflow-hidden'>
          <Board />
        </div>
      </div>
    </div>
  )
}

export default Watch