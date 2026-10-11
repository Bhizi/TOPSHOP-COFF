import { Link } from 'react-router-dom'
import { FaGlassCheers, FaChevronDown } from 'react-icons/fa'

export const Hero = () => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-content text-center">
                    <h1 className="hero-title">
                        Welcome to <span>TOPSHOP</span>
                    </h1>

                    <p className="hero-subtitle">
                        <FaGlassCheers /> Premium Coffee • Exceptional Service • Great Vibes
                    </p>

                    <Link to="/menu" className="hero-btn">
                        <FaChevronDown /> Explore Our Menu
                    </Link>
                </div>
            </div>
        </section>
    )
}