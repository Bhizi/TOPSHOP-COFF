import { useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaCoffee, FaIceCream, FaStar, FaCaretDown } from 'react-icons/fa'
import { CartBadge } from './CartBadge'

export const NavLinks = ({ onLinkClick }) => {
    const dropdownRef = useRef(null)

    const closeDropdown = () => {
        if (dropdownRef.current) {
            dropdownRef.current.classList.remove('open')
        }
    }

    const handleDropdownToggle = (e) => {
        e.preventDefault()
        if (dropdownRef.current) {
            dropdownRef.current.classList.toggle('open')
        }
    }

    const handleMenuItemClick = () => {
        closeDropdown()
        if (onLinkClick) onLinkClick()
    }

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
            <li className="dropdown" ref={dropdownRef}>
                <button
                    type="button"
                    className="dropdown-toggle"
                    onClick={handleDropdownToggle}
                >
                    Menu <FaCaretDown className="caret-icon" />
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link to="/menu" onClick={handleMenuItemClick}>
                            All Drinks
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Link to="/menu?category=coffee" onClick={handleMenuItemClick}>
                            <FaCoffee /> Coffee
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu?category=cold" onClick={handleMenuItemClick}>
                            <FaIceCream /> Cold Drinks
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu?category=special" onClick={handleMenuItemClick}>
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