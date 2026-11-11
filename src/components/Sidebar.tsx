import { FaUserCircle } from  'react-icons/fa'
import { useNavigate } from 'react-router'

type SideBarProps = {
    name: string
    title: string
}

function Sidebar({name, title}: SideBarProps) {
    const navigate = useNavigate()

    return (
        <aside className="sidebar">
            <div className="profile">
                <FaUserCircle size={120} color="#0b7a3b" />
                <h2>{name}</h2>
                <p>{title}</p>
            </div>
            <nav className="sidebar-nav">
                <button>Profile</button>
                <button onClick={() => navigate('/settings')}>Settings</button>
                <button>Logout</button>
            </nav>
        </aside>

    )
}

export default Sidebar