import "./ConnectionsPage.css"
import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { FaUserCircle } from "react-icons/fa"
import { BsChatText } from "react-icons/bs"
import { Link } from "react-router"

const connections = [
    { id: 1, name: 'Chris Hansen', title: 'Hamburger Cheeseburger Bigmac Whopper' },
    { id: 2, name: 'Atreya Ghosh', title: "Burger Flipper @ McDonald's" },
    { id: 3, name: 'Zenidy Le', title: "Hostess @ Chili's" },
    { id: 4, name: 'Leo dos Remedios', title: "Delivery Boy @ Domino's Pizza" },
    { id: 5, name: 'David Vu', title: 'Hostess @ Gen Korean BBQ' },
]

function ConnectionsPage() {
    return (
    <div className="layout">
        <Sidebar name="Avatar" title="Student at University of Texas at Dallas" />
        <div className="main">
            <Header />
            <main className="content">
                <h1 className="page-title">Connections</h1>
                
                {/* Mapping logic to map out all the names from the connections list about */}
                <ul className="connections-display">
                    {connections.map((connection) =>(
                        <li key={connection.id} className="connection-row">
                            <FaUserCircle size={48} color="#cfcdcd" />
                            <div className="connection-info">
                                <p className="connection-name">{connection.name}</p>
                                <p className="connection-title">{connection.title}</p>
                            </div>
                            <Link to="/messages">
                            <button className="message-button">
                                <BsChatText size={26} />
                                
                            </button>
                            </Link>
                        </li>
                        ))} 
                </ul>
            </main>
        </div>
    </div>
    )
}

export default ConnectionsPage