import { NavLink, Link } from 'react-router-dom'
import { FaCoffee, FaIceCream, FaStar, FaCaretDown } from 'react-icons/fa'
import { CartBadge } from './CartBadge'

export const NavLinks = ({ onLinkClick }) => {
    return (
        <ul className="nav navbar-nav navbar-right">
            <li>
                <NavLink to="/" end onClick={onLinkClick}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" onClick={onLinkClick}>
                    About
                </NavLink>
            </li>
            <li className="dropdown">
                <button
                    type="button"
                    className="dropdown-toggle"
                    onClick={(e) => {
                        e.preventDefault()
                        e.currentTarget.parentElement.classList.toggle('open')
                    }}
                >
                    Menu <FaCaretDown className="caret-icon" />
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link to="/menu" onClick={onLinkClick}>
                            All Drinks
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Link to="/menu?category=coffee" onClick={onLinkClick}>
                            <FaCoffee /> Coffee
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu?category=cold" onClick={onLinkClick}>
                            <FaIceCream /> Cold Drinks
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu?category=special" onClick={onLinkClick}>
                            <FaStar /> Specialty
                        </Link>
                    </li>
                </ul>
            </li>
            <li>
                <NavLink to="/contact" onClick={onLinkClick}>
                    Contact
                </NavLink>
            </li>
            <li>
                <NavLink to="/orders" onClick={onLinkClick}>
                    Orders
                </NavLink>
            </li>
            <li>
                <Link to="/cart" onClick={onLinkClick} className="cart-link">
                    Cart <CartBadge />
                </Link>
            </li>
        </ul>
    )
}