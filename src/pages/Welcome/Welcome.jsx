import { io } from "socket.io-client";
import { useState } from "react";
import axios from "axios";
import { SERVER_URL, ROOM_URL } from "../../utils/APIUtils";
import { v4 as uuid } from 'uuid';
import { Link } from "react-router-dom";
import "./Welcome.scss";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

console.log(process.env);

function Welcome() {

    const createRoom = () => {
        axios.post(process.env.REACT_APP_ROOM_URL, {
            roomID: uuid()
        }).then(response => {
            const room = response.data.roomID;
            console.log(response);
            socket.emit("join", room, (data) => {
                console.log("user", data) //user id
            });
            window.location.replace(`/room/${room}`);
        }).catch(e => console.log(e));
    };

    return (
        <>
            <div>
                <div>
                    <h1 className="welcome__title">Welcome to lite chat</h1>
                    <h1>Create a chat room and start talking</h1>
                </div>
                <button onClick={createRoom}>create a room</button>
            </div>
            <div>
                <div></div>
                <Link to="/room">
                    <p>Click here to join a chat room</p>
                </Link>
            </div>
        </>
    )
}

export default Welcome;