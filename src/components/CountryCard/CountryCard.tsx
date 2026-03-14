import { Link } from "react-router-dom"
import type { Country } from "../../types/country"
import "./CountryCard.css"

type Props = {
  country: Country
}

export function CountryCard({ country }: Props) {
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
    </Link>
  )
}