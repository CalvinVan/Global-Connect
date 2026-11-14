export type Connection = { name: string; title: string }

const STORAGE_KEY = 'global-connect-added-connections'

function isConnection(value: unknown): value is Connection {
    return (
        typeof value === 'object' &&
        value !== null &&
        'name' in value &&
        'title' in value &&
        typeof value.name === 'string' &&
        typeof value.title === 'string'
    )
}


export function getAddedConnections(): Connection[] {
    try {
        const saved = sessionStorage.getItem(STORAGE_KEY)
        if (!saved) return []
        const parsed: unknown = JSON.parse(saved)
        if (!Array.isArray(parsed)) return []
        return parsed.filter(isConnection).map(({ name, title }) => ({ name, title }))
    } catch {
        
        return []
    }
}

export function addConnection(connection: Connection): void {
    const existing = getAddedConnections()
    if (existing.some((c) => c.name === connection.name)) return
    try {
        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify([...existing, { name: connection.name, title: connection.title }]),
        )
    } catch {
        // connection just won't persist across navigation
    }
}

export function isConnectionAdded(name: string): boolean {
    return getAddedConnections().some((c) => c.name === name)
}
