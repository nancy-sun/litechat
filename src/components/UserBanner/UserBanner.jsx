import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserBanner.scss";
import { useSelector, useDispatch } from "react-redux";


function UserBanner({ user, status }) {

    const [username, setUsername] = useState();
    const room = useSelector((state) => state.room.value);

    const getUserName = (id) => {
        axios.get(`${process.env.REACT_APP_ROOM_URL}/${room}`).then((response) => {
            let users = response.data.users;
            for (let user of users) {
                if (user.userID === id) {
                    setUsername(user.username);
                }
            }
        }).catch((e) => console.log(e));
    }

    useEffect(() => {
        setTimeout(() => {
            getUserName(user);
        }, 600);
    }, [])

    return (
        <div className="banner__wrap">
            {status === "join" ? (
                <p className="banner">Wild {username} appeared!</p>
            ) : (
                <p className="banner">{user} fled!</p>
            )}
        </div>
    )
}

export default UserBanner;