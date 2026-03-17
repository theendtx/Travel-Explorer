import type { Country } from "../../../types/country"
import { CountryCard } from "../CountryCard/CountryCard"

type Props = {
  countries: Country[]
  favorites: string[]
  toggleFavorite: (name: string) => void
}

export function CountryList({
  countries,
  favorites,
  toggleFavorite
}: Props) {
  return (
    <div className="country-grid">
      {countries.map((country) => (
        <CountryCard
          key={country.name.common}
          country={country}
          isFavorite={favorites.includes(country.name.common)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  )
}
