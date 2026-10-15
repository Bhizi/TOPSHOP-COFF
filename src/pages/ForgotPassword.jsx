import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export const ForgotPassword = () => {
    const { resetPassword } = useAuth()
    const { showToast } = useToast()

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const trimmed = email.trim()
        if (!trimmed) {
            setError('Please enter your email')
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
            setError('Please enter a valid email')
            return
        }

        setSubmitting(true)

        try {
            await resetPassword(trimmed)
            setSent(true)
            showToast('Reset link sent! Check your email.')
        } catch (err) {
            console.error(err)
            let message = 'Could not send reset link'
            if (err.code === 'auth/user-not-found') {
                message = 'No account found with that email'
            } else if (err.code === 'auth/invalid-email') {
                message = 'That email is not valid'
            } else if (err.code === 'auth/too-many-requests') {
                message = 'Too many attempts. Try again later'
            }
            setError(message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="container auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Reset Password</h2>
                <p className="auth-subtitle">
                    Enter your email and we'll send you a reset link
                </p>

                {sent ? (
                    <div className="auth-success">
                        <p>
                            If an account exists for <strong>{email}</strong>, a
                            password reset link has been sent.
                        </p>
                        <p>Check your inbox and spam folder.</p>
                        <Link to="/login" className="hero-btn auth-submit">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        {error && (
                            <div className="auth-error-banner">{error}</div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${error ? 'error' : ''}`}
                                placeholder="sammy@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (error) setError('')
                                }}
                                autoComplete="email"
                            />
                        </div>

                        <button
                            type="submit"
                            className="hero-btn auth-submit"
                            disabled={submitting}
                        >
                            {submitting ? 'Sending...' : 'Send Reset Link'}
                        </button>

                        <p className="auth-switch">
                            Remember your password?{' '}
                            <Link to="/login">Log In</Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    )
}