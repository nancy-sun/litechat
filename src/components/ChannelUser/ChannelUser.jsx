import React, { useEffect, useRef, useState } from "react";
import soundOnIcon from "../../assets/soundon.svg";
import axios from "axios";
import "./ChannelUser.scss";


function ChannelUser({ peer }) {

    const ref = useRef();

    useEffect(() => {
        peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <div className="user">
            <audio ref={ref} autoPlay />
            <div className="user__avatar"></div>
            <p className="user__name">username</p>
            <button className="user__status">
                <img className="user__status--icon" src={soundOnIcon} alt="sound" />
            </button>
        </div>
    )
}

export default ChannelUser;