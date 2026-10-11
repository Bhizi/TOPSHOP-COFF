import { Link } from 'react-router-dom'
import { FaGlassCheers } from 'react-icons/fa'
import { DrinkCard } from './DrinkCard'

export const BestSellers = ({ drinks, onAdd }) => {
    return (
        <div className="container">
            <h2 className="section-title center best-sellers-title">
                Our <span>Best Sellers</span>
            </h2>

            <p className="menu-subtitle">
                Customer favorites you'll love!
            </p>

            <div className="best-sellers-grid">
                {drinks.map((drink) => (
                    <DrinkCard key={drink.id} drink={drink} onAdd={onAdd} />
                ))}
            </div>

            <div className="view-menu-wrap">
                <Link to="/menu" className="hero-btn">
                    <FaGlassCheers /> View Full Menu
                </Link>
            </div>
        </div>
    )
}