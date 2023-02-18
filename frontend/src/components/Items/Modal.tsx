import React from "react";
import { CloseIcon } from "./Icons";

interface Props {
    children: JSX.Element | JSX.Element[] | string,
    edit?: string
    settings?: React.Dispatch<React.SetStateAction<boolean>>
    create?: React.Dispatch<React.SetStateAction<boolean>>
    setMembers?: React.Dispatch<React.SetStateAction<boolean>>
    setPassChannel?: React.Dispatch<React.SetStateAction<boolean>>
    setAdd?:React.Dispatch<React.SetStateAction<boolean>>
    onClose?: () => void
};


    
  export function Modal({children,edit,setPassChannel}:Props){
    return(
        <div className="absolute left-0 top-0 flex justify-center items-center lg:items-start bg-black/30 w-full h-full backdrop-blur-sm" style={{"zIndex":"999"}}>
            <div className={`bg-shape mt-0 lg:mt-8 rounded-lg flex flex-col pt-4 px-4 ${edit}`}>
                {children}
            </div>
        </div>
    )
}

export function ModalHeader({ children, settings, create, edit, setMembers, onClose,setAdd,setPassChannel }: Props) {
    return (
        <div className={`flex items-center w-full justify-between border-secondaryText pb-5 ${edit}`} style={{ "borderBottom": "1px solid #81879C" }}>
            <div className="text-primaryText text-xl font-light">{children}</div>
            <button className="w-4 h-4 rounded-full" onClick={() => {
                if (settings) 
                {
                    settings(false)
                    document.body.style.overflow = "auto";
                }
                if (create) {
                    create(false)
                    document.body.style.overflow = "auto";
                }
                if (setMembers) {
                    setMembers(false);
                    document.body.style.overflow = "auto";
                }
                if (onClose) {
                    onClose();
                    document.body.style.overflow = "auto";
                }

                if(setAdd)
                {
                    setAdd(false);
                    document.body.style.overflow="auto";
                
                }
                
                if(setPassChannel)
                {
                    setPassChannel(false);
                    document.body.style.overflow="auto";
                
                }

}}>
<CloseIcon edit="w-full h-full fill-secondaryText"/>
        

            </button>



        </div>
    )
}

export function ModalBody({ children, edit }: Props) {
    return (
        <div className={`flex h-full ${edit}`}>{children}</div>
    )
}