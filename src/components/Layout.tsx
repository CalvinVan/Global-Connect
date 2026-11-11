import { createContext, useContext, useState, type ReactNode } from 'react'
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import "./Layout.css"

export type Profile = {
    name: string
    title: string
    picture: string
}

const defaultProfile: Profile = {
    name: "Avatar",
    title: "Student_at_University_of_Texas_at_Dallas",
    picture: "",
}

function loadProfile(): Profile {
    try {
        const savedProfile = localStorage.getItem("global-connect-profile")
        if (savedProfile) {
            const profile: unknown = JSON.parse(savedProfile)
            if (
                typeof profile === "object" &&
                profile !== null &&
                "name" in profile &&
                "title" in profile &&
                "picture" in profile &&
                typeof profile.name === "string" &&
                typeof profile.title === "string" &&
                typeof profile.picture === "string"
            ) {
                return { name: profile.name, title: profile.title, picture: profile.picture }
            }
        }
    } catch {
        // Use the default profile if browser storage is unavailable or invalid.
    }
    return defaultProfile
}

type ProfileContextValue = {
    profile: Profile
    saveProfile: (profile: Profile) => void
}

const ProfileContext = createContext<ProfileContextValue | null>(null)

// This hook is intentionally colocated with the provider that owns its state.
// eslint-disable-next-line react-refresh/only-export-components
export function useProfile() {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error("useProfile must be used within Layout")
    }
    return context
}

function Layout({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState(loadProfile)

    function saveProfile(updatedProfile: Profile) {
        localStorage.setItem("global-connect-profile", JSON.stringify(updatedProfile))
        setProfile(updatedProfile)
    }

    return (
        <ProfileContext.Provider value={{ profile, saveProfile }}>
            <div className="layout">
                <Sidebar name={profile.name} title={profile.title} picture={profile.picture} />
                <div className="main">
                    <Header />
                    <main className="content">{children}</main>
                </div>
            </div>
        </ProfileContext.Provider>
    )
}

export default Layout
