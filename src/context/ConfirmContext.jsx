import { createContext, useContext, useState, useRef } from 'react'

const ConfirmContext = createContext({})

export const useConfirm = () => useContext(ConfirmContext)

export const ConfirmProvider = ({ children }) => {
    const [dialog, setDialog] = useState(null)
    const resolverRef = useRef(null)

    const confirm = (options) => {
        return new Promise((resolve) => {
            resolverRef.current = resolve
            setDialog(options)
        })
    }

    const handleConfirm = () => {
        if (resolverRef.current) {
            resolverRef.current(true)
            resolverRef.current = null
        }
        setDialog(null)
    }

    const handleCancel = () => {
        if (resolverRef.current) {
            resolverRef.current(false)
            resolverRef.current = null
        }
        setDialog(null)
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {dialog && (
                <div className="confirm-backdrop" onClick={handleCancel}>
                    <div
                        className="confirm-dialog"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <h3 className="confirm-title">{dialog.title}</h3>

                        {dialog.message && (
                            <p className="confirm-message">{dialog.message}</p>
                        )}

                        <div className="confirm-actions">
                            <button
                                type="button"
                                className="confirm-btn confirm-btn-cancel"
                                onClick={handleCancel}
                            >
                                {dialog.cancelText || 'Cancel'}
                            </button>

                            <button
                                type="button"
                                className="confirm-btn confirm-btn-confirm"
                                onClick={handleConfirm}
                            >
                                {dialog.confirmText || 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmContext.Provider>
    )
}