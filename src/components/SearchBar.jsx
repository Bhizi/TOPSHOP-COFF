import { FaSearch } from 'react-icons/fa'

export const SearchBar = ({ value, onChange }) => {
    return (
        <div className="search-bar">
            <FaSearch className="search-bar-icon" />
            <input
                type="text"
                placeholder="Search drinks..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}