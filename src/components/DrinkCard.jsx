import { useState } from 'react'
import { QuantitySelector } from './QuantitySelector'

export const DrinkCard = ({ drink, onAdd }) => {
    const [qty, setQty] = useState(1)

    const handleAdd = () => {
        onAdd(drink, qty)
        setQty(1)
    }

    const imgSrc = drink.image ? `/imgs/${drink.image}` : '/imgs/cof1.jpg'

    return (
        <div className="drink-item">
            <div className="thumbnail">
                <img src={imgSrc} alt={drink.name} />

                <div className="caption">
                    <h4>{drink.name}</h4>
                    <span className="drink-price">${drink.price}</span>

                    <QuantitySelector value={qty} onChange={setQty} />

                    <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={handleAdd}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}