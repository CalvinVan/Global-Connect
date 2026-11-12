
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from './LandingPage.tsx'
import MessagePage from './pages/MessagePage.tsx'
import ConnectionsPage from './pages/ConnectionsPage.tsx'
import SearchPage from './pages/SearchPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter  basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/connections" element={<ConnectionsPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
