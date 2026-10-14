import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'

export const useBestSellers = () => {
    const { currentUser } = useAuth()
    const [bestSellers, setBestSellers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetch = async () => {
            setIsLoading(true)
            try {
                const drinksSnap = await getDocs(collection(db, 'drinks'))
                const drinks = drinksSnap.docs.map((d) => ({ id: d.id, ...d.data() }))

                const counts = {}
                if (currentUser) {
                    const ordersSnap = await getDocs(collection(db, 'orders'))
                    ordersSnap.docs.forEach((d) => {
                        const order = d.data()
                        if (!order.items) return
                        order.items.forEach((item) => {
                            counts[item.name] = (counts[item.name] || 0) + 1
                        })
                    })
                }

                const sorted = [...drinks].sort(
                    (a, b) => (counts[b.name] || 0) - (counts[a.name] || 0)
                )

                if (isMounted) {
                    setBestSellers(sorted.slice(0, 3))
                    setError(null)
                }
            } catch (err) {
                if (isMounted) setError(err.message)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetch()
        return () => {
            isMounted = false
        }
    }, [currentUser])

    return { bestSellers, isLoading, error }
}