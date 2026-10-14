import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()
    const { showToast } = useToast()

    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [submitting, setSubmitting] = useState(false)

    const setField = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validate = () => {
        const e = {}

        const email = form.email.trim()
        if (!email) {
            e.email = 'Please enter your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.email = 'Please enter a valid email'
        }

        if (!form.password) {
            e.password = 'Please enter your password'
        }

        return e
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) return

        setSubmitting(true)

        try {
            await login(form.email.trim(), form.password)
            showToast('Welcome back!')
            const from = location.state?.from?.pathname || '/'
            navigate(from, { replace: true })
        } catch (err) {
            console.error(err)

            let message = 'Could not sign in'
            if (
                err.code === 'auth/invalid-credential' ||
                err.code === 'auth/wrong-password' ||
                err.code === 'auth/user-not-found'
            ) {
                message = 'Invalid email or password'
            } else if (err.code === 'auth/invalid-email') {
                message = 'That email is not valid'
            } else if (err.code === 'auth/too-many-requests') {
                message = 'Too many attempts. Try again later'
            }

            setErrors({ general: message })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="container auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your account</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {errors.general && (
                        <div className="auth-error-banner">{errors.general}</div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className={`form-control ${errors.email ? 'error' : ''}`}
                            placeholder="sammy@example.com"
                            value={form.email}
                            onChange={setField('email')}
                            autoComplete="email"
                        />
                        {errors.email && (
                            <div className="error-message show">{errors.email}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className={`form-control ${errors.password ? 'error' : ''}`}
                            placeholder="Your password"
                            value={form.password}
                            onChange={setField('password')}
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <div className="error-message show">{errors.password}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="hero-btn auth-submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Signing in...' : 'Log In'}
                    </button>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}