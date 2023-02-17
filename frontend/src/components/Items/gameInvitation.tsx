import React, { useContext } from "react";
import GameSocketContext from "../../contexts/gameSocket";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface props {
    sender: string;
    senderId: string;
    senderAvatar: string;
}

function GameInvitation({ sender, senderId, senderAvatar }: props) {
    const navigate = useNavigate();

    const handleAccept = () => {
        axios.post("http://localhost:3000/game/acceptInvitation", { senderId: senderId },
            {
                withCredentials: true,
            }
        ).then((res) => {
            console.log(res);
            navigate(`/game/${res.data}`);
        }).catch((err) => {
            alert(err.message);
        });
    }

    const handleDecline = () => {
        axios.post("http://localhost:3000/game/declineInvitation", { senderId: senderId },
            {
                withCredentials: true,
            }
        ).then((res) => {
            navigate(`/game/${res.data.gameId}`);
        }).catch((err) => {
            alert(err.message);
        });
    }

    return (
        <div className="flex items-center justify-between w-[440px] gap-4">
            <img src={senderAvatar} alt={sender} className="w-[80px] h-[80px] rounded-full" />
            <p
                className="text-[1rem] text-white"
            >{sender} wants to play with you!</p>
            <div className="flex flex-col justify-center items-center gap-2">
                <button
                    className="bg-primary text-white text-[1rem] px-4 py-1 rounded-md w-full"
                    onClick={handleAccept}
                >
                    Accept
                </button>
                <button
                    className="border-2 border-primary text-primary text-[1rem] px-4 py-1 rounded-md w-full whitespace-nowrap"
                    onClick={handleDecline}
                >
                    Decline
                </button>
            </div>
        </div>
    )
}

export default GameInvitation
