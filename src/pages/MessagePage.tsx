import React, { useEffect, useRef, useState } from "react";
import "./MessagePage.css";

type Sender = "me" | "them";

interface Message {
  id: number;
  sender: Sender;
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: "me", text: "Hello" },
  { id: 2, sender: "them", text: "Hello" },
];

const Avatar: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="32" r="14" fill="none" stroke="currentColor" strokeWidth="6" />
    <path d="M20 78 A30 26 0 0 1 80 78" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const Connections: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(initialMessages.length + 1);

  // Keep the newest message in view
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (sender: Sender, text: string) =>
    setMessages((prev) => [...prev, { id: nextId.current++, sender, text }]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    addMessage("me", text);
    setDraft("");

    // Demo-only reply. Remove this and call your API / websocket instead.
    setTimeout(() => addMessage("them", "Thanks for reaching out!"), 900);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="page">
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-avatar">
            <Avatar className="profile-avatar-icon" />
          </div>
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-title">Student at University of Texas at Dallas</p>
        </div>
        <nav className="sidebar-nav">
          <button type="button">Profile</button>
          <button type="button">Settings</button>
          <button type="button">Logout</button>
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <div className="search">
            <button type="button" className="icon-btn" aria-label="Menu">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
            <input type="text" placeholder="Search for recruiters, jobs, etc." aria-label="Search" />
            <button type="button" className="icon-btn" aria-label="Search">
              <svg viewBox="0 0 24 24" width="18" height="18"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M15 15l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>

          <button type="button" className="icon-btn home-btn" aria-label="Home">
            <svg viewBox="0 0 24 24" width="34" height="34"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>
          </button>

          <div className="topbar-title">
            <span>Connections</span>
            <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M3 12h18M5 7h14M5 17h14" stroke="currentColor" strokeWidth="1.6" /></svg>
          </div>
        </header>

        <section className="chat">
          <div className="chat-header">
            <div className="chat-avatar">
              <Avatar className="chat-avatar-icon" />
            </div>
            <h1>Generic Connection</h1>
          </div>

          <div className="messages" role="log" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="composer">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send Message"
              aria-label="Send Message"
            />
            <button
              type="button"
              className="send-btn"
              onClick={sendMessage}
              disabled={!draft.trim()}
              aria-label="Send"
            >
              <svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Connections;
