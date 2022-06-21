import { io } from "socket.io-client";
import { useState } from "react";

const socket = io.connect("http://localhost:5050");

function Welcome() {

    const [room, setRoom] = useState("");

    const joinRoom = (e) => {
        e.preventDefault();
        setRoom(e.target.room.value);
        if (room !== "") {
            console.log(room);
            socket.emit("join", room, (data) => {
                console.log(data)
            });
        }
        window.location.replace(`/room/${e.target.room.value}`);
    }

    return (
        <>
            <div>
                <div>
                    <h1>Welcome to lite chat</h1>
                    <h1>Create a chat room and start talking</h1>
                </div>
                <form onSubmit={joinRoom}>
                    <label htmlFor="room">Enter Room ID:
                        <input type="text" name="room" />
                        <button>join room</button>
                    </label>
                </form>
            </div>
            <div>
                <div></div>
                <p>Click here to join a chat room</p>
            </div>
        </>
    )
}

export default Welcome;