import { createContext, useContext, useRef, useState } from 'react'
import { ToastContainer } from '../components/ToastContainer'

const ToastContext = createContext({})

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])
    const nextId = useRef(0)

    const showToast = (message, type = 'success') => {
        const id = nextId.current++
        setToasts((prev) => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 3500)
    }

    const dismissToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
        </ToastContext.Provider>
    )
}