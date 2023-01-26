import React from 'react'
import { useState,Children } from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | string,

};

let activeTab:any;
let result:any;

export function Tabs({children}:Props) {
  return (
    <div>
        {children}
    </div>
  )
}

export function TabsList({children}:Props) {
  result = Children.toArray(children);
    return (
      <div>
          {children}
      </div>
    )
  }

  export function Tab({children}:Props) {
    return (
      <button onClick={()=>{
        const arrayChilds:any = Children.toArray(children);

        result.forEach((element:any,index:number) => {
          if(element.props.children + index === arrayChilds[0] + index)
            {
              activeTab(index);
              return;
            }
        });
      }}>
          {children}
      </button>
    )
  }

  export function TabsPanels({children}:Props) {
    const [state,setState] = useState<number>(0);
    activeTab = setState;
    const arrayChilds = Children.toArray(children);
    return <div>{arrayChilds[state]}</div>
  }

  export function TabContent({children}:Props) {
    return (
      <div>
          {children}
      </div>
    )
  }