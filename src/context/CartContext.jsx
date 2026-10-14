import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'

const CartContext = createContext({})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
    const { currentUser, loading } = useAuth()
    const { showToast } = useToast()
    const storageKey = currentUser ? `coffeeCart_${currentUser.uid}` : null
    const [cart, setCart] = useState([])
    const prevKeyRef = useRef(null)

    useEffect(() => {
        if (loading) return

        const prevKey = prevKeyRef.current
        prevKeyRef.current = storageKey

        if (!storageKey) {
            if (prevKey) setCart([])
            return
        }

        let savedCart = []
        try {
            const stored = localStorage.getItem(storageKey)
            savedCart = stored ? JSON.parse(stored) : []
        } catch {
            savedCart = []
        }

        if (prevKey === null && cart.length > 0) {
            const merged = [...savedCart]
            cart.forEach((guestItem) => {
                const idx = merged.findIndex((i) => i.name === guestItem.name)
                if (idx >= 0) {
                    merged[idx] = {
                        ...merged[idx],
                        quantity: merged[idx].quantity + guestItem.quantity,
                    }
                } else {
                    merged.push(guestItem)
                }
            })
            setCart(merged)

            if (savedCart.length > 0) {
                showToast('Guest cart merged with your saved cart','info')
            }
        } else {
            setCart(savedCart)
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