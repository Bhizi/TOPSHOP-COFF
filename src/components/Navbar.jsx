import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NavLinks } from './NavLinks'

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    const closeMenu = () => setMenuOpen(false)

    return (
        <nav className="navbar navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand" onClick={closeMenu}>
                        <span>
                            <img
                                alt="Logo"
                                src="/imgs/MILKSHAKE.jpg"
                                srcSet="/imgs/MILKSHAKE.jpg 600w"
                                sizes="(max-width: 767px) 35px, 45px"
                            />
                        </span>
                        TOPSHOP COFFEE
                    </Link>

                    <button
                        type="button"
                        className="navbar-toggle"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Toggle navigation"
                    >
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                </div>

                <div className={`collapse navbar-collapse ${menuOpen ? 'in' : ''}`}>
                    <NavLinks onLinkClick={closeMenu} />
                </div>
            </div>
        </nav>
    )
}