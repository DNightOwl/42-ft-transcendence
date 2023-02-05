import React from "react";
import { CloseIcon } from "./Icons";

interface Props {
    children: JSX.Element | JSX.Element[] | string,
    edit?:string
    width?:string
    height?:string
  
  };

  export function Modal({children,width,height}:Props){
    let size={"width":width,"height":height}
    return(
        <div className="absolute left-0 top-0 flex justify-center bg-black/30 w-full h-full backdrop-blur-sm">
            <div className="bg-shape mt-8 rounded-lg flex flex-col p-4" style={size}>
                {children}
            </div>
        </div>
    )
}

export function ModalHeader({children}:Props){
    return(
        <div className="flex items-center w-full justify-between border-secondaryText pb-5" style={{"borderBottom":"1px solid #81879C"}}>
            <div className="text-primaryText text-xl font-light">{children}</div>            
            <button className="w-4 h-4 rounded-full">
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