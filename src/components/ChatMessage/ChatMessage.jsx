function ChatMessage({ message, user, time }) {
    return (
        <div>
            <div>avatar</div>
            <div>
                <div>
                    <p>by: {user}</p>
                    <p>time: {time}</p>
                    <button>delete message</button>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage;