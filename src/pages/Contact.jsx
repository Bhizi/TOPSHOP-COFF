import { ContactForm } from '../components/ContactForm'
import { ContactInfo } from '../components/ContactInfo'

export const Contact = () => {
    return (
        <div className="container contact-container">
            <h2 className="section-title center">
                Contact <span>Us</span>
            </h2>

            <p className="menu-subtitle">
                We'd love to hear from you! Reach out to us anytime.
            </p>

            <div className="contact-grid">
                <ContactForm />
                <ContactInfo />
            </div>
        </div>
    )
}