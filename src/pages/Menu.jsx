import { useState, useMemo } from 'react'
import { useDrinks } from '../hooks/useDrinks'
import { useCart } from '../context/CartContext'
import { SearchBar } from '../components/SearchBar'
import { CategoryTabs } from '../components/CategoryTabs'
import { MenuGrid } from '../components/MenuGrid'

export const Menu = () => {
    const { drinks, isLoading, error } = useDrinks()
    const { addToCart } = useCart()

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')

    const filteredDrinks = useMemo(() => {
        return drinks.filter((drink) => {
            const categories = (drink.category || '')
                .trim()
                .toLowerCase()
                .split(' ')

            const matchesCategory =
                category === 'all' || categories.includes(category)

            const matchesSearch =
                drink.name.toLowerCase().includes(search.toLowerCase())

            return matchesCategory && matchesSearch
        })
    }, [drinks, category, search])

    const handleAdd = (drink, qty) => {
        addToCart(drink, qty)
    }

    if (isLoading) {
        return (
            <div className="container">
                <p className="status-msg">Loading drinks...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container">
                <p className="status-msg error">Error: {error}</p>
            </div>
        )
    }

    return (
        <div className="container">
            <h2 className="section-title center">
                Our <span>Menu</span>
            </h2>

            <p className="menu-subtitle">
                Discover our handcrafted selection of premium beverages
            </p>

            <SearchBar value={search} onChange={setSearch} />

            <CategoryTabs active={category} onChange={setCategory} />

            {filteredDrinks.length === 0 ? (
                <p className="status-msg">No drinks match your search.</p>
            ) : (
                <MenuGrid drinks={filteredDrinks} onAdd={handleAdd} />
            )}
        </div>
    )
}