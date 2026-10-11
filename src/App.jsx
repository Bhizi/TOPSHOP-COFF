import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Menu } from './pages/Menu'
import { Cart } from './pages/Cart'
import { Orders } from './pages/Orders'
import { Contact } from './pages/Contact'
import { Missing } from './pages/Missing'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App