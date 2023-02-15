
import { useState } from 'react';
import { validationQr, refreshToken } from '../Helpers';
export default function Tfa(){

    const [code,setCode] = useState("");

    document.title = "Pong - 2FA";
    return (
        <form action="http://localhost:3001/Home">
            <input type="text" value={code} onChange={(e)=>{
                setCode(e.currentTarget.value);
            }} />
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
        </form>
    )
}