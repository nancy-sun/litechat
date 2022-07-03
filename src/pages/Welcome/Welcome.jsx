import { io } from "socket.io-client";
import axios from "axios";
import { v4 as uuid } from 'uuid';
import pointIcon from "../../assets/pointFinger.svg";
import About from "../../components/About/About";
import 'animate.css';
import "./Welcome.scss";

const socket = io.connect(process.env.REACT_APP_SERVER_URL);

function Welcome() {

    const createRoom = () => {
        axios.post(process.env.REACT_APP_ROOM_URL, {
            roomID: uuid()
        }).then(response => {
            const room = response.data.roomID;

            window.location.replace(`/room/${room}`);
        }).catch(e => console.log(e));
    };

    return (
        <main className="main">
            <div className="main__about">
                <About />
            </div>
            <div className="box">
                <div className="box__titles">
                    <h1 className="box__title">Welcome to lite chat</h1>
                    <h1 className="box__title">Create a chat room and start talking</h1>
                </div>
                <button onClick={createRoom} className="box__btn">create a room</button>
            </div>
            <div className="direct">
                <img className="direct__icon" src={pointIcon} alt="point icon" />
                <p className="direct__text">Click here to join a chat room</p>
            </div>
        </main>
    )
}

export default Welcome;