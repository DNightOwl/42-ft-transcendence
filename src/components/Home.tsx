import React, { useEffect } from 'react';
import fire from '../assets/fire.png';

export default function Home() {
  useEffect(()=>{
    document.title = "Pong - Home";
  });
  
  return (
    <main className='flex flex-col gap-5 2xl:container 2xl:mx-auto 2xl:bg-slate-400'>
        <h1 className='text-primaryText text-2xl flex items-center gap-1.5'><span>Live Games</span><img src={fire} alt="fire"  className='w-4'/></h1>
        <section className='flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start'>
          <button className='w-full h-96 bg-shape rounded-xl lg:flex-1 lg:h-full'></button>
          <div className='flex gap-4 lg:flex-col'>
            <button className='w-72 h-48 bg-shape rounded-xl border-4 border-primary'></button>
            <button className='w-72 h-48 bg-shape rounded-xl'></button>
          </div>
        </section>
    </main>
  )
}