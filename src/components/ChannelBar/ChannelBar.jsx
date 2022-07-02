import React, { useEffect, useState, useRef } from "react";
import ChannelUser from "../ChannelUser/ChannelUser";
import "./ChannelBar.scss";
import Peer from "simple-peer";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';



function ChannelBar({ username, userID, room, socket, users }) {

    const [clicked, setClicked] = useState(false);
    const [voiceEnter, setVoiceEnter] = useState(false);

    const userAudio = useRef();
    const [peers, setPeers] = useState([]);
    const socketRef = useRef(socket);
    const peersRef = useRef([]);


    const enterVoice = () => {
        if (voiceEnter === true) return;
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                setVoiceEnter(true);
                userAudio.current.srcObject = stream;
                socketRef.current.emit("joinVoice", room);
                socketRef.current.on("allUsers", (users) => {
                    let peers = [];
                    users.forEach((user) => {
                        const peer = createPeer(user, socketRef.current.id, stream);
                        peersRef.current.push({
                            peerID: user,
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
                    const sgn = peersRef.current.find((peer) => peer.peerID === payload.id);
                    sgn.peer.signal(payload.signal);
                });
            })
    }

    const createPeer = (userToSignal, caller, stream) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
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
            socketRef.current.emit("sendSgn", { userToSignal, caller, signal })
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
            socketRef.current.emit("returnSgn", { signal, caller })
        })
        peer.signal(incomingSignal);
        return peer;
    }

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setClicked(true);
            setTimeout(() => {
                setClicked(false);
            }, 1000);
        });
    }

    return (
        <div className="channel">
            <div className="channel__head">
                <p className="channel__welcome">👋 {username}</p>
                {clicked ?
                    (<OverlayTrigger trigger="hover"
                        placement="bottom"
                        overlay={
                            <Tooltip id={"tooltip-bottom"} className="channel__share--tooltip" >
                                copied
                            </Tooltip>
                        }
                    >
                        <button className="channel__share" onClick={copyLink}></button>
                    </OverlayTrigger>)
                    :
                    (<OverlayTrigger trigger={["hover", "focus"]}
                        placement="bottom"
                        overlay={
                            <Tooltip id="tooltip-bottom" className="channel__share--tooltip">
                                share link
                            </Tooltip>
                        }
                    >
                        <button className="channel__share" onClick={copyLink}></button>
                    </OverlayTrigger>)
                }
            </div>
            <button className="channel__voice" onClick={enterVoice}> voice</button>
            <div className="channel__users">
                {peers.map((peer, i) => {
                    return (
                        <ChannelUser key={i} peer={peer} />
                    )
                })}
                <audio ref={userAudio} muted autoPlay />
            </div>
            {/* <div className="channel__self">
                self
                <button>mic</button>
                <button>sound</button>
                (tbd)sound settings
            </div> */}
        </div>
    )
}

export default ChannelBar;