import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type { Country } from "../types/country"
import { getCountryByName } from "../services/countriesApi"
import { formatPopulation } from "../utils/format"

type Props = {
  favorites: string[]
  toggleFavorite: (name: string) => void
}

export function CountryPage({ favorites, toggleFavorite }: Props) {
  const { name } = useParams<{ name: string }>()
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCountry() {
      try {
        setLoading(true)
        if (!name) return

        const data = await getCountryByName(name)

        if (data.length > 0) {
          setCountry(data[0])
          setError(null)
        } else {
          setError("Country not found")
        }
      } catch {
        setError("Failed to load country details")
      } finally {
        setLoading(false)
      }
    }

    loadCountry()
  }, [name])

  if (loading) return <div className="status-message">Loading country details...</div>
  if (error) return <div className="status-message">{error}</div>
  if (!country) return <div className="status-message">No country data found.</div>

  const isFavorite = favorites.includes(country.name.common)
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A"

  return (
    <div className="country-layout">
      <Link className="country-back" to="/explore">
        ← Back to explore
      </Link>

      <div className="country-detail-card">
        <img
          className="country-flag"
          src={country.flags.png}
          alt={country.name.common}
        />

        <div className="country-meta">
          <div className="country-topbar">
            <div>
              <span className="eyebrow">Destination Profile</span>
              <h1>{country.name.common}</h1>
            </div>

            <button
              className={`favorite-button ${isFavorite ? "active" : ""}`}
              onClick={() => toggleFavorite(country.name.common)}
            >
              {isFavorite ? "★ Saved" : "☆ Save"}
            </button>
          </div>

          <p>
            Use this destination snapshot to compare essentials before adding the
            country to your next travel plan.
          </p>

          <div className="country-meta-grid">
            <div className="country-meta-item">
              <span>Capital</span>
              <strong>{country.capital?.[0] ?? "N/A"}</strong>
            </div>

            <div className="country-meta-item">
              <span>Region</span>
              <strong>{country.region}</strong>
            </div>

            <div className="country-meta-item">
              <span>Population</span>
              <strong>{formatPopulation(country.population)}</strong>
            </div>

            <div className="country-meta-item">
              <span>Languages</span>
              <strong>{languages}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
