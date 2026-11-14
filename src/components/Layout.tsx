import { createContext, useContext, useState, type ReactNode } from 'react'
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import "./Layout.css"

export type Profile = {
    name: string
    firstName: string
    lastName: string
    title: string
    picture: string
    school: string
    skills: string[]
    experiences: string[]
    resume: { fileName: string; data: string } | null
}

const defaultProfile: Profile = {
    name: "Avatar",
    firstName: "",
    lastName: "",
    title: "Student_at_University_of_Texas_at_Dallas",
    picture: "",
    school: "",
    skills: [],
    experiences: [],
    resume: null,
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every((item) => typeof item === "string")
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
                const resume = "resume" in profile &&
                    typeof profile.resume === "object" &&
                    profile.resume !== null &&
                    "fileName" in profile.resume &&
                    "data" in profile.resume &&
                    typeof profile.resume.fileName === "string" &&
                    typeof profile.resume.data === "string"
                    ? { fileName: profile.resume.fileName, data: profile.resume.data }
                    : null

                const username = profile.name.replace(/[^A-Za-z0-9_.-]/g, "_")
                return {
                    name: username || "user",
                    firstName: "firstName" in profile && typeof profile.firstName === "string" ? profile.firstName : "",
                    lastName: "lastName" in profile && typeof profile.lastName === "string" ? profile.lastName : "",
                    title: profile.title,
                    picture: profile.picture,
                    school: "school" in profile && typeof profile.school === "string" ? profile.school : "",
                    skills: "skills" in profile && isStringArray(profile.skills) ? profile.skills : [],
                    experiences: "experiences" in profile && isStringArray(profile.experiences) ? profile.experiences : [],
                    resume,
                }
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
                <Sidebar
                    name={profile.name}
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    title={profile.title}
                    picture={profile.picture}
                />
                <div className="main">
                    <Header />
                    <main className="content">{children}</main>
                </div>
            </div>
        </ProfileContext.Provider>
    )
}

export default Layout
