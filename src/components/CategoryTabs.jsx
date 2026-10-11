const CATEGORIES = [
    { key: 'all', label: 'All' },
    { key: 'coffee', label: '☕ Coffee' },
    { key: 'cold', label: '🧊 Cold Drinks' },
    { key: 'special', label: '⭐ Specialty' },
]

export const CategoryTabs = ({ active, onChange }) => {
    return (
        <div className="category-tabs">
            {CATEGORIES.map((cat) => (
                <button
                    key={cat.key}
                    type="button"
                    className={`category-btn ${active === cat.key ? 'active' : ''}`}
                    onClick={() => onChange(cat.key)}
                >
                    {cat.label}
                </button>
            ))}
        </div>
    )
}