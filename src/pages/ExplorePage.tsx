import { useEffect, useState } from "react"
import type { Country } from "../types/country"
import { getAllCountries } from "../services/countriesApi"
import { CountryList } from "../components/Container/CountryList/CountryList"
import { SearchBar } from "../components/SearchBar/SearchBar"

export function ExplorePage() {

  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // API load
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

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // filtering
  const filteredCountries = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(debouncedQuery.toLowerCase())
  )

  if (loading) {
    return <p>Loading countries...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>

      <h1>Explore Countries</h1>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <CountryList countries={filteredCountries} />

    </div>
  )
}