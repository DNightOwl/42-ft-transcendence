import React ,{useState} from "react";
import { EditAvatarIcon } from "./Icons";

export default function SettingsBody(){
    const[value,setValue] = useState<string>("mouassit")
    const[switchBtn,setSwitchBtn] = useState<boolean>(false)
    const[picture,setPicture] = useState<string>("https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg")
    return (
        <div className="flex flex-col justify-between py-6">
            <div>
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                    <div className="flex flex-col items-center gap-3">
                        <img src={picture} alt="User" className="w-24 h-24 rounded-full" />
                        <button className="bg-primary text-primaryText text-sm p-2 w-28 flex justify-center items-center gap-1 rounded-md" onClick={()=>{
                            let inputFile = document.getElementById("file");
                            inputFile?.click();
                        }}>
                            <EditAvatarIcon edit="w-5 h-5 fill-primaryText" />
                            <span>Avatar</span>
                            <input type="file" id="file" className="hidden" onChange={(e)=>{
                                if(e.target.files?.length)
                                {
                                    let extention = e.target.files[0].name.split('.').pop()
                                    console.log(extention);
                                    
                                    if(extention === "png" || extention === "PNG" || extention === "jpeg" || extention === "JPEG" || extention === "jpg" || extention === "JPG")
                                        setPicture(URL.createObjectURL(e.target.files[0]));
                                }
                            }}/>
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 justify-start">
                        <div className="flex flex-col gap-1.5 w-full lg:w-64">
                            <label htmlFor="Username" className="text-sm text-primaryText">Username</label>
                            <input type="text" className="bg-body p-3 rounded-md text-xs text-primaryText outline-none placeholder-secondary-text placeholder:text-xs placeholder:font-light" placeholder="Enter username" value={value} onChange={(e)=>{
                                setValue(e.currentTarget.value);
                            }} />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-primaryText"><span>{switchBtn?"Disable":"Enable"}</span> 2FA</span>
                            <button className={`w-12 h-7 px-1 flex ${switchBtn?'justify-end bg-primary':'justify-start bg-body'} items-center rounded-full`} onClick={()=>{
                                (switchBtn)?setSwitchBtn(false):setSwitchBtn(true)                    
                            }}>
                                <span className="w-5 h-5 rounded-full bg-primaryText"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end gap-3 w-full">
                <button className="bg-shape shadow text-sm p-2 rounded-md text-primaryText w-32">Cancel</button>
                <button className="bg-primary text-sm p-2 rounded-md text-primaryText w-32">Save</button>
            </div> 
        </div>
    )
}