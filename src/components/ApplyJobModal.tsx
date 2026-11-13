import { useEffect, useRef, type ChangeEvent, type MouseEvent, type SynteheticEvent } from 'react'
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


function ApplyJobModal({company, role, description, onApply, onClose}){
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

    const handleResumeChange = (event: ChangeEvent<HTMLInputElement) => {
        setResume(event.target.files?[0] ?? null)
    }

    const submitApplication = () => {
        if (!resume) return
        onApply()
        setApplied(true)
    }

    return(
        <p>hi</p>
    )
}

export default ApplyJobModal