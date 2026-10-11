import { FaTrash } from 'react-icons/fa'

export const OrderCard = ({ order, orderNumber, onDelete }) => {
    const formattedDate = new Date(order.date).toLocaleString()

    return (
        <div className="order-card">
            <div className="order-header">
                <h4>Order #{orderNumber}</h4>
                <div className="order-header-right">
                    <span className="order-date">{formattedDate}</span>
                    <button
                        type="button"
                        className="order-delete-btn"
                        onClick={() => onDelete()}
                        aria-label={`Delete order ${orderNumber}`}
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>

            <div className="order-items">
                {order.items.map((item) => (
                    <div key={item.name} className="order-item-row">
                        <span>
                            {item.name}{' '}
                            <span className="order-item-qty">x{item.quantity}</span>
                        </span>
                        <span className="order-item-price">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="order-total">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
            </div>
        </div>
    )
}