import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <>
            <header className="navbar navbar-fixed-top">
                <div className="container">
                    <p style={{ color: 'white', padding: '20px 0' }}>
                        NAVBAR PLACEHOLDER
                    </p>
                </div>
            </header>

            <main style={{ paddingTop: '100px' }}>
                <Outlet />
            </main>

            <footer className="container-fluid">
                <div className="container">
                    <div className="footer-content">
                        <h3>TOPSHOP COFFEE</h3>
                        <p>Your premium destination for quality drinks and exceptional service.</p>
                        <div className="copyright">
                            &copy; 2026 TOPSHOP COFFEE. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}