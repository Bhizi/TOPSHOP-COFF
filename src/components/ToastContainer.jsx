export const ToastContainer = ({ toasts, onDismiss }) => {
    return (
        <div id="toastContainer">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`toast-item toast-${toast.type || 'success'}`}
                    onClick={() => onDismiss(toast.id)}
                >
                    <div className="toast-content">
                        <span className="toast-icon">
                            {toast.type === 'info' ? 'ℹ️' : '✅'}
                        </span>
                        <span>{toast.message}</span>
                    </div>
                    <span className="toast-close">&times;</span>
                </div>
            ))}
        </div>
    )
}