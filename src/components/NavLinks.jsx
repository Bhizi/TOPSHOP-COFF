import { useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
    FaCoffee,
    FaIceCream,
    FaStar,
    FaCaretDown,
    FaClipboardList,
    FaSignOutAlt,
} from 'react-icons/fa'
import { CartBadge } from './CartBadge'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export const NavLinks = ({ onLinkClick }) => {
    const menuDropdownRef = useRef(null)
    const userDropdownRef = useRef(null)
    const { currentUser, logout } = useAuth()
    const { showToast } = useToast()
    const navigate = useNavigate()

    const closeMenuDropdown = () => {
        if (menuDropdownRef.current) {
            menuDropdownRef.current.classList.remove('open')
        }
    }

    const handleMenuToggle = (e) => {
        e.preventDefault()
        if (userDropdownRef.current) {
            userDropdownRef.current.classList.remove('open')
        }
        if (menuDropdownRef.current) {
            menuDropdownRef.current.classList.toggle('open')
        }
    }

    const handleUserToggle = (e) => {
        e.preventDefault()
        if (menuDropdownRef.current) {
            menuDropdownRef.current.classList.remove('open')
        }
        if (userDropdownRef.current) {
            userDropdownRef.current.classList.toggle('open')
        }
    }

    const handleMenuItemClick = () => {
        closeMenuDropdown()
        if (onLinkClick) onLinkClick()
    }

    const handleLogout = async () => {
        try {
            await logout()
            showToast('Signed out')
            if (userDropdownRef.current) {
                userDropdownRef.current.classList.remove('open')
            }
            if (onLinkClick) onLinkClick()
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    const handleUserMenuClick = (path) => {
        if (userDropdownRef.current) {
            userDropdownRef.current.classList.remove('open')
        }
        if (onLinkClick) onLinkClick()
        navigate(path)
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
            <li className="dropdown" ref={menuDropdownRef}>
                <button
                    type="button"
                    className="dropdown-toggle"
                    onClick={handleMenuToggle}
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
                <Link to="/cart" onClick={onLinkClick} className="cart-link">
                    Cart <CartBadge />
                </Link>
            </li>

            {currentUser ? (
                <li className="dropdown user-dropdown" ref={userDropdownRef}>
                    <button
                        type="button"
                        className="dropdown-toggle user-toggle"
                        onClick={handleUserToggle}
                    >
                        <span className="user-avatar">
                            {currentUser.displayName.charAt(0).toUpperCase()}
                        </span>
                        {currentUser.displayName}
                        <FaCaretDown className="caret-icon" />
                    </button>
                    <ul className="dropdown-menu user-dropdown-menu">
                        <li>
                            <button
                                type="button"
                                className="dropdown-item-btn"
                                onClick={() => handleUserMenuClick('/orders')}
                            >
                                <FaClipboardList /> My Orders
                            </button>
                        </li>
                        <li className="divider" />
                        <li>
                            <button
                                type="button"
                                className="dropdown-item-btn"
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </ul>
                </li>
            ) : (
                <>
                    <li>
                        <NavLink to="/login" onClick={onLinkClick} className="nav-login">
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" onClick={onLinkClick} className="nav-signup">
                            Sign Up
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    )
}