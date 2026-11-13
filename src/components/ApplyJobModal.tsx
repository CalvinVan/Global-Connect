import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent, type SyntheticEvent } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import './ApplyJobModal.css'
import './AddConnectionModal.css'

type ApplyJobModalProps = {
    company: string
    role: string
    description: string
    connections: string[]
    onApply: () => void
    onClose: () => void
}


function ApplyJobModal({company, role, description, connections, onApply, onClose}: ApplyJobModalProps){
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [resume, setResume] = useState<File | null>(null) // this will store a resume that we can send in
    const [referral, setReferral] = useState('') //Store referral given to job
    const [applied, setApplied] = useState(false) // store state on whether to job as already been applied for
    
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
    
    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) onClose()
    }

    const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        setResume(event.target.files?.[0] ?? null)
    }

    const submitApplication = () => {
        if (!resume) return
        onApply()
        setApplied(true)
    }

    return(
        <dialog
            ref={dialogRef}
            className= "connection-modal"
            aria-labelledby= "job-modal-title"
            onCancel= {handleCancel}
            onClick= {handleBackdropClick}
        >
            <div className = "connection-modal-body">
                <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                    <MdClose size={28} />
                </button>

                <header className = "modal-header">
                    <FaBriefcase className="modal-avatar" aria-hidden="true" />
                    <div>
                        <h2 id= "job-modal-title">{role}</h2>
                        <p className="modal-subtitle">{company}</p>
                    </div>
                </header>
            
            {applied ? (
                <div className="modal-success" role="status">
                    <p className="modal-success-title"> Application submitted!</p>
                    <p>Your application for {role} at {company} was sent with {resume?.name}.</p>
                    {referral && <p>Referred by {referral}.</p>}
                    <button type="button" className= "modal-action" onClick={onClose}> Close </button>

                </div>
            ) : (
                <>
                <p>test</p>
                </>
            )}

            </div>



        </dialog>
    )
}

export default ApplyJobModal