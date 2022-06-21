import ChatMessage from "../ChatMessage/ChatMessage"

function TextChannel() {
    return (
        <div>
            <div>
                <p>Text channel</p>
                <form>
                    <label htmlFor="messageHistory">
                        <input name="messageHistory" type="text" />
                    </label>
                </form>
                <button>?</button>
            </div>
            <div className="message__section">
                <ChatMessage />
            </div>
            <form className="message__input">
                <label htmlFor="message">
                    <input type="text" name="message" />
                </label>
            </form>
        </div>
    )
}

export default TextChannel;