import { io } from "socket.io-client";
import ChannelBar from "../../components/ChannelBar/ChannelBar";
import TextChannel from "../../components/TextChannel/TextChannel";
import "./ChatRoom.scss";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "react-router-dom";

const socket = io.connect("http://localhost:5050");

function ChatRoom(props) {
    const [message, setMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    let room = useParams().id;
    const [user, setUser] = useState("");

    const sendMsg = () => {
        socket.emit("sendMsg", { message, room });
        setMessageHistory(arr => [...arr, message]);
        setMessage("");
    }

    useEffect(() => {
        socket.emit("join", room, (data) => {
            setUser(data);
            console.log(data, "connected"); //user id
        });
        socket.on("receiveMsg", (data) => {
            setMessageHistory(arr => [...arr, data]);
        })
    }, [socket]);

    return (
        <>
            {/* <ChannelBar /> */}
            {/* <TextChannel /> */}


            <label htmlFor="msg">
                <input name="msg" onChange={(e) => {
                    setMessage(e.target.value);
                }} />
                <button onClick={sendMsg}>send</button>
            </label>

            <div> messages:
                {messageHistory.map(message => {
                    return (
                        <p>{message}</p>
                    )
                })}
            </div>
        </>
    )
}

export default ChatRoom;