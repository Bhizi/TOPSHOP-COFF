import { Link } from 'react-router-dom'
import { FaHome, FaInfoCircle, FaUtensils, FaEnvelope } from 'react-icons/fa'

export const Footer = () => {
    return (
        <footer className="container-fluid">
            <div className="container">
                <div className="footer-content">
                    <h3>TOPSHOP COFFEE</h3>
                    <p>Your premium destination for quality drinks and exceptional service.</p>
                    <p>
                        <small>Handcrafted with love, served with passion.</small>
                    </p>

                    <div className="social-icons">
                        <Link to="/">
                            <FaHome />
                        </Link>
                        <Link to="/about">
                            <FaInfoCircle />
                        </Link>
                        <Link to="/menu">
                            <FaUtensils />
                        </Link>
                        <Link to="/contact">
                            <FaEnvelope />
                        </Link>
                    </div>

                    <div className="copyright">
                        &copy; 2026 TOPSHOP COFFEE. All Rights Reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}