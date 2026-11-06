import { useEffect, useRef, useState, type MouseEvent, type SyntheticEvent } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import './AddConnectionModal.css'

type AddConnectionModalProps = {
    name: string
    onSend: (message: string) => void
    onClose: () => void
}

function AddConnectionModal({ name, onSend, onClose }: AddConnectionModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [draft, setDraft] = useState('')
    const [sent, setSent] = useState(false)

    // showModal() makes the rest of the page unclickable while the popup is open
    useEffect(() => {
        const dialog = dialogRef.current
        dialog?.showModal()
        return () => dialog?.close()
    }, [])

    // Esc key: let React state decide when the popup closes
    const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
        event.preventDefault()
        onClose()
    }

    // clicking the dimmed background (the dialog itself, not its content) closes it
    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) onClose()
    }

    const sendMessage = () => {
        const text = draft.trim()
        if (!text) return
        onSend(text)
        setSent(true)
    }

    return (
        <dialog
            ref={dialogRef}
            className="connection-modal"
            aria-labelledby="connection-modal-title"
            onCancel={handleCancel}
            onClick={handleBackdropClick}
        >
            <div className="connection-modal-body">
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                    <MdClose size={28} />
                </button>

                <header className="modal-header">
                    <FaUserCircle className="modal-avatar" aria-hidden="true" />
                    <h2 id="connection-modal-title">{name}</h2>
                </header>

                {sent ? (
                    <div className="modal-success" role="status">
                        <p className="modal-success-title">Message sent!</p>
                        <p>Your connection request was sent to {name}.</p>
                        <button type="button" className="modal-action" onClick={onClose}>
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <textarea
                            className="modal-message"
                            value={draft}
                            onChange={(event) => setDraft(event.target.value)}
                            placeholder="Send Introductory Message"
                            aria-label="Introductory message"
                        />
                        <button
                            type="button"
                            className="modal-action"
                            onClick={sendMessage}
                            disabled={!draft.trim()}
                        >
                            Send Message
                        </button>
                    </>
                )}
            </div>
        </dialog>
    )
}

export default AddConnectionModal
