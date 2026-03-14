import { useEffect, useState } from "react"
import type { Country } from "../types/country"
import { getAllCountries } from "../services/countriesApi"
import { CountryList } from "../components/Container/CountryList/CountryList"
import { SearchBar } from "../components/SearchBar/SearchBar"
import { RegionFilter } from "../components/RegionFilter/RegionFilter"
import PopulationFilter from "../components/PopulationFilter/PopulationFilter"

export function ExplorePage() {

  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  const [region, setRegion] = useState("")
  const [populationSort, setPopulationSort] = useState("")

  let filteredCountries = countries.filter(country =>
  country.name.common
    .toLowerCase()
    .includes(debouncedQuery.toLowerCase())
)

if (region) {
  filteredCountries = filteredCountries.filter(
    country => country.region === region
  )
}

if (populationSort === "asc") {
  filteredCountries = [...filteredCountries].sort(
    (a, b) => a.population - b.population
  )
}

if (populationSort === "desc") {
  filteredCountries = [...filteredCountries].sort(
    (a, b) => b.population - a.population
  )
}

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
      
      <RegionFilter
    value={region}
    onChange={setRegion}
  />

  <PopulationFilter
    value={populationSort}
    onChange={setPopulationSort}
  />

      <CountryList countries={filteredCountries} />

    </div>
  )
}