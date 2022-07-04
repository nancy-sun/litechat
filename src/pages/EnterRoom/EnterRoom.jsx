
import axios from "axios";
import pointIcon from "../../assets/pointFinger.svg";
import About from "../../components/About/About";
import "./EnterRoom.scss";


function EnterRoom() {
    const joinRoom = (event) => {
        event.preventDefault();
        if (!event.target.room.value) {
            alert("please enter a room number");
            return;
        }
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${event.target.room.value}`).then((response) => {

            window.location.replace(`/room/${response.data._id}`);

        }).catch(e => console.log(e))
    }

    return (
        <main className="main">
            <div className="main__about">
                <About />
            </div>
            <form onSubmit={joinRoom} className="box box__join">
                <label htmlFor="room" className="box__label">Enter Room ID:
                    <input type="text" name="room" className="box__input" autoComplete="off" />
                </label>
                <button className="box__btn">join room</button>
            </form>
            <div className="direct--create">
                <img className="direct__icon" src={pointIcon} alt="point icon" />
                <p className="direct__text">Click here to create a chat room</p>
            </div>
        </main>
    )
}

export default EnterRoom;