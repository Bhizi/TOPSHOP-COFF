import { FaTimes } from 'react-icons/fa'

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const imgSrc = item.image ? `/imgs/${item.image}` : '/imgs/cof1.jpg'

    return (
        <div className="cart-item">
            <img src={imgSrc} alt={item.name} className="item-image" />

            <div className="item-info">
                <h4>{item.name}</h4>
                <span className="item-price">${item.price.toFixed(2)}</span>
            </div>

            <div className="item-actions">
                <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.name, -1)}
                >
                    −
                </button>
                <span className="qty-number">{item.quantity}</span>
                <button
                    type="button"
                    className="qty-btn"
                    onClick={() => onUpdateQuantity(item.name, 1)}
                >
                    +
                </button>
                <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemove(item.name)}
                    aria-label={`Remove ${item.name}`}
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    )
}