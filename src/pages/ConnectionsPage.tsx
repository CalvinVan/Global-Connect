import "./ConnectionsPage.css"

import { FaUserCircle } from "react-icons/fa"
import { BsChatText } from "react-icons/bs"
import { Link } from "react-router"
import { useState } from "react"
import Layout from "../components/Layout"
import { getAllConnections } from "../connectionsStore"

function ConnectionsPage() {
    const [connections] = useState(() => getAllConnections())

    return (
            <Layout>
                <h1 className="page-title">Connections</h1>   
                {/* Mapping logic to map out all the names from the connections list about */}
                <ul className="connections-display">
                    {connections.map((connection) =>(
                        <li key={connection.name} className="connection-row">
                            <FaUserCircle size={48} color="var(--icon-muted)" />
                            <div className="connection-info">
                                <p className="connection-name">{connection.name}</p>
                                <p className="connection-title">{connection.title}</p>
                            </div>
                            <Link to={`/messages?name=${encodeURIComponent(connection.name)}`}>
                            <button className="message-button">
                                <BsChatText size={26} />
                                
                            </button>
                            </Link>
                        </li>
                        ))} 
                </ul>
            </Layout>

    )
}

export default ConnectionsPage