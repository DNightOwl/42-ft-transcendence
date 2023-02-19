
import { useState } from 'react';
import { validationQr, refreshToken } from '../Helpers';
import { KeyIcon,ExclamationIcon } from './Items/Icons';
export default function Tfa(){
    const domain : string | undefined = process.env.REACT_APP_DOMAIN;

    const [code,setCode] = useState("");
    const [error,setError] = useState<boolean>(false);
    const [errorMessage,setErrorMessage] = useState("");

    document.title = "Pong - 2FA";
    return (
        <div className='h-full flex flex-col justify-center items-center'>
            <form className='flex flex-col justify-center items-center gap-16'>
            <KeyIcon edit='w-28 h-28 fill-primary relative right-4'/>
            <div className='w-80 flex flex-col gap-5'>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="Code" className="text-sm text-primaryText">
                    Code
                </label>
            <input
              type="text"
              className={`placeholder-secondary-text rounded-md bg-shape p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light  ${error?'error-input':''}`}
              placeholder="Enter 2FA code"
              value={code}
              onChange={(e)=>{
                setCode(e.currentTarget.value)
                setError(false);
              }}
            />
                        {
              (error)?(
                <div className="text-error text-xs font-medium fill-error flex gap-1.5">
                  <ExclamationIcon edit="w-3 h-3 relative top-0.5"/>
                  <span>{errorMessage}</span>
                </div>
              ):null
            }
          </div>
          <button type='submit' className="w-full rounded-md bg-primary p-2 text-sm text-primaryText" onClick={(e)=>{
                          e.preventDefault();
                          let error = false;

                          if(!code.length)
                          {
                            error = true;
                            setErrorMessage("Zone text empty");
                            setError(true);
                          }
            
                         else if(!/^[0-9]+$/.test(code))
                          {
                            error = true;
                            setErrorMessage("Digit only")
                            setError(true);
                          }
            
                          else if(code.length > 6)
                          {
                            error = true;
                            setErrorMessage("Maximum 6 digit")
                            setError(true);
                          }
            
                          else if(code.length < 6)
                          {
                            error = true;
                            setErrorMessage("Minimum 6 digit")
                            setError(true);
                          }
                          
                          if(!error)
                          {
                            validationQr((res:any)=>{
                                if(res.data === "valid")
                                {
                                    refreshToken();
                                    window.location.href = "http://"+domain+":3001/Home"
                                }
                                else{
                                    error = true;
                                    setErrorMessage("Code not valid")
                                    setError(true);
                                }
                            },code)
                          }
          }}>
              Confirm
            </button>
            </div>
            </form>
        </div>
    )
}