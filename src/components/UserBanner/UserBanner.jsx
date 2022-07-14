import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./UserBanner.scss";

function UserBanner({ user, status, room }) {

    const [username, setUsername] = useState()

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
        }, 500);
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