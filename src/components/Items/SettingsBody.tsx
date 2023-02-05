import React from "react";
import { EditAvatarIcon } from "./Icons";

export default function SettingsBody(){
    return (
        <div className="flex items-center">
            <div className="flex items-center gap-12 ">
                <div className="flex flex-col items-center gap-3">
                    <img src="https://cdn.intra.42.fr/users/2cc53519ab737304bcdd74e4125c3e61/mouassit.jpg" alt="User" className="w-24 h-24 rounded-full" />
                    <button className="bg-primary text-primaryText text-sm p-2 w-28 flex justify-center items-center gap-1 rounded-md">
                        <EditAvatarIcon edit="w-5 h-5 fill-primaryText" />
                        <span>Avatar</span>
                    </button>
                </div>
                <div className="flex flex-col gap-2 justify-start">
                    <div className="flex flex-col gap-1.5 w-64">
                        <label htmlFor="Username" className="text-sm text-primaryText">Username</label>
                        <input type="text" className="bg-body p-3 rounded-md text-xs text-primaryText outline-none" value={"mouassit"} />
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-primaryText">Enable 2FA</span>
                        <button className="w-8 h-8 bg-body">
                            <span className="w-10 h-10  bg-body"></span>
                        </button>
                    </div>
                    {/* <div className="flex items-center gap-3">
                        <button className="bg-shape shadow text-sm p-2 rounded-md text-primaryText flex-1">Cancel</button>
                        <button className="bg-primary text-sm p-2 rounded-md text-primaryText flex-1">Save</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}