import "./ConnectionsPage.css"

import { FaUserCircle } from "react-icons/fa"
import { BsChatText } from "react-icons/bs"
import { Link } from "react-router"
import { useState } from "react"
import Layout from "../components/Layout"
import { getAddedConnections, type Connection } from "../connectionsStore"

const seedConnections: Connection[] = [
    { name: 'Chris Hansen', title: 'Hamburger Cheeseburger Bigmac Whopper' },
    { name: 'Atreya Ghosh', title: "Burger Flipper @ McDonald's" },
    { name: 'Zenidy Le', title: "Hostess @ Chili's" },
    { name: 'Leo dos Remedios', title: "Delivery Boy @ Domino's Pizza" },
    { name: 'David Vu', title: 'Hostess @ Gen Korean BBQ' },
]

function ConnectionsPage() {
    // Seeded connections first, then ones added this session. Seed wins on duplicate names.
    const [connections] = useState<Connection[]>(() => {
        const seen = new Set(seedConnections.map((c) => c.name))
        const added = getAddedConnections().filter((c) => {
            if (seen.has(c.name)) return false
            seen.add(c.name)
            return true
        })
        return [...seedConnections, ...added]
    })

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