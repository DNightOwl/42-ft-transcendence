import React, { useEffect, useRef } from 'react';
import fire from '../assets/fire.png';
import { checkToken } from '../Helpers';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import GameSocketContext from '../contexts/gameSocket';


interface LiveGame {
  gameId: string;
  player1: string;
  player2: string;
  player1Avatar: string;
  player2Avatar: string;
  gameMode: string;
}


export default function Home() {
  checkToken();
  
  
  const scroll = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<LiveGame[]>([]);

  const socket = React.useContext(GameSocketContext);
  useEffect(() => {
    document.title = "Pong - Home";
    if (scroll.current) {
      let hasVerticalScrollbar = scroll.current.scrollHeight > scroll.current.clientHeight;
      if (hasVerticalScrollbar)
        scroll.current.classList.add("lg:pr-6")
    }

  }, []);

  useEffect(() => {
    socket.emit('live_games', {});
    socket.on('live_games', (data: LiveGame[]) => {
      setData(data);
    });
  }, []);


  
  return (
    <main>
      <div className='flex flex-col gap-5 w-full h-full'>
        <h1 className='text-primaryText text-2xl flex items-center gap-1.5'><span>Live Games</span><img src={fire} alt="fire" className='w-4' /></h1>
        <section className='flex flex-col gap-6 lg:flex-row lg:items-start'>
          {/* <button className='w-full h-96 bg-shape rounded-xl lg:flex-1 primary-live'></button>
          <div className='flex gap-4 lg:flex-col live-list overflow-auto lg:overflow-x-hidden pb-6 lg:pb-0' ref={scroll}>
            <button className='w-72 h-48 bg-shape rounded-xl border-4 border-primary flex-shrink-0'></button>
            <button className='w-72 h-48 bg-shape rounded-xl flex-shrink-0'></button>
            <button className='w-72 h-48 bg-shape rounded-xl flex-shrink-0'></button>
          </div> */}
          {data.length && data.map((game, index) => {
            return (
              <Link
                key={index}
                to={`/watch/${game.gameId}`}
                className=' bg-shape rounded-xl lg:flex-1'
              >
                {game.player1}{' '} vs {' '}{game.player2}
              </Link>
            )
          })
          }
        </section>
      </div>
    </main>
  )
}