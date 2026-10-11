export const FeatureBox = ({ icon, title, text }) => {
    return (
        <div className="feature-box">
            <span className="icon">{icon}</span>
            <h4>{title}</h4>
            <p>{text}</p>
        </div>
    )
}