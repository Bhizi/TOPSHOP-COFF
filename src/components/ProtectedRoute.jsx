import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="container">
                <p className="status-msg">Loading...</p>
            </div>
        )
    }

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}