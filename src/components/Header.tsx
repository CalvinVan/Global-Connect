import {MdSearch, MdOutlineHome} from 'react-icons/md'
import { BsGlobe } from 'react-icons/bs'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Header() {
    const [query, setQuery] = useState<string>('')
    const navigate = useNavigate()

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const trimmed = query.trim()
        if (!trimmed) return
        navigate(`/search?q=${encodeURIComponent(trimmed)}`)
    }

    return(
        <header className="header">Global-Connect
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

            <Link to="/" className="home-link">
                <MdOutlineHome size={32} />
            </Link>

            <Link to="/connections" className="connections-link">
                Connections <BsGlobe size={28} />
            </Link>
        </header>
    )
}

export default Header