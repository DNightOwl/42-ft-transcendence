import React from 'react';
import logo from '../../../../assets/logo.svg';
import { Link } from "react-router-dom";
export default function HeaderPhone() {
  return (
    <section className='flex justify-center items-center pt-7 lg:hidden'>
        <Link to="/">
            <img src={logo} alt="Pong logo" className='w-48' />
        </Link>
    </section>
  )
}