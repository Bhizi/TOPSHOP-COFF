import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { QuantitySelector } from '../components/QuantitySelector'

export const DrinkDetail = () => {
    const { id } = useParams()
    const { addToCart } = useCart()
    const { showToast } = useToast()

    const [drink, setDrink] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [qty, setQty] = useState(1)

    useEffect(() => {
        let isMounted = true

        const fetchDrink = async () => {
            setIsLoading(true)
            try {
                const ref = doc(db, 'drinks', id)
                const snapshot = await getDoc(ref)

                if (!snapshot.exists()) {
                    if (isMounted) {
                        setError('Drink not found')
                        setDrink(null)
                    }
                    return
                }

                if (isMounted) {
                    setDrink({ id: snapshot.id, ...snapshot.data() })
                    setError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message)
                    setDrink(null)
                }
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetchDrink()

        return () => {
            isMounted = false
        }
    }, [id])

    const handleAdd = () => {
        if (!drink) return
        addToCart(drink, qty)
        showToast(`${qty}x ${drink.name} added to cart!`)
        setQty(1)
    }

    if (isLoading) {
        return (
            <div className="container drink-detail-container">
                <p className="status-msg">Loading drink...</p>
            </div>
        )
    }

    if (error || !drink) {
        return (
            <div className="container drink-detail-container">
                <div className="empty-cart">
                    <h3>Drink Not Found</h3>
                    <p>That drink doesn't exist or has been removed.</p>
                    <Link to="/menu" className="btn-shop">
                        Back to Menu
                    </Link>
                </div>
            </div>
        )
    }

    const imgSrc = drink.image ? `/imgs/${drink.image}` : '/imgs/cof1.jpg'

    return (
        <div className="container drink-detail-container">
            <Link to="/menu" className="back-link">
                <FaArrowLeft /> Back to Menu
            </Link>

            <div className="drink-detail">
                <div className="drink-detail-image">
                    <img src={imgSrc} alt={drink.name} />
                </div>

                <div className="drink-detail-info">
                    <span className="drink-detail-category">{drink.category}</span>
                    <h1>{drink.name}</h1>
                    <p className="drink-detail-price">${drink.price}</p>

                    <p className="drink-detail-description">
                        A handcrafted drink made with the finest ingredients. Perfect for
                        any time of day.
                    </p>

                    <div className="drink-detail-actions">
                        <QuantitySelector value={qty} onChange={setQty} />

                        <button
                            type="button"
                            className="hero-btn drink-detail-add"
                            onClick={handleAdd}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}