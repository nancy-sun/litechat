import ChannelUsers from "../ChannelUsers/ChannelUsers";

function ChannelBar() {
    return (
        <div>
            <div>
                <p>Room ID: </p>
                <button>share room id</button>
            </div>
            <ChannelUsers />
            <div>
                <button>mic</button>
                <button>sound</button>
                {/* (tbd)sound settings */}
            </div>
            {/* self */}
            <ChannelUsers />
        </div>
    )
}

export default ChannelBar;