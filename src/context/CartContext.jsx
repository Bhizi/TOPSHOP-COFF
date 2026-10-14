import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
    const { currentUser, loading } = useAuth()

    const storageKey = currentUser ? `coffeeCart_${currentUser.uid}` : null

    const [cart, setCart] = useState([])

    useEffect(() => {
        if (loading) return

        if (!storageKey) {
            setCart([])
            return
        }

        try {
            const stored = localStorage.getItem(storageKey)
            setCart(stored ? JSON.parse(stored) : [])
        } catch {
            setCart([])
        }
    }, [storageKey, loading])

    useEffect(() => {
        if (loading) return
        if (!storageKey) return

        try {
            localStorage.setItem(storageKey, JSON.stringify(cart))
        } catch {
            console.warn('Failed to save cart')
        }
    }, [storageKey, cart, loading])

    const addToCart = (drink, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.name === drink.name)
            if (existing) {
                return prev.map((item) =>
                    item.name === drink.name
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
            }
            return [
                ...prev,
                {
                    name: drink.name,
                    price: drink.price,
                    image: drink.image,
                    quantity,
                },
            ]
        })
    }

    const removeFromCart = (name) => {
        setCart((prev) => prev.filter((item) => item.name !== name))
    }

    const updateQuantity = (name, delta) => {
        setCart((prev) =>
            prev
                .map((item) =>
                    item.name === name
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const clearCart = () => {
        setCart([])
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}