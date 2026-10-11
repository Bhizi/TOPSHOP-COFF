export const ToastContainer = ({ toasts, onDismiss }) => {
    return (
        <div id="toastContainer">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="toast-item"
                    onClick={() => onDismiss(toast.id)}
                >
                    <div className="toast-content">
                        <span className="toast-icon">✅</span>
                        <span>{toast.message}</span>
                    </div>
                    <span className="toast-close">&times;</span>
                </div>
            ))}
        </div>
    )
}