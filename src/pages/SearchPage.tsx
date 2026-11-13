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
    description?: string // this will be for jobs. ? makes it optional
}

const initialResults: SearchResult[] = [
    { id: 1, name: 'Bruce Wayne', title: 'CEO @ Wayne Tech Industries', kind: 'person', done: false },
    { id: 2, name: 'Chris Hansen', title: 'TV Host @ Dateline NBC', kind: 'person', done: true },
    { id: 3, name: 'Zendaya', title: 'Actress', kind: 'person', done: false },
    { id: 4, name: "McDonald's", title: 'Team Member', kind: 'job', done: false, description: 'Lorem Ipsum Burger Flipper Role' },
    { id: 5, name: 'Hamburger Cheeseburger Bigmac Whopper', title: 'Hamburger Cheeseburger Bigmac Whopper', kind: 'job', done: true, description: "Bigmac Bigmac Description" },
    { id: 6, name: 'Joe Biden', title: 'Former President @ United States of America', kind: 'person', done: false },
]

function buttonLabel(result: SearchResult) {
    if (result.kind === 'person') return result.done ? 'Connection Added' : 'Add Connection'
    return result.done ? 'Job Applied' : 'Apply for this job'
}

function SearchPage() {
    const [results, setResults] = useState(initialResults)
    const [selected, setSelected] = useState<SearchResult | null>(null)

    const markDone = (id: number) => {
        setResults((previous) => previous.map((result) => (result.id === id ? { ...result, done: true } : result)))
    }

    const referralConnections = results.filter((result) => result.kind === 'person' && result.done).map((result) => result.name) // this essentially creates a list of people who are marked as "connected" for the purpose of choosing who you want as a referral
    

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
                            onClick={() => setSelected(result)} //previously it was person specific now it is allowed for both person and joob
                        >
                            {buttonLabel(result)}
                        </button>
                    </li>
                ))}
            </ul>
            
            {/* if below selected if person, we want to open up connection model */}
            {selected?.kind === 'person' && (
                <AddConnectionModal
                    name={selected.name}
                    onSend={() => markDone(selected.id)}
                    onClose={() => setSelected(null)}
                />
            )}

           
             
            {/* below it will be logic for apply job modal but is commented out since it hasn't been implemented yet 
            
            {selected?.kind === 'job' && (
                <ApplyJobModal
                parameters here
                
                />
            )}  

             */}
            
        
        </Layout>
    )
}

export default SearchPage
