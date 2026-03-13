import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header>
            <nav style={{ display: "flex", gap: "20px" }}>
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/trips">Trips</Link>
            </nav>
        </header>
    )
}