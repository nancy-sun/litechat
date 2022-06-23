function ChatMessage({ message }) {
    return (
        <div>
            <div>avatar</div>
            <div>
                <div>
                    <p></p>
                    <p>time</p>
                    <button>delete message</button>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage;