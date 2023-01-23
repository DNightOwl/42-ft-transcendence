import React from 'react';
import logo from '../../../../assets/logo.svg';

export default function HeaderPhone() {
  return (
    <section className='flex justify-center items-center pt-7 lg:hidden'>
        <a href="/home">
            <img src={logo} alt="Pong logo" className='w-56' />
        </a>
    </section>
  )
}
