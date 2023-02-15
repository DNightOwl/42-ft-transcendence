
import { useState } from 'react';
import { validationQr, refreshToken } from '../Helpers';
export default function Tfa(){

    const [code,setCode] = useState("");

    document.title = "Pong - 2FA";
    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <div className='w-80 flex flex-col gap-8'>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="Code" className="text-sm text-primaryText">
                    Code
                </label>
            <input
              type="text"
              className={`placeholder-secondary-text rounded-md bg-shape p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light `}
              placeholder="Enter code"
            />
          </div>
          <button className="w-full rounded-md bg-primary p-2 text-sm text-primaryText">
              Confirm
            </button>
            </div>
            {/* <form action="http://localhost:3001/Home">
            <input type="text" value={code} onChange={(e)=>{
                setCode(e.currentTarget.value);
            }} className ="placeholder-secondary-text rounded-md bg-shape p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light" />
            <button type='submit' onClick={(e)=>{
                e.preventDefault();
                validationQr((res:any)=>{
                    if(res.data !== "invalid")
                    {
                        refreshToken();
                        window.location.href = "http://localhost:3001/Home"
                    }
                },code)
            }}>Conferm</button>
        </form> */}
        </div>
    )
}