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
      <div className="country-card__media">
        <img className="country-card__image" src={country.flags.png} alt={name} />
      </div>

      <div className="country-card__content">
        <h3>{name}</h3>

        <div className="country-card__meta">
          <span>{country.region}</span>
          <span>{country.population.toLocaleString()}</span>
        </div>

        <div className="country-card__footer">
          <span>Open details</span>

          <button
            className={`favorite-button ${isFavorite ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault()
              onToggleFavorite(name)
            }}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </Link>
  )
}
