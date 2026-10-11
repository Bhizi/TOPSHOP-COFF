import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useConfirm } from '../context/ConfirmContext'
import { CartItem } from '../components/CartItem'
import { CartSummary } from '../components/CartSummary'

export const Cart = () => {
    const {
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
    } = useCart()
    const { showToast } = useToast()
    const { confirm } = useConfirm()

    const handleUpdateQuantity = (name, delta) => {
        updateQuantity(name, delta)
    }

    const handleRemove = async (name) => {
        const confirmed = await confirm({
            title: 'Remove item?',
            message: `Remove ${name} from your cart?`,
            confirmText: 'Remove',
            cancelText: 'Keep',
        })

        if (!confirmed) return

        removeFromCart(name)
        showToast(`${name} removed from cart`)
    }

    const handleCheckout = async () => {
        if (cart.length === 0) {
            showToast('Your cart is empty')
            return
        }

        const itemSummary = cart
            .map((item) => `${item.name} x${item.quantity}`)
            .join('\n')

        const confirmed = await confirm({
            title: 'Confirm your order?',
            message: `${itemSummary}\n\nTotal: $${totalPrice.toFixed(2)}`,
            confirmText: 'Place Order',
            cancelText: 'Go Back',
        })

        if (!confirmed) return

        const orderData = {
            items: cart.map((item) => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            total: totalPrice,
            date: new Date().toISOString(),
        }

        const history = JSON.parse(localStorage.getItem('orderHistory')) || []
        history.push(orderData)
        localStorage.setItem('orderHistory', JSON.stringify(history))

        clearCart()
        showToast('Order placed! Thank you.')
    }

    if (cart.length === 0) {
        return (
            <div className="container cart-container">
                <h2 className="cart-title">
                    Your <span>Shopping Cart</span>
                </h2>

                <div className="empty-cart">
                    <div className="icon">
                        <FaShoppingCart />
                    </div>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any drinks yet.</p>
                    <Link to="/menu" className="btn-shop">
                        Browse Drinks
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container cart-container">
            <h2 className="cart-title">
                Your <span>Shopping Cart</span>
            </h2>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.map((item) => (
                        <CartItem
                            key={item.name}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>

                <div className="cart-sidebar">
                    <CartSummary
                        totalItems={totalItems}
                        totalPrice={totalPrice}
                        onCheckout={handleCheckout}
                    />
                </div>
            </div>
        </div>
    )
}