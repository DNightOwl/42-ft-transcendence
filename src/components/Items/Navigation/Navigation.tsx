import React from 'react'
import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationPhone from './NavigationPhone/NavigationPhone';
export default function Navigation() {
  return (
    <React.Fragment>
      <NavigationDesktop />
      <NavigationPhone />
    </React.Fragment>
  )
}
