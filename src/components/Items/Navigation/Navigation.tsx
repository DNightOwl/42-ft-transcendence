import React from 'react'
import NavigationDesktop from './NavigationDesktop/NavigationDesktop';
import NavigationPhone from './NavigationPhone/NavigationPhone';

interface typeprops{
  chatState: any,
  setChatState:React.Dispatch<React.SetStateAction<any>>
}

export default function Navigation({chatState,setChatState}:typeprops) {
  return (
    <React.Fragment>
      <NavigationDesktop chatState={chatState} setChatState={setChatState} />
      <NavigationPhone />
    </React.Fragment>
  )
}
