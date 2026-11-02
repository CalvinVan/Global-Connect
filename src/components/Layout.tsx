import type { ReactNode } from 'react'
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import "./Layout.css"




function Layout({ children } : { children: ReactNode}){
    return(
        <div className="layout">
            <Sidebar name="Avatar" title="Student at University of Texas at Dallas"/>
            <div className="main">
                <Header />
                <main className="content">{ children }</main>
            </div>
        </div>
    )
}

export default Layout
