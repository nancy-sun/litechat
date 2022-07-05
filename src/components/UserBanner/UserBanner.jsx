import React from "react";
import "./UserBanner.scss";

function UserBanner({ username, status }) {
    return (
        <div className="banner__wrap">
            {status === "join" ? (
                <p className="banner">Wild {username} appeared!</p>
            ) : (
                <p className="banner">{username} fled!</p>
            )}
        </div>
    )
}

export default UserBanner;