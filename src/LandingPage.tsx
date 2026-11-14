import "./LandingPage.css"

import { FaUserCircle } from "react-icons/fa"
import Layout from "./components/Layout"

const connections = [
    { id: 1, name: 'Atreya Ghosh', title: "Burger Flipper @ McDonald's" },
    { id: 2, name: 'Tom Holland', title: 'Actor' },
    { id: 3, name: 'Zendy Le', title: "Hostess @ Chili's" },
    { id: 4, name: 'Leo dos Remedios', title: "Delivery Boy @ Domino's Pizza" },
    { id: 5, name: 'Calvin Van', title: 'Line Cook @ Waffle House' },
    { id: 6, name: 'David Vu', title: 'Hostess @ Gen Korean BBQ' },
]

function LandingPage() {
    return (
        <Layout>
            <ul className="dashboard-connections">
                {connections.map((connection) => (
                    <li key={connection.id} className="dashboard-row">
                        <FaUserCircle className="dashboard-avatar" aria-hidden="true" />
                        <div className="dashboard-info">
                            <p className="dashboard-name">{connection.name}</p>
                            <p className="dashboard-title">{connection.title}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default LandingPage
