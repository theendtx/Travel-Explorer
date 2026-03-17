import { useEffect, useState } from "react"
import { CountryList } from "../components/Container/CountryList/CountryList"
import { getAllCountries } from "../services/countriesApi"
import type { Country } from "../types/country"

type Props = {
  favorites: string[]
  toggleFavorite: (name: string) => void
}

export function FavoritesPage({ favorites, toggleFavorite }: Props) {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getAllCountries()
        setCountries(data)
      } catch {
        setError("Failed to load favorites")
      } finally {
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  const favoriteCountries = countries.filter((country) =>
    favorites.includes(country.name.common)
  )

  if (loading) return <p>Loading favorites...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h1>Favorite Countries</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        <CountryList
          countries={favoriteCountries}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      )}
    </div>
  )
}
