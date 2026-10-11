import { useCart } from '../context/CartContext'

export const CartBadge = () => {
    const { totalItems } = useCart()

    return <span className="cart-badge">{totalItems}</span>
}