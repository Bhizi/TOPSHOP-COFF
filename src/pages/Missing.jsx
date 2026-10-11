import { Link } from 'react-router-dom'

export const Missing = () => {
    return (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/">Go Home</Link>
        </div>
    )
}