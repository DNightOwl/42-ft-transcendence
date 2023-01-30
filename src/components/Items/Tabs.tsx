import React from 'react'
import { useEffect} from 'react';

interface Props {
  children: JSX.Element | JSX.Element[] | string,

};

export function Tabs({children}:Props) {
  useEffect(()=>{
    let btnSwitcher = document.querySelectorAll(".btn-switcher");
    let sideContent = document.querySelectorAll(".side-content")
    
    btnSwitcher[0].classList.add("tab-active");
    if(sideContent[0])
      sideContent[0].classList.remove("hidden");
    btnSwitcher.forEach((e,index)=>{
      if(index > 0 && e.innerHTML === btnSwitcher[0].innerHTML)
      {
        if(btnSwitcher[btnSwitcher.length / 2])
        btnSwitcher[btnSwitcher.length / 2].classList.add("tab-active");
      if(sideContent[btnSwitcher.length / 2])
        sideContent[btnSwitcher.length / 2].classList.remove("hidden");
      }
    })
    
  },[])
  return (
    <div className='flex flex-col gap-6 h-full lg:overflow-hidden'>
        {children}
    </div>
  )
}

export function TabsList({children}:Props) {
    return (
      <div className='text-sm flex items-center px-2'>
          {children}
      </div>
    )
  }

  export function Tab({children}:Props) {
    return (
      <button className="btn-switcher"
      onClick={(e)=>{
        let btnSwitcher = document.querySelectorAll(".btn-switcher");
        let sideContent = document.querySelectorAll(".side-content");

        btnSwitcher.forEach((e,index)=>{
          e.classList.remove("tab-active");
          if(sideContent[index])
            sideContent[index].classList.add("hidden");
        })
        e.currentTarget.classList.add("tab-active");

        let find:boolean = false;
        let temp:number = 0;
        btnSwitcher.forEach((e,index)=>{
        e.classList.forEach((element)=>{
        if(element === "tab-active")
        {
          find = true;
          temp = index;
          if(sideContent[index])
            sideContent[index].classList.remove("hidden");
          return;
        }
        })
        if(find)
          return;
      })


        btnSwitcher.forEach(elemet=>{
          if(elemet.innerHTML === e.currentTarget.innerHTML)
          {
            if(temp >= btnSwitcher.length / 2)
            {
              if(btnSwitcher[temp - (btnSwitcher.length / 2)])
                btnSwitcher[temp - (btnSwitcher.length / 2)].classList.add("tab-active");
              if(sideContent[temp - (btnSwitcher.length / 2)])
                sideContent[temp - (btnSwitcher.length / 2)].classList.remove("hidden");
            }
            else
            {
              if(btnSwitcher[temp + (btnSwitcher.length / 2)])
                btnSwitcher[temp + (btnSwitcher.length / 2)].classList.add("tab-active");
              if(sideContent[temp + (btnSwitcher.length / 2)])
              sideContent[temp + (btnSwitcher.length / 2)].classList.remove("hidden");
            }
            return ;
          }
        })
    }}>
      {children}
      </button>
    )
  }

  export function TabsPanels({children}:Props) {
    return <div className='h-full overflow-hidden'>{children}</div>
  }

  export function TabContent({children}:Props) {
    return (
      <div className='hidden h-full overflow-hidden side-content'>
          {children}
      </div>
    )
  }