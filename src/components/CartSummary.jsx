import { Link } from 'react-router-dom'

export const CartSummary = ({ totalItems, totalPrice, onCheckout }) => {
    return (
        <div className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
                <span>Items:</span>
                <span>{totalItems}</span>
            </div>

            <div className="summary-row">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
                type="button"
                className="btn-checkout"
                onClick={onCheckout}
            >
                Checkout
            </button>

            <Link to="/menu" className="btn-continue">
                Continue Shopping
            </Link>
        </div>
    )
}