import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export const Signup = () => {
    const navigate = useNavigate()
    const { signup } = useAuth()
    const { showToast } = useToast()

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
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

        const username = form.username.trim()
        if (!username) {
            e.username = 'Please enter a username'
        } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
            e.username = '3–20 characters. Letters, numbers, underscores only'
        }

        const email = form.email.trim()
        if (!email) {
            e.email = 'Please enter your email'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.email = 'Please enter a valid email'
        }

        if (!form.password) {
            e.password = 'Please enter a password'
        } else if (form.password.length < 6) {
            e.password = 'At least 6 characters'
        }

        if (form.password !== form.confirm) {
            e.confirm = 'Passwords do not match'
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
            await signup(form.email.trim(), form.password, form.username.trim())
            showToast('Account created! Welcome.')
            navigate('/')
        } catch (err) {
            console.error(err)

            let message = 'Could not create account'
            if (err.code === 'auth/email-already-in-use') {
                message = 'That email is already registered'
            } else if (err.code === 'auth/invalid-email') {
                message = 'That email is not valid'
            } else if (err.code === 'auth/weak-password') {
                message = 'Password is too weak'
            }

            setErrors({ general: message })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="container auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join TOPSHOP COFFEE</p>

                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    {errors.general && (
                        <div className="auth-error-banner">{errors.general}</div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className={`form-control ${errors.username ? 'error' : ''}`}
                            placeholder="sammycrabbe"
                            value={form.username}
                            onChange={setField('username')}
                            autoComplete="username"
                        />
                        {errors.username && (
                            <div className="error-message show">{errors.username}</div>
                        )}
                    </div>

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
                            placeholder="At least 6 characters"
                            value={form.password}
                            onChange={setField('password')}
                            autoComplete="new-password"
                        />
                        {errors.password && (
                            <div className="error-message show">{errors.password}</div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm"
                            className={`form-control ${errors.confirm ? 'error' : ''}`}
                            placeholder="Repeat your password"
                            value={form.confirm}
                            onChange={setField('confirm')}
                            autoComplete="new-password"
                        />
                        {errors.confirm && (
                            <div className="error-message show">{errors.confirm}</div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="hero-btn auth-submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Creating account...' : 'Create Account'}
                    </button>

                    <p className="auth-switch">
                        Already have an account?{' '}
                        <Link to="/login">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}