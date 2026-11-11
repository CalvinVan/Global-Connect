export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'global-connect-theme'

function isTheme(value: unknown): value is Theme {
    return value === 'light' || value === 'dark'
}

// Saved choice first, then the OS preference, then light.
export function getInitialTheme(): Theme {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (isTheme(saved)) return saved
    } catch {
        // storage blocked (private mode etc.) — fall through
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function getCurrentTheme(): Theme {
    const current = document.documentElement.dataset.theme
    return isTheme(current) ? current : 'light'
}

export function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme
}

export function setTheme(theme: Theme) {
    applyTheme(theme)
    try {
        localStorage.setItem(STORAGE_KEY, theme)
    } catch {
        // preference just won't persist
    }
}
