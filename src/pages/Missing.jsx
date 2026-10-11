import { Link } from 'react-router-dom'

export const Missing = () => {
    return (
        <div className="container missing-container">
            <h1 className="missing-code">404</h1>
            <h2 className="missing-title">Page Not Found</h2>
            <p className="missing-text">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="hero-btn">
                Go Home
            </Link>
        </div>
    )
}