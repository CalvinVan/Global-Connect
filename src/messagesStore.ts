export type Sender = 'me' | 'them'
export type ChatMessage = { id: number; sender: Sender; text: string }

// One object for the session: connection name -> that connection's chat history.
const STORAGE_KEY = 'global-connect-messages'

export const DEFAULT_THREAD: ChatMessage[] = [
    { id: 1, sender: 'me', text: 'Hello' },
    { id: 2, sender: 'them', text: 'Hello' },
]

function isChatMessage(value: unknown): value is ChatMessage {
    return (
        typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'sender' in value &&
        'text' in value &&
        typeof value.id === 'number' &&
        (value.sender === 'me' || value.sender === 'them') &&
        typeof value.text === 'string'
    )
}

function readAll(): Record<string, ChatMessage[]> {
    try {
        const saved = sessionStorage.getItem(STORAGE_KEY)
        if (!saved) return {}
        const parsed: unknown = JSON.parse(saved)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {}
        const threads: Record<string, ChatMessage[]> = {}
        for (const [name, thread] of Object.entries(parsed)) {
            if (!Array.isArray(thread)) continue
            threads[name] = thread.filter(isChatMessage).map(({ id, sender, text }) => ({ id, sender, text }))
        }
        return threads
    } catch {
        // storage blocked or invalid JSON — treat as no saved history
        return {}
    }
}

// Saved history for this connection, or null when nothing is saved yet.
export function getMessages(name: string): ChatMessage[] | null {
    const threads = readAll()
    return Object.hasOwn(threads, name) ? threads[name] : null
}

export function appendMessage(
    name: string,
    sender: Sender,
    text: string,
    base: ChatMessage[] = DEFAULT_THREAD,
): ChatMessage[] {
    const threads = readAll()
    const existing = Object.hasOwn(threads, name) ? threads[name] : base
    const id = Math.max(0, ...existing.map((message) => message.id)) + 1
    const updated = [...existing, { id, sender, text }]
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...threads, [name]: updated }))
    } catch {
        // history just won't persist across navigation
    }
    return updated
}
