import { DrinkCard } from './DrinkCard'

export const MenuGrid = ({ drinks, onAdd }) => {
    return (
        <div className="menu-grid">
            {drinks.map((drink) => (
                <DrinkCard key={drink.id} drink={drink} onAdd={onAdd} />
            ))}
        </div>
    )
}