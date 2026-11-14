import { FaUserCircle } from  'react-icons/fa'
import { Link } from "react-router"
import { useNavigate } from 'react-router'

type SideBarProps = {
    name: string
    firstName: string
    lastName: string
    title: string
    picture: string
}

function Sidebar({name, firstName, lastName, title, picture}: SideBarProps) {
    const navigate = useNavigate()
    const fullName = [firstName, lastName].filter(Boolean).join(" ")

    return (
        <aside className="sidebar">
            <div className="profile">
                {picture
                    ? <img className="sidebar-profile-picture" src={picture} alt={`${fullName || name}'s profile`} />
                    : <FaUserCircle size={120} color="var(--avatar-on-accent)" aria-hidden="true" />}
                <h2>{fullName || name}</h2>
                <p className="profile-handle">@{name}</p>
                <p>{title}</p>
            </div>
            <nav className="sidebar-nav">
                <Link to="/profile" className="sidebar-nav-link">Profile</Link>
                <button onClick={() => navigate('/settings')}>Settings</button>
                <button>Logout</button>
            </nav>
        </aside>

    )
}

export default Sidebar