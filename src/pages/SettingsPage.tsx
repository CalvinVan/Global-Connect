import "./ConnectionsPage.css"
import "./SettingsPage.css"

import Layout from "../components/Layout"

// Purely visual settings view: controls are uncontrolled and nothing is saved.

const languages = [
    { value: 'en-US', label: 'English (US)' },
    { value: 'es', label: 'Español' },
    { value: 'zh', label: '中文' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'ko', label: '한국어' },
    { value: 'pt', label: 'Português' },
]

const timeZones = [
    { value: 'America/New_York', label: 'Eastern (UTC−5)' },
    { value: 'America/Chicago', label: 'Central (UTC−6)' },
    { value: 'America/Denver', label: 'Mountain (UTC−7)' },
    { value: 'America/Los_Angeles', label: 'Pacific (UTC−8)' },
]

const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
]

function SettingsPage() {
    return (
        <Layout>
            <h1 className="page-title">Settings</h1>

            <div className="settings">
                <section className="settings-section" aria-labelledby="general-heading">
                    <h2 id="general-heading" className="settings-heading">General preferences</h2>

                    <div className="settings-row">
                        <div className="settings-label">
                            <label htmlFor="language">Language</label>
                            
                        </div>
                        <select id="language" className="settings-control" defaultValue="en-US">
                            {languages.map((language) => (
                                <option key={language.value} value={language.value}>{language.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="settings-row">
                        <div className="settings-label">
                            <label htmlFor="location">Location</label>
                    
                        </div>
                        <input
                            id="location"
                            className="settings-control"
                            type="text"
                            defaultValue="Dallas, TX"
                            autoComplete="off"
                        />
                    </div>

                    <div className="settings-row">
                        <div className="settings-label">
                            <label htmlFor="timezone">Time zone</label>
                      
                        </div>
                        <select id="timezone" className="settings-control" defaultValue="America/Chicago">
                            {timeZones.map((zone) => (
                                <option key={zone.value} value={zone.value}>{zone.label}</option>
                            ))}
                        </select>
                    </div>
                </section>

                <section className="settings-section" aria-labelledby="display-heading">
                    <h2 id="display-heading" className="settings-heading">Display</h2>

                    <fieldset className="settings-themes">
                        <legend className="settings-legend">Theme</legend>
                        <div className="settings-theme-options">
                            {themes.map((theme) => (
                                <label key={theme.value} className="settings-theme-option">
                                    {/* Miniature of the app shell: sidebar strip, header bar, list rows */}
                                    <div className={`settings-preview settings-preview--${theme.value}`} aria-hidden="true">
                                        <span className="settings-preview-sidebar" />
                                        <span className="settings-preview-main">
                                            <span className="settings-preview-header" />
                                            <span className="settings-preview-row" />
                                            <span className="settings-preview-row settings-preview-row--short" />
                                            <span className="settings-preview-row" />
                                        </span>
                                    </div>
                                    <span className="settings-theme-caption">
                                        <input
                                            type="radio"
                                            name="theme"
                                            value={theme.value}
                                            defaultChecked={theme.value === 'light'}
                                        />
                                        {theme.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </section>
            </div>
        </Layout>
    )
}

export default SettingsPage
