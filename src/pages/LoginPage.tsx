import "./LoginPage.css"

import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { BsGlobe } from "react-icons/bs"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const trimmedEmail = email.trim()

        if (!trimmedEmail || !password) {
            setMessage("Enter your email and password to log in.")
            return
        }

        // TODO: replace with a real authentication request once the backend exists
        setMessage('')
        navigate('/landing')
    }

    return (
        // login is shown before the user has a profile, so it does not use Layout (no sidebar/header)
        <div className="login-page">
            <div className="login-brand">
                <BsGlobe size={40} aria-hidden="true" />
                <h1 className="login-brand-name">Global-Connect</h1>
            </div>

            <form className="login-form" onSubmit={handleLogin} noValidate>
                <h2 className="login-title">Log in</h2>
                <p className="login-intro">Welcome back. Log in to see your connections.</p>

                <label className="login-field">
                    Email
                    <input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>

                <label className="login-field">
                    Password
                    <div className="login-password">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <button
                            type="button"
                            className="login-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <MdVisibilityOff size={22} /> : <MdVisibility size={22} />}
                        </button>
                    </div>
                </label>

                {message && (
                    <p className="login-message" role="alert">{message}</p>
                )}

                <button type="submit" className="login-button">Log in</button>

                <p className="login-footer">
                    New to Global-Connect? <Link to="/signup" className="login-link">Create an account</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage
