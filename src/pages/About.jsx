import { Link } from 'react-router-dom'
import { FaStar, FaHeart, FaCheckCircle, FaGlassCheers } from 'react-icons/fa'
import { FeatureBox } from '../components/FeatureBox'
import { StatItem } from '../components/StatItem'

export const About = () => {
    return (
        <div className="container about-container">
            <h2 className="section-title center">
                About <span>Us</span>
            </h2>

            <p className="menu-subtitle">
                Discover the story behind TOPSHOP COFFEE
            </p>

            <div className="about-card">
                <h4 className="about-card-title">
                    ☕ Welcome to <span>TOPSHOP COFFEE</span>
                </h4>

                <p>
                    Where passion meets perfection in every cup. We are a premium coffee
                    brand dedicated to bringing you the finest handcrafted beverages using
                    only the highest quality beans sourced from around the world.
                </p>

                <p>
                    Our mission is simple: to deliver exceptional service, great vibes,
                    and unforgettable coffee experiences to our customers. From our
                    skilled baristas to our carefully curated menu, every detail is
                    designed with you in mind.
                </p>
            </div>

            <div className="feature-boxes">
                <FeatureBox
                    icon={<FaStar />}
                    title="Premium Quality"
                    text="We source the finest coffee beans from around the world to ensure every cup is perfect."
                />
                <FeatureBox
                    icon={<FaHeart />}
                    title="Made with Love"
                    text="Every drink is handcrafted with passion and care by our skilled baristas."
                />
                <FeatureBox
                    icon={<FaCheckCircle />}
                    title="5-Star Service"
                    text="Your satisfaction is our priority. We go above and beyond for every customer."
                />
            </div>

            <section className="stats-section">
                <StatItem number="3+" label="Years Experience" />
                <StatItem number="10+" label="Coffee Varieties" />
                <StatItem number="5K+" label="Happy Customers" />
                <StatItem number="4.9★" label="Average Rating" />
            </section>

            <div className="about-cta">
                <p>Ready to experience the best coffee of your life?</p>

                <Link to="/menu" className="hero-btn">
                    <FaGlassCheers /> Explore Our Menu
                </Link>
            </div>
        </div>
    )
}