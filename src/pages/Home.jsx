import { useBestSellers } from '../hooks/useBestSellers'

export const Home = () => {
    const { bestSellers, isLoading, error } = useBestSellers()

    if (isLoading) return <p style={{ color: 'white' }}>Loading best sellers...</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    return (
        <div>
            <h1>Home Page</h1>
            <p>Top {bestSellers.length} best sellers:</p>
            <ul style={{ color: 'white', padding: '20px' }}>
                {bestSellers.map((drink) => (
                    <li key={drink.id}>
                        {drink.name} — ${drink.price}
                    </li>
                ))}
            </ul>
        </div>
    )
}