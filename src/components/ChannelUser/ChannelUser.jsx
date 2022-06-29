import React, { useEffect, useRef } from "react";
import Peer from "simple-peer";


function ChannelUser({ peer }) {
    // console.log(peer)

    const ref = useRef();

    useEffect(() => {
        peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <div>
            <audio ref={ref} autoPlay />
            <div className="user__avatar"></div>
            {/* <button>mute status</button> */}
        </div>
    )
}

export default ChannelUser;