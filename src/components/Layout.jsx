import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = () => {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '100px' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}