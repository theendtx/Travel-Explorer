import { NavLink } from "react-router-dom"
import "./Header.css"

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">🌍 Travel Explorer</div>

        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/explore">Explore</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/trips">Trips</NavLink>
        </nav>
      </div>
    </header>
  )
}