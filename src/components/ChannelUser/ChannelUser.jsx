import React, { useEffect, useRef, useState } from "react";
import soundOnIcon from "../../assets/soundon.svg";
import { getColorByName } from "../../utils/utils";
import axios from "axios";
import "./ChannelUser.scss";


function ChannelUser({ peer, peerID, room }) {

    const ref = useRef();
    const [username, setUsername] = useState("anonymous")
    const [userColor, setUserColor] = useState("3dsfxc");

    const getUserName = (peerID) => {
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${room}`).then((response) => {
            let users = response.data.voiceUsers;
            for (let user of users) {
                if (user.userID === peerID) {
                    setUsername(user.username);
                }
            }
        }).catch((e) => console.log(e));
    }

    useEffect(() => {
        getUserName(peerID);
        peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        })
    }, []);

    useEffect(() => {
        setUserColor(getColorByName(username));
    }, [username])

    return (
        <div className="user">
            <audio ref={ref} autoPlay />
            <div className="user__avatar" style={{ "backgroundColor": `#${userColor}` }}></div>
            <p className="user__name">{username}</p>
            <button className="user__status">
                <img className="user__status--icon" src={soundOnIcon} alt="sound" />
            </button>
        </div>
    )
}

export default ChannelUser;