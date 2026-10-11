import { useDrinks } from '../hooks/useDrinks'

export const Menu = () => {
    const { drinks, isLoading, error } = useDrinks()

    if (isLoading) return <p style={{ color: 'white' }}>Loading drinks...</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    return (
        <div>
            <h1>Menu Page</h1>
            <p>Fetched {drinks.length} drinks from Firestore.</p>
            <pre style={{ color: 'white', padding: '20px', fontSize: '12px' }}>
                {JSON.stringify(drinks, null, 2)}
            </pre>
        </div>
    )
}