import { FaUserCircle } from  'react-icons/fa'
import { Link } from "react-router"

type SideBarProps = {
    name: string
    title: string
    picture: string
}

function Sidebar({ name, title, picture }: SideBarProps) {
    return (
        <aside className="sidebar">
            <div className="profile">
                {picture
                    ? <img className="sidebar-profile-picture" src={picture} alt={`${name}'s profile`} />
                    : <FaUserCircle size={120} color="#0b7a3b" aria-hidden="true" />}
                <h2>{name}</h2>
                <p>{title}</p>
            </div>
            <nav className="sidebar-nav">
                <Link to="/profile" className="sidebar-nav-link">Profile</Link>
                <button>Settings</button>
                <button>Logout</button>
            </nav>
        </aside>

    )
}

export default Sidebar