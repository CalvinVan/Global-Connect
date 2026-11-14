import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useSearchParams } from 'react-router'
import { FaUserCircle } from 'react-icons/fa'
import Layout from '../components/Layout'
import { appendMessage, DEFAULT_THREAD, getMessages, type ChatMessage, type Sender } from '../messagesStore'
import './MessagePage.css'

function MessagePage() {
    const [searchParams] = useSearchParams()
    const name = searchParams.get('name')

    return (
        <Layout>
            {/* keyed by name so switching connections loads that connection's thread */}
            <MessageThread key={name ?? ''} name={name} />
        </Layout>
    )
}

function MessageThread({ name }: { name: string | null }) {
    const [messages, setMessages] = useState<ChatMessage[]>(() =>
        name ? (getMessages(name) ?? DEFAULT_THREAD) : DEFAULT_THREAD,
    )
    const [draft, setDraft] = useState('')
    const endRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const addMessage = (sender: Sender, text: string) => {
        if (name) {
            setMessages(appendMessage(name, sender, text))
            return
        }
        // no connection selected: keep the chat in memory only
        setMessages((previousMessages) => [
            ...previousMessages,
            { id: Math.max(0, ...previousMessages.map((message) => message.id)) + 1, sender, text },
        ])
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
        <section className="message-page">
            <header className="message-header">
                <FaUserCircle className="message-avatar" aria-hidden="true" />
                <h1>{name || 'Generic Connection'}</h1>
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
    )
}

export default MessagePage
