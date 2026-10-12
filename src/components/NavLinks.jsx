import { useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaCoffee, FaIceCream, FaStar, FaCaretDown } from 'react-icons/fa'
import { CartBadge } from './CartBadge'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export const NavLinks = ({ onLinkClick }) => {
    const dropdownRef = useRef(null)
    const { currentUser, logout } = useAuth()
    const { showToast } = useToast()

    const handleLogout = async () => {
        try {
            await logout()
            showToast('Signed out')
            if (onLinkClick) onLinkClick()
        } catch (err) {
            console.error(err)
        }
    }

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

            {currentUser ? (
                <li className="user-menu">
                    <span className="user-name">{currentUser.displayName}</span>
                    <button
                        type="button"
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </li>
            ) : (
                <>
                    <li>
                        <NavLink to="/login" onClick={onLinkClick}>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" onClick={onLinkClick}>
                            Sign Up
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    )
}