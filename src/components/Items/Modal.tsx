import React from "react";
import { CloseIcon } from "./Icons";

interface Props {
    children: JSX.Element | JSX.Element[] | string,
    edit?:string
    settings?:React.Dispatch<React.SetStateAction<boolean>>

  
  };

  export function Modal({children,edit}:Props){
    return(
        <div className="absolute left-0 top-0 flex justify-center items-center lg:items-start bg-black/30 w-full h-full backdrop-blur-sm" style={{"zIndex":"999"}}>
            <div className={`bg-shape mt-0 lg:mt-8 rounded-lg flex flex-col pt-4 px-4 ${edit}`}>
                {children}
            </div>
        </div>
    )
}

export function ModalHeader({children,settings}:Props){
    return(
        <div className="flex items-center w-full justify-between border-secondaryText pb-5" style={{"borderBottom":"1px solid #81879C"}}>
            <div className="text-primaryText text-xl font-light">{children}</div>            
            <button className="w-4 h-4 rounded-full" onClick={()=>{
                if(settings)
                {
                    settings(false)
                    document.body.style.overflow="auto";
                }
                }}>
                <CloseIcon edit="w-full h-full fill-secondaryText"/>
            </button>        
        </div>
    )
}

export function ModalBody({children}:Props){
    return(
        <div className="flex justify-center h-full">{children}</div>
    )
}