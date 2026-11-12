import { useState, type ChangeEvent, type FormEvent } from "react"
import { FaUserCircle } from "react-icons/fa"
import Layout, { useProfile } from "../components/Layout"

const MAX_NAME_LENGTH = 60
const MAX_STATUS_LENGTH = 120
const PROFILE_TEXT_PATTERN = "[A-Za-z0-9_.-]+"
const PROFILE_TEXT_REGEX = /^[A-Za-z0-9_.-]+$/

function ProfileForm() {
    const { profile, saveProfile } = useProfile()
    const [name, setName] = useState(profile.name)
    const [title, setTitle] = useState(profile.title)
    const [picture, setPicture] = useState(profile.picture)
    const [message, setMessage] = useState("")

    function handlePictureChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setMessage("Choose an image file.")
            event.target.value = ""
            return
        }
        if (file.size > 2 * 1024 * 1024) {
            setMessage("Choose an image smaller than 2 MB.")
            event.target.value = ""
            return
        }

        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setPicture(reader.result)
                setMessage("")
            }
        }
        reader.onerror = () => setMessage("The selected image could not be loaded.")
        reader.readAsDataURL(file)
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const updatedProfile = { name: name.trim(), title: title.trim(), picture }
        if (!updatedProfile.name || !updatedProfile.title) {
            setMessage("Display name and status are required.")
            return
        }
        if (!PROFILE_TEXT_REGEX.test(updatedProfile.name) || !PROFILE_TEXT_REGEX.test(updatedProfile.title)) {
            setMessage("Display name and status can contain only letters, numbers, underscores, hyphens, and periods.")
            return
        }
        if (updatedProfile.name.length > MAX_NAME_LENGTH || updatedProfile.title.length > MAX_STATUS_LENGTH) {
            setMessage(`Display name must be ${MAX_NAME_LENGTH} characters or fewer and status must be ${MAX_STATUS_LENGTH} characters or fewer.`)
            return
        }

        try {
            saveProfile(updatedProfile)
            setMessage("Profile saved.")
        } catch {
            setMessage("Your profile could not be saved. Check your browser storage and try again.")
        }
    }

    return (
        <section className="profile-page">
            <h1 className="profile-page-title">Your profile</h1>
            <p className="profile-page-intro">Personalize how you appear to your connections.</p>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-picture-preview">
                    {picture
                        ? <img src={picture} alt="Profile preview" />
                        : <FaUserCircle aria-hidden="true" />}
                </div>
                <label className="profile-field">
                    Profile picture
                    <input type="file" accept="image/*" onChange={handlePictureChange} />
                    <span className="profile-field-hint">Image files up to 2 MB</span>
                </label>
                <label className="profile-field">
                    Display name
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        maxLength={MAX_NAME_LENGTH}
                        pattern={PROFILE_TEXT_PATTERN}
                        title="Use only letters, numbers, underscores, hyphens, and periods."
                        required
                    />
                    <span className="profile-field-hint">
                        {name.length}/{MAX_NAME_LENGTH} characters. Use letters, numbers, _, -, and . only.
                    </span>
                </label>
                <label className="profile-field">
                    Current status
                    <input
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Full_Stack_Engineer_at_Company"
                        maxLength={MAX_STATUS_LENGTH}
                        pattern={PROFILE_TEXT_PATTERN}
                        title="Use only letters, numbers, underscores, hyphens, and periods. Spaces are not allowed."
                        required
                    />
                    <span className="profile-field-hint">
                        {title.length}/{MAX_STATUS_LENGTH} characters. Use letters, numbers, _, -, and . only.
                    </span>
                </label>
                <div className="profile-form-footer">
                    <p className="profile-form-message" role="status">{message}</p>
                    <button className="profile-save-button" type="submit">Save changes</button>
                </div>
            </form>
        </section>
    )
}

function ProfilePage() {
    return (
        <Layout>
            <ProfileForm />
        </Layout>
    )
}

export default ProfilePage
