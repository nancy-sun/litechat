import React from "react";
import headset from "../../assets/headset.svg"
import mic from "../../assets/mic.svg";
import micOff from "../../assets/micOff.svg";
import "./Control.scss";

function Control({ selfVoice, toggleVoice }) {
    return (
        <div className="control__wrap">
            <div className="control">
                <button onClick={toggleVoice} className={selfVoice ? "control__mic" : "control__mic--off"}></button>
                <button className="control__headset"></button>
            </div>
        </div>
    )
}

export default Control;
