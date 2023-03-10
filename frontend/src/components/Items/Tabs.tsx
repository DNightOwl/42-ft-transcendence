import React from 'react'
import { useEffect} from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element | JSX.Element[] | string,
  edit?:string
  id?:string
};

let tabPosition = 0;

export function Tabs({children,edit}:Props) {
  const location = useLocation();
  useEffect(()=>{
    if(location.pathname.toLocaleLowerCase() !== "/Messages".toLocaleLowerCase())
      tabPosition = 0;

    let btnSwitcher = document.querySelectorAll(".btn-switcher");
    let sideContent = document.querySelectorAll(".side-content")

    btnSwitcher[tabPosition].classList.add("tab-active");
    if(sideContent[tabPosition])
      sideContent[tabPosition].classList.remove("hidden");

      let find = false;
      let count:number = 0;
        btnSwitcher.forEach((element)=>{
          if(element.innerHTML === btnSwitcher[tabPosition].innerHTML)
          {
            if(++count === 2)
            {
              find = true;
              return;
            }
          }
        })
        if(find)
        {
          if(tabPosition >= btnSwitcher.length / 2)
          {
            if(btnSwitcher[tabPosition - (btnSwitcher.length / 2)])
              btnSwitcher[tabPosition - (btnSwitcher.length / 2)].classList.add("tab-active");
            if(sideContent[tabPosition - (btnSwitcher.length / 2)])
              sideContent[tabPosition - (btnSwitcher.length / 2)].classList.remove("hidden");
          }
          else
          {
            if(btnSwitcher[tabPosition + (btnSwitcher.length / 2)])
              btnSwitcher[tabPosition + (btnSwitcher.length / 2)].classList.add("tab-active");
            if(sideContent[tabPosition + (btnSwitcher.length / 2)])
            sideContent[tabPosition + (btnSwitcher.length / 2)].classList.remove("hidden");
          }
        }
        
  },[location.pathname])
  return (
    <div className={`flex flex-col gap-6 h-full lg:overflow-hidden ${edit}`}>
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

  export function Tab({children,id}:Props) {
  const location = useLocation();
    return (
      <button className="btn-switcher" id={id}
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
          tabPosition = index;
          if(sideContent[index])
            sideContent[index].classList.remove("hidden");
          if(location.pathname.toLocaleLowerCase() !== "/Messages".toLocaleLowerCase())
            tabPosition = 0;
            
          return;
        }
        })
        if(find)
          return;
      })
      find = false;
      let count:number = 0;
        btnSwitcher.forEach((element)=>{
          if(element.innerHTML === e.currentTarget.innerHTML)
          {
            if(++count === 2)
            {
              find = true;
              return;
            }
          }
        })
        if(find)
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
        }
    }}>
      {children}
      </button>
    )
  }

  export function TabsPanels({children,edit}:Props) {
    return <div className={`h-full overflow-hidden ${edit}`}>{children}</div>
  }

  export function TabContent({children,edit}:Props) {
    return (
      <div className={`hidden h-full overflow-hidden side-content ${edit}`}>
          {children}
      </div>
    )
  }