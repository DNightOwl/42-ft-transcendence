import React from 'react'
import SideNav from './SideNav';
import NavigationDesktop from './SideNav';
import ViewPhone from './ViewPhone';
export default function Navigation() {
  return (
    <React.Fragment>
      <SideNav />
      <ViewPhone />
    </React.Fragment>
  )
}
