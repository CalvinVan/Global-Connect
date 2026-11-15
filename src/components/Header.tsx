import {MdSearch, MdOutlineHome, MdArrowBack} from 'react-icons/md'
import { BsChatText } from 'react-icons/bs'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

function Header() {
    const [query, setQuery] = useState<string>('')
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const alwaysHome = pathname === '/profile' || pathname === '/settings'

    function handleBack() {
        if (alwaysHome) navigate('/landing')
        else navigate(-1)
    }
    const showBack = pathname !== '/landing'

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const trimmed = query.trim()
        if (!trimmed) return
        navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }

    return(
        <header className="header">
            {showBack && (
                <button type="button" className="back-button" onClick={handleBack} aria-label="Go back">
                    <MdArrowBack size={28} />
                </button>
            )}
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search recruiters and jobs"
                    aria-label="Search recruiters and jobs"
                    autoComplete="off"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit" className="search-button" aria-label="Search">
                    <MdSearch size={20} />
                </button>
            </form>

            <nav className="header-icons" aria-label="Primary">
                <Link to="/landing" className="home-link" aria-label="Home">
                    <MdOutlineHome size={32} />
                </Link>
                <Link to="/connections" className="home-link" aria-label="Connections">
                    <BsChatText size={26} />
                </Link>
            </nav>
        </header>
    )
}

export default Header