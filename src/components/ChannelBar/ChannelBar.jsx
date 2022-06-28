import React, { useEffect, useState, useRef } from "react";
import ChannelUser from "../ChannelUser/ChannelUser";
import "./ChannelBar.scss";
import Peer from "simple-peer";


function ChannelBar({ username, userID, room, socket, users }) {

    const userAudio = useRef();
    const [peers, setPeers] = useState([]);
    const socketRef = useRef(socket);
    const peersRef = useRef([]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                userAudio.current.srcObject = stream;
                socketRef.current.emit("joinVoice", room);
                socketRef.current.on("allUsers", (users) => {
                    let peers = [];
                    users.forEach((user) => {
                        const peer = createPeer(user.userID, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerID: user.userID,
                            peer,
                        })
                        peers.push(peer);
                    })
                    setPeers(peers);
                })

                socketRef.current.on("voiceJoined", (payload) => {
                    const peer = addPeer(payload.signal, payload.caller, stream);
                    peersRef.current.push({
                        peerID: payload.caller,
                        peer,
                    })
                    setPeers((users) => [...users, peer]);
                });

                socketRef.current.on("receiveSgn", (payload) => {
                    const item = peersRef.current.find((peer) => peer.peerID === payload.id);
                    item.peer.signal(payload.signal);
                });
            })
    }, []);

    const createPeer = (userToSignal, caller, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
            // config: {
            //     iceServers: [
            //         {
            //             urls:  //stun server
            //         },
            //         {
            //             urls: //turn server
            //         }
            //     ]
            // },
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("sendSgn", { room, userToSignal, caller, signal })
        })

        return peer;
    }

    const addPeer = (incomingSignal, caller, stream) => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", (signal) => {
            socketRef.current.emit("returnSgn", { room, signal, caller })
        })
        peer.signal(incomingSignal);
        return peer;
    }



    return (
        <div className="channel">
            <div className="channel__head">
                <p className="channel__welcome">Welcome~ {username}</p>
                <div className="channel__share"></div>
            </div>
            <button className="channel__voice">voice channel</button>
            <div>
                {peers.map((peer, i) => {
                    return (
                        <ChannelUser key={i} peer={peer} />
                    )
                })}
                <audio ref={userAudio} muted autoPlay />
            </div>
            <div>
                <button>mic</button>
                <button>sound</button>
                {/* (tbd)sound settings */}
            </div>
        </div>
    )
}

export default ChannelBar;