import ChatMessage from "../ChatMessage/ChatMessage";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import { useParams } from "react-router-dom";
import { SERVER_URL, ROOM_URL } from "../../utils/APIUtils";


function TextChannel({ userID, socket, room }) {
    const [messageHistory, setMessageHistory] = useState([]);

    const postMsg = (msg) => {
        axios.post(`${ROOM_URL}/${room}`, msg).then((response) => {
            // console.log(response);
            return;
        }).catch(e => console.log(e));
    }

    const emitMsg = async (message) => {
        socket.emit("sendMsg", { message, room });
    }

    const sendMsg = async (e) => {
        e.preventDefault();
        let message = e.target.content.value;
        if (!message) {
            alert("no message text");
            return;
        }

        let msg = {
            messageID: uuid(),
            message: message,
            userID: userID,
            time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
        }

        await emitMsg(msg.message);
        setMessageHistory([...messageHistory, msg.message]);
        // postMsg(msg);
    }

    const receiveMsg = () => {
        socket.on("receiveMsg", (data) => { //never get in here for some reason
            console.log("message")
            console.log(data)
            setMessageHistory((messageHistory) => [...messageHistory, data]);
        })
    }

    useEffect(() => {
        receiveMsg();
    }, [socket])

    return (
        <div>
            <div>
                <p>Text channel</p>
            </div>
            <div className="message__section">
                {messageHistory.map((content) => {
                    return <ChatMessage key={content.messageID} message={content} />
                })}
            </div>
            <form onSubmit={sendMsg}>
                <label htmlFor="content">
                    <input name="content" />
                </label>
                <button>send msg</button>
            </form>
        </div >
    )
}

export default TextChannel;