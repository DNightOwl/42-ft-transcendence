import React from 'react'
import logo from '../assets/logo.svg'

export default function Header() {
  return (
    <section>
        <a href='home.html'>
            <img src={logo} alt="Pong logo" />
        </a>
    </section>
  )
}
