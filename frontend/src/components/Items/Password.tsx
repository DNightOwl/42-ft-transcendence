import { useState } from "react";

import { KeyIcon,ExclamationIcon,EyeOnPasswordIcon,EyeOffPasswordIcon } from './Icons';
import { joinRoom } from "../../Helpers";

interface typeprops{
  dataProtected?:any
  setPassChannel?: React.Dispatch<React.SetStateAction<boolean>>
  setChatState?: React.Dispatch<React.SetStateAction<any>>;

}

export default function Password({dataProtected,setPassChannel,setChatState}:typeprops) {

    const [error,setError] = useState<boolean>(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [password, setPassword] = useState(true);
    const [value,setValue] = useState("");

    return <div className="py-5 w-full flex flex-col gap-6">
                    <form className='flex flex-col justify-center items-center gap-16'>
            <div className='w-80 flex flex-col gap-5'>
            <div className="flex w-80 flex-col gap-1.5 lg:w-full">
                      <label
                        htmlFor="Name channel"
                        className="text-sm text-primaryText"
                      >
                        Password
                      </label>
                      <div className="flex">
                        <input
                          type={`${password ? "password" : "text"}`}
                          className={`placeholder-secondary-text flex-1 rounded-md rounded-r-none bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${error?'error-input error-pass':''}`}
                          placeholder="Enter password"
                          value={value}
                          onChange={(e)=>{
                            setError(false)
                            setValue(e.currentTarget.value)
                        }}
                        />
                        <button
                          className={`rounded-md rounded-l-none bg-secondaryText p-3 ${error?'error-input error-eye':''}`}
                          onClick={(e) => {
                            e.preventDefault()
                            password ? setPassword(false) : setPassword(true);
                          }}
                        >
                          {password ? (
                            <EyeOnPasswordIcon edit="w-4 h-4 fill-shape" />
                          ) : (
                            <EyeOffPasswordIcon edit="w-4 h-4 fill-shape" />
                          )}
                        </button>
                      </div>
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

                          if (!value.trim().length)
                          {
                            error = true;
                            setErrorMessage("Zone text empty")
                            setError(true);
                          }
                          
                          if(!error)
                          {
                            dataProtected.password = value;
                            joinRoom((res:any)=>{
                              
                            },dataProtected)
                          }
          }}>
              Confirm
            </button>
            </div>
            </form>
    </div>
}