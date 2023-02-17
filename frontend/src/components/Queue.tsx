import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import GameSocketContext from '../contexts/gameSocket'
import { Modal, ModalBody, ModalHeader } from './Items/Modal';

function Queue() {
  const socket = useContext(GameSocketContext);
  const navigate = useNavigate();

  const leaveQueue = () => {
    socket.emit('leave_queue', {});
    navigate('/');
  }

  useEffect(() => {
    socket.emit('join_game', {
      gameMode: window.location.search.split('=')[1] || 'classic',
    })

    socket.on('matched', (data) => {
      navigate(`/game/${data}`)
    })

    return () => {
      socket.emit('leave_queue', {});
      socket.off('matched')
    }
  }, [])

  return (
    <main>
      <div className='flex flex-col items-center justify-center gap-4 pt-[6rem]'>
        <div className="lds-ripple"><div></div><div></div></div>
        <span className='text-white text-[2rem]'>Great things requires time!</span>
        <button
          className='bg-[#626262] text-white text-[1.5rem] px-4 py-2 rounded-md'
          onClick={leaveQueue}
        >Leave queue</button>
      </div>
    </main>
  )
}

export default Queue