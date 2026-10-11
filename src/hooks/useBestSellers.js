import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const useBestSellers = () => {
    const [bestSellers, setBestSellers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetch = async () => {
            setIsLoading(true)
            try {
                const drinksSnap = await getDocs(collection(db, 'drinks'))
                const drinks = drinksSnap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))

                const ordersSnap = await getDocs(collection(db, 'orders'))
                const orders = ordersSnap.docs.map((doc) => doc.data())

                const counts = {}
                orders.forEach((order) => {
                    if (!order.items) return
                    order.items.forEach((item) => {
                        counts[item.name] = (counts[item.name] || 0) + 1
                    })
                })

                const sorted = [...drinks].sort((a, b) => {
                    const ca = counts[a.name] || 0
                    const cb = counts[b.name] || 0
                    return cb - ca
                })

                if (isMounted) {
                    setBestSellers(sorted.slice(0, 3))
                    setError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message)
                    setBestSellers([])
                }
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetch()

        return () => {
            isMounted = false
        }
    }, [])

    return { bestSellers, isLoading, error }
}