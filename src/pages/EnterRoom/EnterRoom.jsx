
import axios from "axios";
import "./EnterRoom.scss";




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
        <main className="main">
            <form onSubmit={joinRoom} className="box box__join">
                <label htmlFor="room" className="box__label">Enter Room ID:
                    <input type="text" name="room" className="box__input" />
                </label>
                <button className="box__btn">join room</button>
            </form>
        </main>
    )
}

export default EnterRoom;