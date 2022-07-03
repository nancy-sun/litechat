import { io } from "socket.io-client";
import ChannelBar from "../../components/ChannelBar/ChannelBar";
import TextChannel from "../../components/TextChannel/TextChannel";
import "./ChatRoom.scss";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ChatRoom.scss";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function ChatRoom() {
    let room = useParams().id;

    const [user, setUser] = useState({ userID: "", username: "" });

    const emitJoin = () => {
        socket.emit("join", room, (data) => {
            // console.log("emit join")
            setCurrentUser(data);
            if (!data) {
                console.log("oops");
            }
        });
    }

    const setCurrentUser = (userID) => {
        const randomNum = Math.floor(Math.random() * 897) + 1;
        axios.get(`${process.env.REACT_APP_POKE_API}/${randomNum}`).then((response) => {
            // console.log("in current user")
            setUser({ userID: userID, username: response.data.name });
        }).catch(e => console.log(e))
    }

    const postNewUser = () => {
        if (user.userID && user.username) {
            // console.log("In post user condition");
            axios.post(`${process.env.REACT_APP_ROOM_URL}/${room}/user`, user).then((response) => {
                // console.log("in post new user")
                return;
            }).catch(e => console.log(e))
        }
    }


    const [users, setUsers] = useState([])

    const getAllUsers = () => {
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${room}`)
            .then(response => {
                setUsers(response.data.users);
            }).catch(e => console.log(e));
    }

    useEffect(() => {
        emitJoin();
        getAllUsers();
    }, [])

    useEffect(() => {
        postNewUser();
    }, [user])


    useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    return (
        <main className="room">
            <ChannelBar username={user.username} userID={user.userID} room={room} socket={socket} users={users} />
            <TextChannel userID={user.userID} username={user.username} socket={socket} room={room} />
        </main>
    )
}

export default ChatRoom;