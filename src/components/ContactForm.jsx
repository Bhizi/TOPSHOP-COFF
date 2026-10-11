import { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { useToast } from '../context/ToastContext'

export const ContactForm = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [errors, setErrors] = useState({})
    const { showToast } = useToast()

    const setField = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Please enter your name'

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!form.email.trim() || !emailPattern.test(form.email.trim())) {
            e.email = 'Please enter a valid email address'
        }

        if (!form.subject.trim()) e.subject = 'Please enter a subject'
        if (!form.message.trim()) e.message = 'Please enter your message'

        return e
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validationErrors = validate()
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            return
        }

        showToast('Message sent! We will get back to you soon.')
        setForm({ name: '', email: '', subject: '', message: '' })
        setErrors({})
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <h4 className="contact-form-title">Send Us a Message</h4>

            <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={setField('name')}
                />
                {errors.name && (
                    <div className="error-message show">{errors.name}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={setField('email')}
                />
                {errors.email && (
                    <div className="error-message show">{errors.email}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                    type="text"
                    id="subject"
                    className={`form-control ${errors.subject ? 'error' : ''}`}
                    placeholder="Subject"
                    value={form.subject}
                    onChange={setField('subject')}
                />
                {errors.subject && (
                    <div className="error-message show">{errors.subject}</div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    rows="5"
                    className={`form-control ${errors.message ? 'error' : ''}`}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={setField('message')}
                />
                {errors.message && (
                    <div className="error-message show">{errors.message}</div>
                )}
            </div>

            <button type="submit" className="hero-btn contact-submit">
                <FaPaperPlane /> Send Message
            </button>
        </form>
    )
}