export const StatItem = ({ number, label }) => {
    return (
        <div className="stat-item">
            <div className="stat-number">{number}</div>
            <div className="stat-label">{label}</div>
        </div>
    )
}