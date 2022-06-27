import { io } from "socket.io-client";
import ChannelBar from "../../components/ChannelBar/ChannelBar";
import TextChannel from "../../components/TextChannel/TextChannel";
import "./ChatRoom.scss";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER_URL, ROOM_URL, POKE_API } from "../../utils/APIUtils";

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
        // console.log(user);
        if (user.userID && user.username) {
            // console.log("In post user condition");
            axios.post(`${process.env.REACT_APP_ROOM_URL}/${room}/${user.userID}`, user).then((response) => {
                // console.log("in post new user")
                // console.log(response)
                return;
            }).catch(e => console.log(e))
        }
    }

    // const userLeft = () => {
    //     axios.delete(`${ROOM_URL}/${room}/${user}`).then(() => {
    //         setUser("");
    //     }).catch(e => console.log(e));
    // }

    const [users, setUsers] = useState([])

    const getAllUsers = () => {
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${room}/users`)
            .then(response => {
                setUsers(response);
            }).catch(e => console.log(e));
    }

    useEffect(() => {
        emitJoin();
        getAllUsers();
    }, [])

    useEffect(() => {
        postNewUser();
    }, [user])


    return (
        <>
            <ChannelBar username={user.username} userID={user.userID} room={room} socket={socket} users={users} />
            <TextChannel userID={user.userID} username={user.username} socket={socket} room={room} />
            <div>welcome {user.username}</div>
        </>
    )
}

export default ChatRoom;