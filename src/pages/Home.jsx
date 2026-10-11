import { useBestSellers } from '../hooks/useBestSellers'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { Hero } from '../components/Hero'
import { BestSellers } from '../components/BestSellers'

export const Home = () => {
    const { bestSellers, isLoading, error } = useBestSellers()
    const { addToCart } = useCart()
    const { showToast } = useToast()

    const handleAdd = (drink, qty) => {
        addToCart(drink, qty)
        showToast(`${qty}x ${drink.name} added to cart!`)
    }

    return (
        <div>
            <Hero />

            {isLoading && (
                <div className="container">
                    <p className="status-msg">Loading best sellers...</p>
                </div>
            )}

            {!isLoading && error && (
                <div className="container">
                    <p className="status-msg error">Error: {error}</p>
                </div>
            )}

            {!isLoading && !error && bestSellers.length > 0 && (
                <BestSellers drinks={bestSellers} onAdd={handleAdd} />
            )}

            {!isLoading && !error && bestSellers.length === 0 && (
                <div className="container">
                    <p className="status-msg">No best sellers yet.</p>
                </div>
            )}
        </div>
    )
}