import type { Country } from "../../../types/country"
import "./CountryCard.css"

type Props = {
  country: Country
}

export function CountryCard({ country }: Props) {
  return (
    <div className="country-card">
      <img src={country.flags.png} alt={country.name.common} />

      <h3>{country.name.common}</h3>

      <p>Population: {country.population.toLocaleString()}</p>
    </div>
  )
}