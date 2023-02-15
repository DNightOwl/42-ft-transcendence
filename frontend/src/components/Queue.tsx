import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import GameSocketContext from '../contexts/gameSocket'

function Queue() {
  const socket = useContext(GameSocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('join_game', {})

    socket.on('matched', (data) => {
      navigate(`/game/${data}`)
    })
  }, [])

  return (
    <main>
      <div className='flex flex-col items-center justify-center gap-4 pt-[6rem]'>
        <div className="lds-ripple"><div></div><div></div></div>
        <span className='text-white text-[2rem]'>Great things requires time!</span>
      </div>
    </main>
  )
}

export default Queue