import { io } from "socket.io-client";
import ChannelBar from "../../components/ChannelBar/ChannelBar";
import TextChannel from "../../components/TextChannel/TextChannel";
import "./ChatRoom.scss";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ChatRoom.scss";
import { useSelector, useDispatch } from "react-redux";
import { join } from "../../reducers/user";
import { setRoom } from "../../reducers/room";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function ChatRoom() {
    const dispatch = useDispatch();
    let roomID = useParams().id;


    useEffect(() => {
        dispatch(setRoom(roomID));
    }, []);

    const room = useSelector((state) => state.room.value);

    const checkParam = () => {
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${room}`).then(() => {
            return;
        }).catch((e) => {
            window.location.replace("/404");
        })
    }

    checkParam();

    const user = useSelector((state) => state.user.value);

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
            dispatch(join({ userID: userID, username: response.data.name }))
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

    useEffect(() => {
        emitJoin();
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

    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    }, [])

    return (
        <main className="room">
            <ChannelBar socket={socket} />
            <TextChannel socket={socket} />
        </main>
    )
}

export default ChatRoom;