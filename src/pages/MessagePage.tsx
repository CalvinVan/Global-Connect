import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import Layout from '../components/Layout'
import './MessagePage.css'

type Sender = 'me' | 'them'

interface Message {
    id: number
    sender: Sender
    text: string
}

const initialMessages: Message[] = [
    { id: 1, sender: 'me', text: 'Hello' },
    { id: 2, sender: 'them', text: 'Hello' },
]

function MessagePage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [draft, setDraft] = useState('')
    const endRef = useRef<HTMLDivElement>(null)
    const nextId = useRef(initialMessages.length + 1)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const addMessage = (sender: Sender, text: string) => {
        setMessages((previousMessages) => [...previousMessages, { id: nextId.current++, sender, text }])
    }

    const sendMessage = () => {
        const text = draft.trim()
        if (!text) return
        addMessage('me', text)
        setDraft('')
        window.setTimeout(() => addMessage('them', 'Thanks for reaching out!'), 900)
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    return (
        <Layout>
            <section className="message-page">
                <header className="message-header">
                    <FaUserCircle className="message-avatar" aria-hidden="true" />
                    <h1>Generic Connection</h1>
                </header>

                <div className="message-list" role="log" aria-live="polite">
                    {messages.map((message) => (
                        <div key={message.id} className={`message-bubble ${message.sender}`}>
                            {message.text}
                        </div>
                    ))}
                    <div ref={endRef} />
                </div>

                <div className="message-composer">
                    <input
                        type="text"
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Send Message"
                        aria-label="Send Message"
                    />
                    <button
                        type="button"
                        className="send-button"
                        onClick={sendMessage}
                        disabled={!draft.trim()}
                        aria-label="Send"
                    >
                        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                            <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </section>
        </Layout>
    )
}

export default MessagePage
