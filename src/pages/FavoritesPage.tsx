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

  if (loading) return <div className="status-message">Loading favorites...</div>
  if (error) return <div className="status-message">{error}</div>

  return (
    <div className="page">
      <section className="page-heading">
        <span className="eyebrow">Saved List</span>
        <h1>Your favorite destinations, ready for the next plan.</h1>
        <p>
          Keep a shortlist of countries you want to revisit, compare, or turn into
          full trip plans later.
        </p>
      </section>

      {favoriteCountries.length === 0 ? (
        <div className="empty-state">
          <h2>No favorites yet</h2>
          <p>Tap the star on any country card and it will appear here.</p>
        </div>
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
