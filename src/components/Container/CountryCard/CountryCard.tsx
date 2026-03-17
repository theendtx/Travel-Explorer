import { Link } from "react-router-dom"
import type { Country } from "../../../types/country"
import "./CountryCard.css"

type Props = {
  country: Country
  isFavorite: boolean
  onToggleFavorite: (name: string) => void
}

export function CountryCard({
  country,
  isFavorite,
  onToggleFavorite
}: Props) {
  const name = country.name.common

  return (
    <Link
      to={`/country/${encodeURIComponent(name)}`}
      className="country-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img src={country.flags.png} alt={name} />

      <h3>{name}</h3>

      <p>Population: {country.population.toLocaleString()}</p>

      <button
        className="favorite-button"
        onClick={(e) => {
          e.preventDefault()
          onToggleFavorite(name)
        }}
      >
        {isFavorite ? "★" : "☆"}
      </button>
    </Link>
  )
}
