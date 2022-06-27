import { io } from "socket.io-client";
import axios from "axios";
import { useState } from "react";
import { SERVER_URL, ROOM_URL } from "../../utils/APIUtils";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);


function EnterRoom() {
    const joinRoom = (event) => {
        event.preventDefault();
        if (!event.target.room.value) {
            alert("please enter a room number");
            return;
        }
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${event.target.room.value}`).then((response) => {
            console.log(response)
            if (response.data.roomID !== event.target.room.value) {
                alert("invalid room number");
                return;
            } else {
                window.location.replace(`/room/${event.target.room.value}`);
            }
        }).catch(e => console.log(e))
    }

    return (
        <form onSubmit={joinRoom}>
            <label htmlFor="room">Enter Room ID:
                <input type="text" name="room" />
            </label>
            <button>join room</button>
        </form>
    )
}

export default EnterRoom;