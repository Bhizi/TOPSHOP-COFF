import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
} from 'react-icons/fa'

const InfoItem = ({ icon, children }) => (
    <div className="contact-info-item">
        <span className="contact-info-icon">{icon}</span>
        <div className="contact-info-text">{children}</div>
    </div>
)

export const ContactInfo = () => {
    return (
        <div className="contact-info">
            <h4 className="contact-form-title">Get in Touch</h4>

            <InfoItem icon={<FaMapMarkerAlt />}>
                <p>123 Coffee Street</p>
                <p>City, State 12345</p>
            </InfoItem>

            <InfoItem icon={<FaPhone />}>
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
            </InfoItem>

            <InfoItem icon={<FaEnvelope />}>
                <p>info@topshopcoffee.com</p>
                <p>support@topshopcoffee.com</p>
            </InfoItem>

            <InfoItem icon={<FaClock />}>
                <p>
                    <strong>Mon-Fri:</strong> 7:00 AM - 9:00 PM
                </p>
                <p>
                    <strong>Sat-Sun:</strong> 8:00 AM - 8:00 PM
                </p>
            </InfoItem>

            <div className="contact-socials">
                <h5>Follow Us</h5>
                <div className="social-icons">
                    <a href="#" aria-label="Facebook">
                        <FaFacebookF />
                    </a>
                    <a href="#" aria-label="Twitter">
                        <FaTwitter />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="#" aria-label="YouTube">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </div>
    )
}