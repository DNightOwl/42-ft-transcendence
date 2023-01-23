import React from 'react'
import ViewDesktop from './NavigationDesktop/NavigationDesktop';
import ViewPhone from './NavigationPhone/NavigationPhone';
export default function Navigation() {
  return (
    <React.Fragment>
      <ViewDesktop />
      <ViewPhone />
    </React.Fragment>
  )
}
