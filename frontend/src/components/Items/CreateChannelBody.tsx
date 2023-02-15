import React, { useState } from 'react'
import { CheckIcon,EyeOnPasswordIcon,EyeOffPasswordIcon } from './Icons'
import { CreateChannel } from '../../Helpers';

interface typeProps{
  setCreate?: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function CreateChannelBody({setCreate}:typeProps) {
  const [password,setPassword] = useState(true);
  const [type,setType] = useState("public");
  const [protectd,setProtected] = useState(false)
  const [nameChannel,setNameChannel] = useState("")
  const [passwordValue,setPasswordValue] = useState("")


  return (
    <div className='flex items-center w-full'>
        <div className='flex flex-col gap-11 w-full'>
            <div className='flex flex-col lg:flex-row gap-8 items-center justify-between lg:gap-0'>
                <button className='bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md' onClick={()=>{
                  setType("public")
                  setProtected(false)
                  setNameChannel("")
                  }}>
                    <span aria-label='Check' className={`${type ==="public"?"bg-primary":"border-2 border-primary"} w-7 h-7 flex justify-center items-center rounded-full`}>
                        {
                          (type === "public")?<CheckIcon edit='w-4 h-4 fill-primaryText'/>:null
                        }
                    </span>
                    <span className='text-primaryText text-md font-light'>Public</span>
                </button>
                <button className='bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md' onClick={()=>{
                  setType("private")
                  setProtected(false)
                  setNameChannel("")

                  }}>
                    <span aria-label='Check' className={`${type ==="private"?"bg-primary":"border-2 border-primary"} w-7 h-7 flex justify-center items-center rounded-full`}>
                        {
                          (type === "private")?<CheckIcon edit='w-4 h-4 fill-primaryText'/>:null
                        }
                    </span>
                    <span className='text-primaryText text-md font-light'>Private</span>
                </button>
                <button className='bg-body flex items-center gap-3 w-80 lg:w-40 p-2.5 rounded-md' onClick={()=>{
                  setType("protected") 
                  setProtected(true)
                  }}>
                    <span aria-label='Check' className={`${type ==="protected"?"bg-primary":"border-2 border-primary"} w-7 h-7 flex justify-center items-center rounded-full`}>
                        {
                          (type === "protected")?<CheckIcon edit='w-4 h-4 fill-primaryText'/>:null
                        }
                    </span>
                    <span className='text-primaryText text-md font-light'>Protected</span>
                </button>
            </div>
            {
              (!protectd)?(
                <div className='flex flex-col lg:flex-row items-center lg:items-end gap-3 '>
                <div className="flex flex-col gap-1.5 w-80 lg:w-full">
                  <label htmlFor="Name channel" className="text-sm text-primaryText">
                    Name Channel
                  </label>
                  <input
                    type="text"
                    className="placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light"
                    placeholder="Enter name channel" value={nameChannel}
                    onChange={(e:any)=>{setNameChannel(e.currentTarget.value)}}
                  />
                </div>
                <button className="w-80 lg:w-32 rounded-md bg-primary p-2.5 text-sm text-primaryText" onClick={()=>{
                  let object = {
                  type:type,
                  name:nameChannel,
                }
                CreateChannel(object)
                if(setCreate)
                  setCreate(false);
                }}>
                    Create
                </button>
                </div>
              ):(
                <div className='flex flex-col gap-5 lg:gap-5'>
                <div className='flex flex-col lg:flex-row items-center lg:items-start gap-5'>
                <div className="flex flex-col gap-1.5 w-80 lg:w-full">
                <label htmlFor="Name channel" className="text-sm text-primaryText">
                  Name Channel
                </label>
                <input
                  type="text"
                  className="placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light"
                  placeholder="Enter name channel"
                  onChange={(e:any)=>{setNameChannel(e.currentTarget.value)}}
                />
              </div>
              <div className="flex flex-col gap-1.5 w-80 lg:w-full">
                <label htmlFor="Name channel" className="text-sm text-primaryText">
                  Password
                </label>
                <div className='flex'>
                <input
                  type={`${password?"password":"text"}`}
                  className="flex-1 placeholder-secondary-text rounded-md rounded-r-none bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light"
                  placeholder="Enter password"
                  onChange={(e:any)=>{setPasswordValue(e.currentTarget.value)}}
                />
                <button className='bg-secondaryText p-3 rounded-md rounded-l-none' onClick={()=>{
                  (password)?setPassword(false):setPassword(true)
                }}>
                  {
                    (password)?<EyeOnPasswordIcon edit='w-4 h-4 fill-shape'/>:<EyeOffPasswordIcon edit='w-4 h-4 fill-shape'/>
                  }
                </button>
                </div>
              </div>
                </div>
                <div className='flex justify-center lg:justify-end'>
                <button className="w-80 lg:w-32 rounded-md bg-primary p-2.5 text-sm text-primaryText" onClick={()=>{
                  let object = {
                    type:type,
                    name:nameChannel,
                    password:passwordValue,
                  }
                  CreateChannel(object)
                  if(setCreate)
                    setCreate(false);
                }}>
                  Create
              </button>
                </div>
              </div>   
              )
            }
        </div>
    </div>
  )
}
