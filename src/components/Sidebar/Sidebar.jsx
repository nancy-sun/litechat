import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <nav className="sidebar">
            <div>
                <Link to="/">temp user profile</Link>
            </div>
            <div>
                <Link to="/">create new chat room</Link>
                <Link to="/">search for chat room</Link>
                <Link to="/">backtohomepage</Link>
            </div>
        </nav>
    )
}

export default Sidebar;