import { useEffect, useState } from "react"
import type { Country } from "../types/country"
import { getAllCountries } from "../services/countriesApi"
import { CountryList } from "../components/Container/CountryList/CountryList"

export function ExplorePage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCountries() {
      try {
        const data = await getAllCountries()
        setCountries(data)
      } catch (err) {
        setError("Failed to load countries")
      } finally {
        setLoading(false)
      }
    }

    loadCountries()
  }, [])

  if (loading) {
    return <p>Loading countries...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <h1>Explore Countries</h1>
      <CountryList countries={countries} />
    </div>
  )
}