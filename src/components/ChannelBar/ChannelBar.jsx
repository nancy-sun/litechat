import React, { useState, useRef, useEffect } from "react";
import ChannelUser from "../ChannelUser/ChannelUser";
import Peer from "simple-peer";
import axios from "axios";
import soundOnIcon from "../../assets/soundon.svg";
import soundOffIcon from "../../assets/soundoff.svg";
import { getColorByName } from "../../utils/utils";
import "./ChannelBar.scss";
import ChannelBarHead from "../ChannelBarHead/ChannelBarHead";


function ChannelBar({ username, userID, room, socket }) {

    const [voiceEnter, setVoiceEnter] = useState(false);

    const userAudio = useRef();
    const [peers, setPeers] = useState([]);
    const socketRef = useRef(socket);
    const peersRef = useRef([]);

    const newVoiceUser = () => {
        axios.put(`${process.env.REACT_APP_ROOM_URL}/${room}/user`, { username: username, userID: userID })
            .then((response) => {
                return;
            }).catch(e => console.log(e));
    }

    const enterVoice = () => {
        if (voiceEnter === true) return;
        setVoiceEnter(true);
        newVoiceUser();
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((stream) => {
                userAudio.current.srcObject = stream;
                socketRef.current.emit("joinVoice", room);
                socketRef.current.on("allUsers", (users) => {
                    let peers = [];
                    users.forEach((user) => {
                        const peer = createPeer(user.userID, socketRef.current.id, stream);
                        peersRef.current.push({ peerID: user.userID, peer });
                        peers.push({ peerID: user.userID, peer });
                    })
                    setPeers(peers);
                })

                socketRef.current.on("voiceJoined", (payload) => {
                    const peer = addPeer(payload.signal, payload.caller, stream);
                    peersRef.current.push({ peerID: payload.caller, peer })
                    const peerObj = {
                        peerID: payload.caller,
                        peer
                    }
                    setPeers((users) => [...users, peerObj]);
                });

                socketRef.current.on("receiveSgn", (payload) => {
                    const sgn = peersRef.current.find((peer) => peer.peerID === payload.id);
                    sgn.peer.signal(payload.signal);
                });

                socketRef.current.on("disc", (userID) => {
                    const peerObj = peersRef.current.find(peer => peer.peerID === userID);
                    if (peerObj) {
                        peerObj.peer.destroy();
                    }
                    const peers = peersRef.current.filter(peer => peer.peerID !== userID);
                    peersRef.current = peers;
                    setPeers(peers);
                })

                socketRef.current.on("voiceConfig", (payload) => {
                    setVoiceConfig(payload);
                })
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

    const [userColor, setUserColor] = useState("000");

    useEffect(() => {
        setUserColor(getColorByName(username));
    }, [username])

    const [selfVoice, setSelfVoice] = useState(true);
    const [voiceConfig, setVoiceConfig] = useState([]);

    const toggleVoice = () => {
        if (userAudio.current.srcObject) {
            userAudio.current.srcObject.getTracks().forEach((track) => {
                if (track.enabled) {
                    socketRef.current.emit("voiceConfig", [...voiceConfig, {
                        userID: socketRef.current.id,
                        selfVoice: false,
                    }]);
                    track.enabled = false;
                    setSelfVoice(false);
                } else {
                    socketRef.current.emit("voiceConfig", [...voiceConfig, {
                        userID: socketRef.current.id,
                        selfVoice: true,
                    }]);
                    track.enabled = true;
                    setSelfVoice(true);
                }
            });
        }
    }


    return (
        <div className="channel">
            <ChannelBarHead username={username} />
            <button className="channel__voice" onClick={enterVoice}> voice</button>
            {voiceEnter &&
                <div className="user">
                    <audio ref={userAudio} muted autoPlay />
                    <div className="user__avatar" style={{ "backgroundColor": `#${userColor}` }}></div>
                    <p className="user__name user__name--self">{username}</p>
                    <button className="user__status">
                        <img className="user__status--icon" src={selfVoice ? soundOnIcon : soundOffIcon} alt="sound" onClick={toggleVoice} />
                    </button>
                </div>
            }
            <div className="channel__users">
                {peers.map((peer) => {
                    return (
                        <ChannelUser key={peer.peerID} peer={peer.peer} peerID={peer.peerID} room={room} />
                    )
                })}
            </div>
        </div>
    )
}

export default ChannelBar;