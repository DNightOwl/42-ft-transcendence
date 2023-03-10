import React, { useState,useEffect } from "react";
import { EditAvatarIcon, ExclamationIcon } from "./Icons";
import { editPicture,editNickName, checkTfa, DisableQr } from "../../Helpers";
import { getQR,confermQr,getUserData } from "../../Helpers";

interface typeProps{
  settings?:React.Dispatch<React.SetStateAction<boolean>>
  setPictureProfile?:React.Dispatch<React.SetStateAction<string>>
  setUsername?:React.Dispatch<React.SetStateAction<string>>
  nickname?:any
  pictureUser?:any
}


export default function SettingsBody({settings,nickname,pictureUser,setPictureProfile,setUsername}:typeProps) {

  const [value, setValue] = useState<string>("");
  const [switchBtn, setSwitchBtn] = useState<boolean>(false);
  const [picture, setPicture] = useState<File>(pictureUser);
  const [pictureuser, setPictureUser] = useState<string>(pictureUser);
  const [tempPic,setTempPic] = useState("");
  const [display,setDisplay] = useState<boolean>(false)
  const [base,setBase] = useState("");
  const [errorName,setErrorName] = useState<boolean>(false);
  const [errorNameMessagee,setErrorNameMessage] = useState("");
  const [error,setError] = useState<boolean>(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [codeValue,setCodeValue] = useState("");

  useEffect(()=>{
    getUserData((res:any)=>{
      setSwitchBtn(res.tofactor);
      setValue(res.nickname)
    })
  },[])
  return !display ? (
    <div className="flex flex-col justify-between py-6">
      <div>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <div className="flex flex-col items-center gap-3">
              <img src={pictureuser} alt="User" className="h-24 w-24 rounded-full" />
            <button
              className="flex w-28 items-center justify-center gap-1 rounded-md bg-primary p-2 text-sm text-primaryText"
              onClick={() => {
                let inputFile = document.getElementById("file");
                inputFile?.click();
              }}
            >
              <EditAvatarIcon edit="w-5 h-5 fill-primaryText" />
              <span>Avatar</span>
              <input
                type="file"
                id="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    let extention = e.target.files[0].name.split(".").pop();
                    if (
                      extention === "png" ||
                      extention === "PNG" ||
                      extention === "jpeg" ||
                      extention === "JPEG" ||
                      extention === "jpg" ||
                      extention === "JPG"
                    )
                    {
                      setPicture(e.target.files[0])
                      setPictureUser(URL.createObjectURL(e.target.files[0]))
                      setTempPic(e.target.files[0].name)
                    }
                  }
                }}
              />
            </button>
          </div>
          <div className="flex flex-col justify-start gap-6">
            <div className="flex w-full flex-col gap-1.5 lg:w-64">
              <label htmlFor="Username" className="text-sm text-primaryText">
                Username
              </label>
              <input
                type="text"
                className={`placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${errorName?'error-input':''}`}
                placeholder="Enter username"
                value={value}
                onChange={(e) => {
                  setValue(e.currentTarget.value);
                  setErrorName(false)
                }}
              />
              {
                  (errorName)?(
                    <div className="text-error text-xs font-medium fill-error flex gap-1.5">
                    <ExclamationIcon edit="w-3 h-3 relative top-0.5"/>
                    <span>{errorNameMessagee}</span>
                  </div>
                  ):null
                }
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primaryText">
                <span>{switchBtn ? "Disable" : "Enable"}</span> 2FA
              </span>
              <button
                className={`flex h-7 w-12 px-1 ${
                  switchBtn ? "justify-end bg-primary" : "justify-start bg-body"
                } items-center rounded-full`}
                onClick={() => {
                  setCodeValue("");
                  setError(false)
                  if(!switchBtn){
                    getQR((res:any)=>{
                      setBase(res.data);
                    })
                  }
                  setDisplay(true);
                }}
              >
                <span className="h-5 w-5 rounded-full bg-primaryText"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        <button className="w-32 rounded-md bg-shape p-2 text-sm text-primaryText shadow" onClick={()=>{
            if(settings)
            {
                settings(false);
                document.body.style.overflow="auto";
            }
        }}>
          Cancel
        </button>
        <button className="w-32 rounded-md bg-primary p-2 text-sm text-primaryText" onClick={()=>{
          let error = false;

          if (!value.trim().length)
          {
            error = true;
            setErrorNameMessage("Zone text empty")
            setErrorName(true);
          }
          

          if(!error){
            
            editPicture(picture);
            editNickName(value);



            if(switchBtn)
              checkTfa();
            else{
              DisableQr();
            }
            
            if(setPictureProfile)
            {
              setPictureProfile(pictureuser);
            }
            if(setUsername)
              setUsername(value)

            if(settings)
            {
                settings(false);
                document.body.style.overflow="auto";
            }
        }
        }}>
          Save
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center">
      <div className="flex gap-10 lg:gap-12 flex-col lg:flex-row items-center">
        {
          (!switchBtn)?(
            <div className="h-32 w-32 rounded-lg bg-white p-1.5">
            <img src={base} alt="qr code" />
          </div>
          ):null
        }
        <div className="flex w-full gap-6 flex-col lg:w-64">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="Code" className="text-sm text-primaryText">
              Code
            </label>
            <input
              type="text"
              className={`placeholder-secondary-text rounded-md bg-body p-3 text-xs text-primaryText outline-none placeholder:text-xs placeholder:font-light ${error?'error-input':''}`}
              placeholder="Enter code"
              value={codeValue}
              onChange={(e)=>{
                setCodeValue(e.currentTarget.value);
                setError(false)
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
          <div className="flex w-full items-center justify-end gap-3">
            <button className="w-32 rounded-md bg-shape p-2 text-sm text-primaryText shadow" onClick={()=>{
                setDisplay(false);
            }}>
              Back
            </button>
            <button className="w-32 rounded-md bg-primary p-2 text-sm text-primaryText" onClick={()=>{
              
              let error = false;

              if(!codeValue.length)
              {
                error = true;
                setErrorMessage("Zone text empty");
                setError(true);
              }

             else if(!/^[0-9]+$/.test(codeValue))
              {
                error = true;
                setErrorMessage("Digit only")
                setError(true);
              }

              else if(codeValue.length > 6)
              {
                error = true;
                setErrorMessage("Maximum 6 digit")
                setError(true);
              }

              else if(codeValue.length < 6)
              {
                error = true;
                setErrorMessage("Minimum 6 digit")
                setError(true);
              }
              
              if(!error)
              {
                if(!switchBtn){
                  confermQr((res:any)=>{
                    if(res.data === "valid"){
                      setSwitchBtn(true)
                      setDisplay(false)
                    }
                    else{
                      error = true;
                      setErrorMessage("Code not valid")
                      setError(true);
                    }
                  },codeValue)
                }
                else{

                  confermQr((res:any)=>{
                    
                    if(res.data === "valid"){
                      setSwitchBtn(false)
                      setDisplay(false)
                    }
                    else{
                      error = true;
                      setErrorMessage("Code not valid")
                      setError(true);
                    }
                  },codeValue)
                }
              }
            }}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
