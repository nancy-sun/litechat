import ChatMessage from "../ChatMessage/ChatMessage";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import About from "../About/About";
import UserBanner from "../UserBanner/UserBanner";
import "./TextChannel.scss"



function TextChannel({ userID, username, socket, room }) {
    const [messageHistory, setMessageHistory] = useState([]);

    const getMsgs = () => {
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${room}`).then(response => {
            const msgs = response.data.messageHistory;
            setMessageHistory(msgs);
        }).catch(e => console.log(e));
    }

    const postMsg = (msg) => {
        axios.post(`${process.env.REACT_APP_ROOM_URL}/${room}`, msg).then(() => {
            return;
        }).catch(e => console.log(e));
    }

    const emitMsg = async (msg) => {
        socket.emit("sendMsg", { msg, room });
    }

    const sendMsg = async (e) => {
        e.preventDefault();
        let message = e.target.content.value;
        if (!message) {
            alert("no message text");
            return;
        }

        let now = new Date(Date.now());
        let minute = now.getMinutes();
        if (minute < 10) {
            minute = "0" + minute;
        }
        let hour = now.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }

        let msg = {
            message: message,
            username: username,
            time: `${hour}:${minute}`
        }

        await emitMsg(msg);
        setMessageHistory([...messageHistory, msg]);
        postMsg(msg);
        e.target.reset();
    }

    const receiveMsg = () => {
        socket.on("receiveMsg", (data) => {
            setMessageHistory((messageHistory) => [...messageHistory, data]);
        })
    }

    useEffect(() => {
        receiveMsg();
    }, [socket])

    useEffect(() => {
        getMsgs();
    }, [])

    const messagesEndRef = useRef();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom()
    }, [messageHistory]);

    return (
        <div className="text">
            <div className="text__head">
                <p className="text__title">Text channel</p>
                <About />
            </div>
            <div className="text__messages">
                {messageHistory.map((msg) => {
                    return <ChatMessage key={msg.messageID} message={msg.message} user={msg.username} time={msg.time} />
                })}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMsg} className="text__input">
                <label htmlFor="content">
                    <input name="content" className="text__input--box" autoComplete="off" />
                </label>
            </form>
        </div >
    )
}

export default TextChannel;