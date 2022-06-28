import "./ChatMessage.scss";

function ChatMessage({ message, user, time }) {
    return (
        <div className="message">
            <div className="message__avatar"></div>
            <div className="message__content">
                <div className="message__content--top">
                    <p className="message__by">{user}</p>
                    <p className="message__time">{time}</p>
                    {/* <button>delete message</button> */}
                </div>
                <p className="message__content--bottom">{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage;