import { io } from "socket.io-client";
import ChannelBar from "../../components/ChannelBar/ChannelBar";
import TextChannel from "../../components/TextChannel/TextChannel";
import "./ChatRoom.scss";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import { useParams } from "react-router-dom";
import { SERVER_URL, ROOM_URL, POKE_API } from "../../utils/APIUtils";
// import { userJoin } from "../../utils/utils";

const socket = io.connect(SERVER_URL);

function ChatRoom() {
    // const [message, setMessage] = useState("");
    // const [messageHistory, setMessageHistory] = useState([]);
    const [user, setUser] = useState({ userID: "", username: "" });

    let room = useParams().id;

    const emitJoin = () => {
        socket.emit("join", room, (data) => {
            console.log("emit join")
            setCurrentUser(data);
            if (!data) {
                console.log("oops");
            }
        });
    }

    const setCurrentUser = (userID) => {
        const randomNum = Math.floor(Math.random() * 897) + 1;
        axios.get(`${POKE_API}/${randomNum}`).then((response) => {
            console.log("in current user")
            setUser({ userID: userID, username: response.data.name });
        }).catch(e => console.log(e))
    }

    const postNewUser = () => {
        console.log(user);
        if (user.userID && user.username) {
            console.log("In post user condition");
            axios.post(`${ROOM_URL}/${room}/${user.userID}`, user).then((response) => {
                console.log("in post new user")
                console.log(response)
            }).catch(e => console.log(e))
        }
    }

    // const userLeft = () => {
    //     axios.delete(`${ROOM_URL}/${room}/${user}`).then(() => {
    //         setUser("");
    //     }).catch(e => console.log(e));
    // }

    // const sendMsg = () => {
    //     socket.emit("sendMsg", { message, room });
    //     setMessageHistory(arr => [...arr, message]);
    //     setMessage("");
    // }

    useEffect(() => {
        emitJoin()
        console.log("message")
    }, [])

    useEffect(() => {
        postNewUser();
    }, [user])

    // useEffect(() => {
    //     socket.on("receiveMsg", (data) => {
    //         setMessageHistory(arr => [...arr, data]);
    //     })
    // }, [socket]);


    return (
        <>
            {/* <ChannelBar currentUser={user} /> */}
            <TextChannel userID={user.userID} socket={socket} room={room} />

            <div>welcome {user.username}</div>
            {/* <label htmlFor="msg">
                <input name="msg" onChange={(e) => {
                    setMessage(e.target.value);
                }} />
                <button onClick={sendMsg}>send</button>
            </label> */}

        </>
    )
}

export default ChatRoom;