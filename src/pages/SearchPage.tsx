import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import Layout from '../components/Layout'
import AddConnectionModal from '../components/AddConnectionModal'
import ApplyJobModal from '../components/ApplyJobModal'
import './SearchPage.css'

type SearchResult = {
    id: number
    name: string
    title: string
    kind: 'person' | 'job'
    done: boolean // connection request sent / job applied
}

const initialResults: SearchResult[] = [
    { id: 1, name: 'Bruce Wayne', title: 'CEO @ Wayne Tech Industries', kind: 'person', done: false },
    { id: 2, name: 'Chris Hansen', title: 'TV Host @ Dateline NBC', kind: 'person', done: true },
    { id: 3, name: 'Zendaya', title: 'Actress', kind: 'person', done: false },
    { id: 4, name: "McDonald's", title: 'Team Member', kind: 'job', done: false },
    { id: 5, name: 'Hamburger Cheeseburger Bigmac Whopper', title: 'Hamburger Cheeseburger Bigmac Whopper', kind: 'job', done: true },
    { id: 6, name: 'Joe Biden', title: 'Former President @ United States of America', kind: 'person', done: false },
]

function buttonLabel(result: SearchResult) {
    if (result.kind === 'person') return result.done ? 'Connection Added' : 'Add Connection'
    return result.done ? 'Job Applied' : 'Apply for this job'
}

function SearchPage() {
    const [results, setResults] = useState(initialResults)
    const [selected, setSelected] = useState<SearchResult | null>(null)

    const markConnected = (id: number) => {
        setResults((previous) => previous.map((result) => (result.id === id ? { ...result, done: true } : result)))
    }

    return (
        <Layout>
            <ul className="search-results">
                {results.map((result) => (
                    <li key={result.id} className="search-row">
                        <FaUserCircle className="search-avatar" aria-hidden="true" />
                        <div className="search-info">
                            <p className="search-name">{result.name}</p>
                            <p className="search-title">{result.title}</p>
                        </div>
                        <button
                            type="button"
                            className="search-action"
                            disabled={result.done}
                            onClick={result.kind === 'person' ? () => setSelected(result) : undefined}
                        >
                            {buttonLabel(result)}
                        </button>
                    </li>
                ))}
            </ul>

            {selected && (
                <AddConnectionModal
                    name={selected.name}
                    onSend={() => markConnected(selected.id)}
                    onClose={() => setSelected(null)}
                />
            )}
        </Layout>
    )
}

export default SearchPage
