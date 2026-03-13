import type { Country } from "../../../types/country"
import { CountryCard } from "../CountryCard/CountryCard"

type Props = {
  countries: Country[]
}

export function CountryList({ countries }: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}
    >
      {countries.map(country => (
        <CountryCard
          key={country.name.common}
          country={country}
        />
      ))}
    </div>
  )
}