import React from 'react'
import { useState,useEffect,Children } from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | string,

};

let activeTab:React.Dispatch<React.SetStateAction<number>>;
let result:any;

export function Tabs({children}:Props) {
  return (
    <div className='flex flex-col gap-6'>
        {children}
    </div>
  )
}

export function TabsList({children}:Props) {
  result = Children.toArray(children);
    return (
      <div className='text-sm flex items-center px-2'>
          {children}
      </div>
    )
  }

  export function Tab({children}:Props) {
    useEffect(()=>{
      let btnSwitcher = document.querySelectorAll(".btn-switcher");
      btnSwitcher[0].classList.add("tab-active");
    },[])
    
    return (
      <button className="btn-switcher"
      onClick={(e)=>{
        const arrayChilds:any = Children.toArray(children);
        let btnSwitcher = document.querySelectorAll(".btn-switcher");
        btnSwitcher.forEach(e=>{
          e.classList.remove("tab-active");
        })
        e.currentTarget.classList.add("tab-active");
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