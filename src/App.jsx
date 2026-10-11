import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Menu } from './pages/Menu'
import { Cart } from './pages/Cart'
import { Orders } from './pages/Orders'
import { Contact } from './pages/Contact'
import { Missing } from './pages/Missing'
import { DrinkDetail } from './pages/DrinkDetail'
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Missing />} />
          <Route path="/drink/:id" element={<DrinkDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App