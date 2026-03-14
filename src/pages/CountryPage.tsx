import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type { Country } from "../types/country"
import { getCountryByName } from "../services/countriesApi"

export function CountryPage() {
  const { name } = useParams()

  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCountry() {
      try {
        if (!name) return
        const data = await getCountryByName(name)
        setCountry(data[0])
      } catch {
        setError("Failed to load country")
      } finally {
        setLoading(false)
      }
    }

    loadCountry()
  }, [name])

  if (loading) return <p>Loading country...</p>
  if (error) return <p>{error}</p>
  if (!country) return <p>Country not found</p>

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A"

  return (
    <div style={{ maxWidth: "800px" }}>
      
      <Link to="/explore">← Back to explore</Link>

      <h1 style={{ marginTop: "20px" }}>
        {country.name.common}
      </h1>

      <img
        src={country.flags.png}
        alt={country.name.common}
        style={{ width: "300px", margin: "20px 0" }}
      />

      <p>
        <strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}
      </p>

      <p>
        <strong>Region:</strong> {country.region}
      </p>

      <p>
        <strong>Population:</strong>{" "}
        {country.population.toLocaleString()}
      </p>

      <p>
        <strong>Languages:</strong> {languages}
      </p>

    </div>
  )
}