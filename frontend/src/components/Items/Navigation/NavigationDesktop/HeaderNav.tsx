import React, { useEffect } from 'react';
import { SearchIcon, ControllerIcon, ArrowDownIcon, ArrowUpIcon, SettingsNavIcon, LogoutIcon } from '../../Icons';

import { useState } from 'react'
import { getUserData, getUsers,logout } from '../../../../Helpers';
import CardSearch from '../../CardSearch';
import { useNavigate, Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from '../../Modal';


interface typeProps {
    messages: boolean,
    chatState: any,
    settings?: React.Dispatch<React.SetStateAction<boolean>>
    setClickUser: React.Dispatch<React.SetStateAction<boolean>>
    clickUser: boolean,
    pictureUser?:string
    username?:string
}
export default function HeaderNav({messages,chatState,settings,setClickUser,clickUser,pictureUser,username}:typeProps) {
    const domain : string | undefined = process.env.REACT_APP_DOMAIN;



    const navigate = useNavigate();
    const [modalShown, setModalShown] = useState<boolean>(false);

    const [dropDown,setDropDown] = useState<boolean>(false)
    const [mouse,setMouse] = useState<boolean>(false);
    const [display,setDisplay] = useState<boolean>(false);
    const [dataUsers,setDataUser] = useState([]);
    const [value,setValue] = useState("");
    const [click,setClick] = useState<boolean>(false);
    
    const [data,setData] = useState<any>({});
    const [fill,setFill] = useState([]);

    useEffect(() => {
        getUserData((res: any) => { setData(res) });
        getUsers((res: any) => {
            setFill(res.data)
        })
    }, [click]);

    const toggleModal = (prevState: boolean) => {
        setModalShown(!prevState);
    }


    return (
        (!messages) ? (
            <section className='hidden lg:flex justify-between items-start mr-4 ml-64 pt-7 gap-5'>
                <div className='flex-1 relative'>
                    <div className='flex items-center bg-shape pr-4 rounded-md'>
                        <input type="text" placeholder='Search for user' value={value} className='flex-1 bg-transparent placeholder-secondary-text placeholder:font-light placeholder:text-sm font-light text-sm p-3 pl-4 pr-1.5 focus:outline-none text-primaryText' onClick={()=>{
                            (click) ? (setClick(false)) : setClick(true);
                        }} onChange={(e) => {
                            let value = e.currentTarget.value;
                            let data: any = [];
                            setValue(e.currentTarget.value)
                            if (value.length) {
                                data = fill.filter((e:any)=>{
                                    if(e.username.toLowerCase().search(value.toLowerCase()) != -1){
                                        return e;  
                                    }
                                })
                                setDisplay(true)
                                setDataUser(data);
                            }
                            else {
                                data = [];
                                setDisplay(false);
                                setDataUser(data)

                            }

                        }} />
                        <SearchIcon edit="w-4" />
                    </div>
                    {
                        (display && dataUsers.length) ? (
                            <div className='bg-body absolute w-full shadow top-14 rounded-lg flex flex-col gap-4 py-4 box-search'>
                                {
                                    dataUsers.map((e: any, index) => {
                                        return (
                                            <CardSearch data={e} click={clickUser} setClick={setClickUser} key={index} setDisplay={setDisplay}/>
                                        )
                                    })

                                }
                            </div>
                        ) : null
                    }
                </div>
                <div className='flex items-center gap-5'>
                    <button className='bg-primary text-primaryText text-sm flex items-center justify-center gap-2.5 w-36 rounded-md p-3'
                        onClick={() => {
                            toggleModal(modalShown);
                        }}
                    >
                        <ControllerIcon edit="w-7" />
                        <span>Play now</span>
                        {
                            (modalShown) ? (
                                <Modal >
                                    <ModalHeader
                                        onClose={() => {
                                            toggleModal(modalShown);
                                        }}
                                    >
                                        <span className='text-primaryText text-lg font-bold'>Play now</span>
                                    </ModalHeader>
                                    <ModalBody
                                    >
                                        <div className='flex flex-row gap-8 w-[700px] h-[400px] justify-center items-center pt-[2rem]'>
                                            <span onClick={
                                                () => {
                                                    toggleModal(modalShown);
                                                    navigate('/queue?mode=classic');
                                                }
                                            } className='flex justify-center text-[1.8rem] border-4 w-[240px] h-[120px] border-primary items-center cursor-pointer rounded-lg gap-2.5 p-3 bg-backgroundHover hover:bg-primary transition-all ease-in-out'>
                                                Classic Mode
                                            </span>
                                            <span onClick={
                                                () => {
                                                    toggleModal(modalShown);
                                                    navigate('/queue?mode=paddle--');
                                                }
                                            } className='flex justify-center text-[1.8rem] border-4 w-[240px] h-[120px] border-primary items-center cursor-pointer rounded-lg gap-2.5 p-3 bg-backgroundHover hover:bg-primary transition-all ease-in-out'>
                                                Paddle--
                                            </span>
                                        </div>
                                    </ModalBody>
                                </Modal>
                            ) : null

                        }
                    </button>
                    <div className='relative text-primaryText text-sm'>
                        <button className='flex items-center gap-2' onClick={() => { (!dropDown) ? setDropDown(true) : setDropDown(false) }} onBlur={() => { if (!mouse) setDropDown(false) }}>
                            <div className='flex items-center gap-2'>
                                {
                                    (pictureUser)?(
                                        <img src={pictureUser} alt="User" className='w-10 h-10 rounded-full' />
                                    ):(
                                        <img src={data.pictureLink} alt="User" className='w-10 h-10 rounded-full' />
                                    )
                                }
                                <span className='username'>{
                                (username)?(
                                    (username) ? username.charAt(0).toUpperCase() + username.slice(1) : null
                                ):
                                (data.nickname) ? data.nickname.charAt(0).toUpperCase() + data.nickname.slice(1) : null
                                }</span>
                            </div>
                            <span className='bg-shape w-4 h-4 rounded-full flex justify-center items-center'>
                                {(!dropDown) ? (<ArrowDownIcon edit="w-1.5 fill-secondaryText" />) : (<ArrowUpIcon edit='w-1.5 h-1.5 fill-secondaryText' />)}
                            </span>
                        </button>
                        {
                            (dropDown) ? (
                                <div className='absolute top-12 rounded-md bg-body shadow right-0 w-36 flex flex-col py-5 gap-2'>
                                    <button className='flex gap-2   hover:bg-backgroundHover items-center justify-center p-2' onMouseMove={() => { setMouse(true) }} onMouseLeave={() => { setMouse(false) }} onClick={() => {
                                        if (settings) {
                                            settings(true);
                                            document.body.style.overflow = "hidden";
                                            setDropDown(false)
                                        }
                                    }}>
                                        <SettingsNavIcon edit='w-5 h-5 fill-primaryText' />
                                        Settings
                                    </button>
                                    <button className='flex gap-2  hover:bg-backgroundHover items-center justify-center p-2' onMouseMove={()=>{setMouse(true)}} onMouseLeave={()=>{setMouse(false)}} onClick={()=>{
                                logout((res:any)=>{
                                    if(res.data === "done")
                                        window.location.href = "http://"+domain+":3001/login";
                                    
                                });
                            }}>
                                <LogoutIcon edit='w-5 h-5 fill-primaryText'/>
                                Logout
                            </button>
                                </div>
                            ) : null
                        }

                    </div>

                </div>
            </section>
        ) : null
    )
}
