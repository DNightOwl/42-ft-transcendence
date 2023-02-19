import React,{useState,useEffect} from 'react';
import {ControllerIcon, ArrowDownIcon,ArrowUpIcon,SettingsNavIcon,LogoutIcon} from '../../Icons';
import UserPicture from '../../../../assets/user.jpg';
import CardState from '../../CardState'
import { getUserData,logout } from '../../../../Helpers';
import { Modal, ModalBody, ModalHeader } from '../../Modal';
import { useNavigate, Link } from 'react-router-dom';


interface typeProps{
    chatState:any
    settings?:React.Dispatch<React.SetStateAction<boolean>>
    setMembers?: React.Dispatch<React.SetStateAction<boolean>>;
    setAdd?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderChat({chatState,settings,setMembers,setAdd}:typeProps) {
    const [dropDown,setDropDown] = useState<boolean>(false)
    const [mouse,setMouse] = useState<boolean>(false)
    const [data,setData] = useState<any>({});
    const [modalShown, setModalShown] = useState<boolean>(false);

    const navigate = useNavigate();
    useEffect(()=>{
        getUserData((res:any)=>{setData(res)});
    },[]);

    const toggleModal = (prevState: boolean) => {
        setModalShown(!prevState);
    }
    

    return (
    <section className='hidden lg:flex justify-between items-start pt-7 gap-5 pb-7'>
        <CardState chatState={chatState} setMembers={setMembers} setAdd={setAdd}/>
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
                                <img src={data.pictureLink} alt="User" className='w-10 h-10 rounded-full' />
                                <span className='username'>{(data.nickname) ? data.nickname.charAt(0).toUpperCase() + data.nickname.slice(1) : null}</span>
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
                                        window.location.href = "http://localhost:3001/login";
                                    
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
      )
}
