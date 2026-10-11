export const QuantitySelector = ({ value, onChange }) => {
    return (
        <div className="qty-selector">
            <div className="qty-controls">
                <button
                    type="button"
                    className="qty-minus"
                    onClick={() => onChange(Math.max(1, value - 1))}
                >
                    −
                </button>
                <span className="qty-display">{value}</span>
                <button
                    type="button"
                    className="qty-plus"
                    onClick={() => onChange(value + 1)}
                >
                    +
                </button>
            </div>
        </div>
    )
}
