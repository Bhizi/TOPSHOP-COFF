import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'

export const useDrinks = () => {
    const [drinks, setDrinks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        const fetchDrinks = async () => {
            setIsLoading(true)
            try {
                const snapshot = await getDocs(collection(db, 'drinks'))
                if (isMounted) {
                    const list = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setDrinks(list)
                    setError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message)
                    setDrinks([])
                }
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        fetchDrinks()

        return () => {
            isMounted = false
        }
    }, [])

    return { drinks, isLoading, error }
}